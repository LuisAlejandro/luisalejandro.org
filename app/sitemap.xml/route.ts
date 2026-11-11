import { NextResponse } from "next/server";

import {
  canonicalHostnameUrl,
  SITE_PROFILE_DATE_MODIFIED,
} from "@constants/constants";
import { getAllPostsForHome, getPopulatedCategories } from "@lib/api";
import { logError } from "@lib/logger";

/** Every case study with a page in app/case-studies/. Kept in sync by hand. */
const CASE_STUDIES = [
  "expedia",
  "soleit",
  "dockershelf",
  "canaima",
  "wheeltheworld",
];

function absoluteUrl(path: string): string {
  return `${canonicalHostnameUrl}${path}`;
}

/** Accepts only an ISO string we can trust; anything else means "omit lastmod". */
function lastmod(...candidates: unknown[]): string {
  for (const candidate of candidates) {
    if (typeof candidate === "string" && candidate) {
      const parsed = new Date(candidate);
      if (!Number.isNaN(parsed.getTime())) {
        return parsed.toISOString();
      }
    }
  }
  return "";
}

function lastmodTag(value: string): string {
  return value ? `<lastmod>${value}</lastmod>` : "";
}

function imageTag(url: unknown): string {
  if (typeof url !== "string" || !url) return "";
  const src = url.startsWith("http") ? url : absoluteUrl(url);
  return `<image:image><image:loc>${src}</image:loc></image:image>`;
}

function postItem(post: any): string {
  const hero =
    typeof post?.metadata?.hero === "object" ? post.metadata.hero?.url : post?.metadata?.hero;

  return `<url>
  <loc>${absoluteUrl(`/blog/posts/${post.slug}`)}</loc>
  ${lastmodTag(lastmod(post.modified_at, post.created_at))}
  <changefreq>monthly</changefreq>
  <priority>0.7</priority>
  ${imageTag(hero)}
</url>`;
}

function categoryItem(category: any): string {
  return `<url>
  <loc>${absoluteUrl(`/blog/category/${category.slug}`)}</loc>
  <changefreq>monthly</changefreq>
  <priority>0.5</priority>
</url>`;
}

function caseStudyItem(slug: string): string {
  return `<url>
  <loc>${absoluteUrl(`/case-studies/${slug}`)}</loc>
  <changefreq>monthly</changefreq>
  <priority>0.3</priority>
</url>`;
}

export async function GET() {
  try {
    const posts = await getAllPostsForHome();
    const categories = await getPopulatedCategories();

    // Only declare the image namespace: it is the one this sitemap populates.
    const sitemapTemplate = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
      <loc>${canonicalHostnameUrl}</loc>
      ${lastmodTag(lastmod(SITE_PROFILE_DATE_MODIFIED))}
      <changefreq>weekly</changefreq>
      <priority>1.0</priority>
  </url>
  <url>
      <loc>${absoluteUrl("/portfolio")}</loc>
      ${lastmodTag(lastmod(SITE_PROFILE_DATE_MODIFIED))}
      <changefreq>monthly</changefreq>
      <priority>0.8</priority>
  </url>
  ${CASE_STUDIES.map(caseStudyItem).join("\n  ")}
  <url>
      <loc>${absoluteUrl("/blog")}</loc>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
  </url>
  ${categories.map(categoryItem).join("\n  ")}
  ${posts.map(postItem).join("\n  ")}
</urlset>`;

    return new NextResponse(sitemapTemplate, {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "s-maxage=3600, stale-while-revalidate",
      },
    });
  } catch (error) {
    logError("sitemap", error);
    return new NextResponse("Error generating sitemap", { status: 500 });
  }
}
