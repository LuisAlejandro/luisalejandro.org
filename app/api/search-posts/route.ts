import { NextRequest, NextResponse } from "next/server";

import { searchPosts } from "@lib/api";
import { logError } from "@lib/logger";
import markdownToHtml from "@lib/markdownToHtml";
import { MAX_SEARCH_QUERY_LENGTH } from "@lib/searchQuery";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("q");

    if (!query || query.trim().length === 0) {
      return NextResponse.json({ response: [] });
    }

    if (query.trim().length > MAX_SEARCH_QUERY_LENGTH) {
      return NextResponse.json({ error: "Query too long" }, { status: 400 });
    }

    const posts = await searchPosts(query);

    // Process markdown teasers to HTML for consistency with blog page
    const processedPosts = await Promise.all(
      posts.map(async (post: any) => ({
        ...post,
        metadata: {
          ...post.metadata,
          teaser: await markdownToHtml(post.metadata?.teaser || ""),
        },
      }))
    );

    return NextResponse.json({ response: processedPosts });
  } catch (error) {
    logError("search-posts-api", error);
    return NextResponse.json({ response: [] });
  }
}
