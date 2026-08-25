import { NextResponse } from "next/server";

import { canonicalHostnameUrl } from "@constants/constants";
import { logError } from "@lib/logger";

const catalogLinkset = {
  linkset: [
    {
      anchor: canonicalHostnameUrl,
      "service-doc": [
        { href: `${canonicalHostnameUrl}/llms.txt` },
        { href: `${canonicalHostnameUrl}/llms-full.txt` },
        { href: `${canonicalHostnameUrl}/.well-known/agent-permissions.json` },
        { href: `${canonicalHostnameUrl}/.well-known/agent-skills/index.json` },
        { href: `${canonicalHostnameUrl}/.well-known/mcp/server-card.json` },
        { href: `${canonicalHostnameUrl}/sitemap.xml` },
      ],
      item: [
        { href: `${canonicalHostnameUrl}/api/search-posts` },
        { href: `${canonicalHostnameUrl}/api/mcp` },
        { href: `${canonicalHostnameUrl}/blog/posts/feed.xml` },
        { href: `${canonicalHostnameUrl}/blog/posts/atom.xml` },
        { href: `${canonicalHostnameUrl}/blog/posts/feed.json` },
      ],
    },
  ],
};

export async function GET() {
  try {
    return NextResponse.json(catalogLinkset, {
      headers: {
        "Content-Type": "application/linkset+json",
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        "CDN-Cache-Control":
          "public, s-maxage=3600, stale-while-revalidate=86400",
        "Netlify-CDN-Cache-Control":
          "public, s-maxage=3600, stale-while-revalidate=86400",
        "Cache-Tag": "api-catalog, content",
        "Netlify-Cache-Tag": "api-catalog, content",
        Vary: "Accept-Encoding",
      },
    });
  } catch (error) {
    logError("api-catalog", error);
    return NextResponse.json(
      { error: "Error generating API catalog" },
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
