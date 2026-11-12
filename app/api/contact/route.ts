import { NextRequest, NextResponse } from "next/server";
import * as yup from "yup";

import { initLeadWorkflow, verifyCaptcha } from "@lib/contactForm";
import { logError } from "@lib/logger";
import { isSchemaValid } from "@lib/utils";

const schema = yup
  .object({
    contactName: yup.string().required(),
    contactEmail: yup.string().required(),
    contactMessage: yup.string().required(),
    company: yup.string().max(160).default(""),
    needs: yup.array(yup.string().required()).default([]),
    timeline: yup.string().default(""),
    nda: yup.boolean().default(false),
    consent: yup.boolean().required(),
    token: yup.string(),
  })
  .required();

/**
 * The email template renders one message body, so the brief's structured fields
 * are folded into it. Keeps the SES template and the lead record unchanged.
 */
function briefForEmail(body: {
  contactMessage: string;
  company?: string;
  needs?: string[];
  timeline?: string;
  nda?: boolean;
}): string {
  const lines = [body.contactMessage.trim()];
  if (body.company) lines.push("", `Company: ${body.company}`);
  if (body.needs?.length) lines.push(`Needs: ${body.needs.join(", ")}`);
  if (body.timeline) lines.push(`Timeline: ${body.timeline}`);
  if (body.nda) lines.push("NDA requested before details");
  return lines.join("\n");
}

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

/**
 * ponytail: per-instance memory, so it resets on restart and does not span
 * replicas. That bounds casual abuse of an SES-backed endpoint; if the site is
 * ever multi-instance, move this to the shared cache.
 */
const submissions = new Map<string, number[]>();

function tooManySubmissions(caller: string): boolean {
  const now = Date.now();
  const recent = (submissions.get(caller) ?? []).filter(
    (at) => now - at < WINDOW_MS
  );
  if (recent.length >= MAX_PER_WINDOW) {
    submissions.set(caller, recent);
    return true;
  }
  recent.push(now);
  submissions.set(caller, recent);
  return false;
}

/** First hop in the forwarded chain, or a single bucket when nothing is known. */
function callerOf(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") || "unknown";
}

export async function POST(request: NextRequest) {
  try {
    if (tooManySubmissions(callerOf(request))) {
      return NextResponse.json(
        { error: "Too many submissions", code: "rate_limited" },
        { status: 429, headers: { "Retry-After": String(WINDOW_MS / 1000) } }
      );
    }

    const body = await request.json();

    if (!(await isSchemaValid(schema, body))) {
      return NextResponse.json({ error: "Invalid body" }, { status: 400 });
    }

    if (body.consent !== true) {
      return NextResponse.json(
        { error: "Consent missing", code: "consent_required" },
        { status: 400 }
      );
    }

    // The captcha is the gate whenever it is configured; the token itself buys
    // nothing, because a client-held signing key would be public.
    if (process.env.RECAPTCHA_API_SECRET) {
      if (!body.token) {
        return NextResponse.json(
          { error: "Missing captcha", code: "captcha_required" },
          { status: 400 }
        );
      }
      if (!(await verifyCaptcha(body.token))) {
        return NextResponse.json({ error: "Invalid captcha" }, { status: 403 });
      }
    }

    await initLeadWorkflow({ ...body, contactMessage: briefForEmail(body) });
    return NextResponse.json({ sent: true });
  } catch (error) {
    logError("contact-api", error, { hasBody: !!request.body });
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
