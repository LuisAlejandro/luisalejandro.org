import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { wantsMarkdown } from "@lib/markdown/acceptNegotiation";
import {
  htmlPathToTwinSegments,
  twinRewritePath,
} from "@lib/markdown/htmlPathToTwinSegments";
import { twinMarkdownHeaders } from "@lib/markdown/twinHeaders";

function appendVaryAccept(response: NextResponse): NextResponse {
  response.headers.append("Vary", "Accept");
  return response;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.endsWith(".md")) {
    return NextResponse.next();
  }

  const accept = request.headers.get("accept");
  if (!wantsMarkdown(accept)) {
    return appendVaryAccept(NextResponse.next());
  }

  const segments = htmlPathToTwinSegments(pathname);
  if (segments === null) {
    if (wantsMarkdown(accept)) {
      return new NextResponse("Not found", {
        status: 404,
        headers: { ...twinMarkdownHeaders, Vary: "Accept, Accept-Encoding" },
      });
    }

    return appendVaryAccept(NextResponse.next());
  }

  const rewriteUrl = request.nextUrl.clone();
  rewriteUrl.pathname = twinRewritePath(segments);

  return appendVaryAccept(NextResponse.rewrite(rewriteUrl));
}

export const config = {
  matcher: [
    "/",
    "/portfolio",
    "/contact",
    "/blog",
    "/blog/category",
    "/blog/category/:path*",
    "/blog/posts/:path*",
    "/case-studies/:path*",
  ],
};
