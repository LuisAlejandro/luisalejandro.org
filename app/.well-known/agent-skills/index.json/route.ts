import { NextResponse } from "next/server";

import { canonicalHostnameUrl } from "@constants/constants";
import { buildAgentSkillsIndex } from "@lib/agentSkills/buildIndex";
import { logError } from "@lib/logger";

const cacheHeaders = {
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
  "CDN-Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
  "Netlify-CDN-Cache-Control":
    "public, s-maxage=3600, stale-while-revalidate=86400",
  "Cache-Tag": "agent-skills, content",
  "Netlify-Cache-Tag": "agent-skills, content",
  Vary: "Accept-Encoding",
};

export async function GET() {
  try {
    const body = await buildAgentSkillsIndex(canonicalHostnameUrl);
    return NextResponse.json(body, { headers: cacheHeaders });
  } catch (error) {
    logError("agent-skills-index", error);
    return NextResponse.json(
      { error: "Error generating agent skills index" },
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
