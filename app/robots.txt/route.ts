import { NextResponse } from "next/server";

import { canonicalHostnameUrl } from "@constants/constants";
import { logError } from "@lib/logger";

const CONTENT_SIGNAL = "Content-Signal: search=yes, ai-input=yes, ai-train=no";

function aiCrawlerBlock(userAgent: string): string {
  return `User-agent: ${userAgent}
Allow: /
${CONTENT_SIGNAL}
`;
}

export async function GET() {
  try {
    const robotsTemplate = `# *
User-agent: *
Allow: /

# Declare usage boundaries for real-time models versus model pre-training
${CONTENT_SIGNAL}

# AI crawlers and answer engines
${aiCrawlerBlock("GPTBot")}${aiCrawlerBlock("OAI-SearchBot")}${aiCrawlerBlock("ChatGPT-User")}${aiCrawlerBlock("ClaudeBot")}${aiCrawlerBlock("Claude-Web")}${aiCrawlerBlock("PerplexityBot")}${aiCrawlerBlock("Perplexity-User")}${aiCrawlerBlock("Google-Extended")}${aiCrawlerBlock("Applebot")}${aiCrawlerBlock("Applebot-Extended")}
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
