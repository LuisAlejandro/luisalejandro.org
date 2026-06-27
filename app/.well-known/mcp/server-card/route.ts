import { NextResponse } from "next/server";

import { logError } from "@lib/logger";
import { buildMcpServerCard } from "@lib/mcp/serverCard";

const cacheHeaders = {
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
  "CDN-Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
  "Netlify-CDN-Cache-Control":
    "public, s-maxage=3600, stale-while-revalidate=86400",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET",
  "Cache-Tag": "mcp-server-card, content",
  "Netlify-Cache-Tag": "mcp-server-card, content",
  Vary: "Accept-Encoding",
};

export async function GET() {
  try {
    return NextResponse.json(buildMcpServerCard(), { headers: cacheHeaders });
  } catch (error) {
    logError("mcp-server-card", error);
    return NextResponse.json(
      { error: "Error generating MCP server card" },
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
