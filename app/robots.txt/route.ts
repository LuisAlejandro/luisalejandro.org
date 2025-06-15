import { NextResponse } from "next/server";

import { canonicalHostnameUrl } from "@constants/constants";

export async function GET() {
  try {
    const robotsTemplate = `# *
User-agent: *
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
    console.error("Error generating robots.txt:", error);
    return new NextResponse("Error generating robots.txt", { status: 500 });
  }
}
