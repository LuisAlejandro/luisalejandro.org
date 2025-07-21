import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Apply forever caching to individual blog posts and case studies
  // Exclude feed URLs which should have revalidation cache
  if (
    (request.nextUrl.pathname.startsWith("/blog/posts/") &&
      !request.nextUrl.pathname.endsWith("/feed.xml") &&
      !request.nextUrl.pathname.endsWith("/atom.xml") &&
      !request.nextUrl.pathname.endsWith("/feed.json")) ||
    request.nextUrl.pathname.startsWith("/case-studies/")
  ) {
    // Forever cache for blog posts and case studies - content is immutable once published
    response.headers.set(
      "Cache-Control",
      "public, max-age=31536000, immutable"
    );
    response.headers.set(
      "CDN-Cache-Control",
      "public, max-age=31536000, immutable"
    );
    response.headers.set(
      "Netlify-CDN-Cache-Control",
      "public, max-age=31536000, immutable"
    );

    // Add cache tags for selective invalidation
    const cacheTag = request.nextUrl.pathname.startsWith("/blog/posts/")
      ? "blog-posts, content"
      : "case-studies, content";
    response.headers.set("Cache-Tag", cacheTag);
    response.headers.set("Netlify-Cache-Tag", cacheTag);

    // Optimize for compression
    response.headers.set("Vary", "Accept-Encoding");
  }

  // Apply revalidation caching to blog index, category pages, and portfolio
  else if (
    request.nextUrl.pathname === "/blog" ||
    request.nextUrl.pathname === "/blog/" ||
    request.nextUrl.pathname.startsWith("/blog/category/") ||
    request.nextUrl.pathname === "/portfolio" ||
    request.nextUrl.pathname === "/portfolio/"
  ) {
    // Cache with revalidation for dynamic pages - updates when new content is available
    response.headers.set(
      "Cache-Control",
      "public, max-age=3600, stale-while-revalidate=86400"
    );
    response.headers.set(
      "CDN-Cache-Control",
      "public, max-age=3600, stale-while-revalidate=86400"
    );
    response.headers.set(
      "Netlify-CDN-Cache-Control",
      "public, max-age=3600, stale-while-revalidate=86400"
    );

    // Add cache tags for selective invalidation
    let cacheTag = "content";
    if (request.nextUrl.pathname.startsWith("/blog")) {
      cacheTag = "blog-index, blog-listings, content";
    } else if (request.nextUrl.pathname.startsWith("/portfolio")) {
      cacheTag = "portfolio, content";
    }
    response.headers.set("Cache-Tag", cacheTag);
    response.headers.set("Netlify-Cache-Tag", cacheTag);

    // Optimize for compression
    response.headers.set("Vary", "Accept-Encoding");
  }

  // Apply revalidation caching to feed URLs
  else if (
    request.nextUrl.pathname === "/blog/posts/feed.xml" ||
    request.nextUrl.pathname === "/blog/posts/atom.xml" ||
    request.nextUrl.pathname === "/blog/posts/feed.json"
  ) {
    // Cache with revalidation for feeds - updates when new content is available
    response.headers.set(
      "Cache-Control",
      "public, max-age=3600, stale-while-revalidate=86400"
    );
    response.headers.set(
      "CDN-Cache-Control",
      "public, max-age=3600, stale-while-revalidate=86400"
    );
    response.headers.set(
      "Netlify-CDN-Cache-Control",
      "public, max-age=3600, stale-while-revalidate=86400"
    );

    // Add cache tags for selective invalidation
    response.headers.set("Cache-Tag", "blog-feeds, content");
    response.headers.set("Netlify-Cache-Tag", "blog-feeds, content");

    // Optimize for compression
    response.headers.set("Vary", "Accept-Encoding");
  }

  return response;
}

export const config = {
  matcher: [
    // Match all blog routes
    "/blog",
    "/blog/",
    "/blog/posts/:path*",
    "/blog/category/:path*",
    // Match all case studies routes
    "/case-studies/:path*",
    // Match portfolio route
    "/portfolio",
    "/portfolio/",
  ],
};
