import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

function notFound(): NextResponse {
  return new NextResponse(null, {
    status: 404,
    headers: {
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}

export async function GET(): Promise<NextResponse> {
  return notFound();
}

export async function HEAD(): Promise<NextResponse> {
  return notFound();
}
