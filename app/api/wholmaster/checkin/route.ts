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
  checkin as recordCheckin,
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
    app_version: yup.string().default(""),
  })
  .required();

function fail(status: number, code: string) {
  return NextResponse.json({ code }, { status, headers: corsHeaders });
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 200, headers: corsHeaders });
}

/**
 * Renews one machine's lease and returns a freshly signed certificate.
 *
 * This is where a refund or revocation takes effect: renewal stops, and the machine falls back to
 * evaluation when its current lease expires. Every attempt is recorded, refused or not, so a key
 * shared across machines or cities is visible after the fact.
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
      `wholmaster-checkin:${ip}`,
      60,
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

    const outcome = await recordCheckin({
      record,
      lid: verified.lid,
      kid,
      fp: body.fp,
      ip,
      appVersion: body.app_version,
      privateKey,
    });
    if (!outcome.ok) {
      return fail(outcome.status, outcome.code);
    }

    return NextResponse.json(
      { certificate: outcome.certificate, seat: outcome.seat },
      { headers: corsHeaders }
    );
  } catch (error) {
    logError("wholmaster-checkin", error);
    return fail(500, "internal");
  }
}
