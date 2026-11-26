import { timingSafeEqual } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";

import { publishedPostizSlug } from "@lib/postizWebhook";

import { POST as revalidate } from "../route";

function matches(secret: string | null, expected: string | undefined) {
  if (!secret || !expected) return false;
  const a = Buffer.from(secret);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

// Postiz webhooks cannot send headers, so this dedicated secret rides in the
// URL. It can only trigger a cache refresh, never change content.
export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  if (!matches(secret, process.env.POSTIZ_REVALIDATE_SECRET)) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid JSON" }, { status: 400 });
  }

  // Postiz's "send test webhook" button posts { test: true }.
  if (body && typeof body === "object" && "test" in body) {
    return NextResponse.json({ message: "Test received" });
  }

  const slug = publishedPostizSlug(body);
  if (!slug) {
    return NextResponse.json({ message: "Ignored" });
  }

  const internal = new NextRequest(new URL("/api/revalidate", request.url), {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.REVALIDATE_SECRET ?? ""}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ posts: [{ slug }] }),
  });
  return revalidate(internal);
}
