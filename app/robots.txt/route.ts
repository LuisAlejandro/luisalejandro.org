import { NextResponse } from "next/server";

import { canonicalHostnameUrl } from "@constants/constants";
import { logError } from "@lib/logger";

export async function GET() {
  try {
    const robotsTemplate = `# *
User-agent: *
Allow: /

# AI crawlers and answer engines
User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Perplexity-User
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Applebot
Allow: /

User-agent: Applebot-Extended
Allow: /

# Host
Host: ${canonicalHostnameUrl}

# Sitemaps
Sitemap: ${canonicalHostnameUrl}/sitemap.xml`;

    return new NextResponse(robotsTemplate, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "s-maxage=86400, stale-while-revalidate",
      },
    });
  } catch (error) {
    logError("robots-txt", error);
    return new NextResponse("Error generating robots.txt", { status: 500 });
  }
}
