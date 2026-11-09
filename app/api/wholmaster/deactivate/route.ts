import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import * as yup from "yup";

import { logError } from "@lib/logger";
import { checkSlidingWindowRateLimit } from "@lib/rateLimit/slidingWindow";
import {
  isNewFormatKey,
  publicKeyOf,
  signingKey,
  verifyLicenseKey,
} from "@lib/wholmaster/license";
import {
  deactivate as deactivateSeat,
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
    install_secret: yup.string().required(),
  })
  .required();

function fail(status: number, code: string) {
  return NextResponse.json({ code }, { status, headers: corsHeaders });
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 200, headers: corsHeaders });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);
    if (!body || !(await schema.isValid(body))) {
      return fail(400, "invalid_body");
    }
    if (!isNewFormatKey(body.key)) {
      return fail(400, "invalid_key");
    }

    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      "unknown";
    const limit = checkSlidingWindowRateLimit(
      `wholmaster-deactivate:${ip}`,
      20,
      60_000
    );
    if (!limit.allowed) {
      return fail(429, "rate_limited");
    }

    const { privateKey } = signingKey();
    const publicKey = crypto.createPublicKey({
      key: Buffer.from(publicKeyOf(privateKey), "base64"),
      format: "der",
      type: "spki",
    });
    const verified = verifyLicenseKey(body.key, publicKey);
    if (!verified) return fail(400, "invalid_key");

    const record = await findLicenseByLid(verified.lid);
    if (!record) return fail(404, "not_found");

    const outcome = await deactivateSeat(record, body.fp, body.install_secret);
    if (!outcome.ok) {
      return fail(outcome.status, outcome.code);
    }
    return NextResponse.json({ ok: true }, { headers: corsHeaders });
  } catch (error) {
    logError("wholmaster-deactivate", error);
    return fail(500, "internal");
  }
}
