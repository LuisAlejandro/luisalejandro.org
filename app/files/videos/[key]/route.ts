import { NextResponse } from "next/server";

import {
  getTikTokVideoBlob,
  isTikTokVideoKey,
  NO_STORE_HEADERS,
} from "@lib/tiktok-videos";

export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ key: string }>;
};

async function resolveKey(
  context: RouteContext
): Promise<string | NextResponse> {
  const { key } = await context.params;
  if (!isTikTokVideoKey(key)) {
    return new NextResponse(null, { status: 404 });
  }
  return key;
}

export async function GET(
  _request: Request,
  context: RouteContext
): Promise<NextResponse> {
  const key = await resolveKey(context);
  if (key instanceof NextResponse) {
    return key;
  }
  const blob = await getTikTokVideoBlob(key);
  if (!blob) {
    return new NextResponse(null, { status: 404 });
  }
  return new NextResponse(blob, { status: 200, headers: NO_STORE_HEADERS });
}

export async function HEAD(
  _request: Request,
  context: RouteContext
): Promise<NextResponse> {
  const key = await resolveKey(context);
  if (key instanceof NextResponse) {
    return key;
  }
  const blob = await getTikTokVideoBlob(key);
  if (!blob) {
    return new NextResponse(null, { status: 404 });
  }
  return new NextResponse(null, {
    status: 200,
    headers: {
      ...NO_STORE_HEADERS,
      "Content-Length": String(blob.byteLength),
    },
  });
}
