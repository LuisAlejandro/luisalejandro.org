import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import * as yup from "yup";

import { logError } from "@lib/logger";
import { checkSlidingWindowRateLimit } from "@lib/rateLimit/slidingWindow";
import {
  publicKeyOf,
  signingKey,
  verifyLicenseKey,
} from "@lib/wholmaster/license";
import {
  activate as activateSeat,
  findLicenseByLid,
} from "@lib/wholmaster/seats";

export const runtime = "nodejs";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

const schema = yup
  .object({
    key: yup.string().required(),
    fp: yup.array().of(yup.string().required()).min(2).required(),
    label: yup.string().default(""),
  })
  .required();

function fail(
  status: number,
  code: string,
  extra: Record<string, unknown> = {}
) {
  return NextResponse.json(
    { code, ...extra },
    { status, headers: corsHeaders }
  );
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 200, headers: corsHeaders });
}

/**
 * Registers one machine against a license key and returns a signed activation certificate.
 *
 * The key is the only credential: it must verify against our own public key, so possession of a
 * valid key plus rate limiting is the authentication (R19). Seat counting happens here, once per
 * machine; the desktop verifies certificates offline from then on.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);
    if (!body || !(await schema.isValid(body))) {
      return fail(400, "invalid_body");
    }

    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      "unknown";
    const limit = checkSlidingWindowRateLimit(
      `wholmaster-activate:${ip}`,
      20,
      60_000
    );
    if (!limit.allowed) {
      return fail(429, "rate_limited");
    }

    const { privateKey, kid } = signingKey();
    const publicKey = crypto.createPublicKey({
      key: Buffer.from(publicKeyOf(privateKey), "base64"),
      format: "der",
      type: "spki",
    });

    const verified = verifyLicenseKey(body.key, publicKey);
    if (!verified) return fail(400, "invalid_key");

    const record = await findLicenseByLid(verified.lid);
    if (!record) return fail(404, "not_found");

    const secret = crypto.randomBytes(32).toString("base64url");
    const outcome = await activateSeat({
      record,
      lid: verified.lid,
      kid,
      fp: body.fp,
      label: body.label,
      secret,
      privateKey,
    });

    if (!outcome.ok) {
      return fail(outcome.status, outcome.code, {
        used: outcome.used ?? undefined,
        seats: outcome.seats ?? undefined,
      });
    }

    return NextResponse.json(
      {
        license_key: body.key,
        certificate: outcome.certificate,
        install_secret: secret,
        seat: outcome.seat,
        seats: record.seats,
      },
      { headers: corsHeaders }
    );
  } catch (error) {
    logError("wholmaster-activate", error);
    return fail(500, "internal");
  }
}
