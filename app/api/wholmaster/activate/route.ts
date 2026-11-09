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
import { decodeLegacyKey, isLegacyPremium } from "@lib/wholmaster/legacy";
import {
  activate as activateSeat,
  findLicenseByLid,
  findLicenseBySlug,
  writeLicense,
  type LicenseRecord,
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
    user: yup.string().default(""),
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

    let record: LicenseRecord | null = null;
    let keyPayload: { lid: string } | null = null;

    if (isNewFormatKey(body.key)) {
      const verified = verifyLicenseKey(body.key, publicKey);
      if (!verified) return fail(400, "invalid_key");
      keyPayload = { lid: verified.lid };
      record = await findLicenseByLid(verified.lid);
    } else {
      // Legacy key: only the issuer can read it, and it never grants premium by itself.
      const legacy = decodeLegacyKey(body.key);
      if (!legacy || !isLegacyPremium(legacy)) {
        return fail(409, "legacy_not_eligible");
      }
      record = body.user ? await findLicenseBySlug(body.user) : null;
      if (!record) return fail(409, "legacy_not_eligible");
      if (record.status !== "active") return fail(409, "not_active");
      if (!record.lid) {
        record.lid = `wm-${crypto.randomUUID()}`;
      }
      record.tier = "gym";
      record.seats = record.seats || 2;
      record.maxMajor = 1;
      makeLicensedTo(record, legacy.name);
      await writeLicense(record.id, record);
      keyPayload = { lid: record.lid };
    }

    if (!record || !keyPayload) return fail(404, "not_found");

    const secret = crypto.randomBytes(32).toString("base64url");
    const outcome = await activateSeat({
      record,
      lid: keyPayload.lid,
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

function makeLicensedTo(record: LicenseRecord, name: string) {
  if (name) record.licensedTo = name;
  if (!record.licensedTo) record.licensedTo = "";
}
