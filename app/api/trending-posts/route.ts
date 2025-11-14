import axios from "axios";
import { NextResponse } from "next/server";

import { getLatestPosts, getPostsByIds } from "@lib/api";
import { logError } from "@lib/logger";

export async function GET() {
  try {
    const url = new URL("https://disqus.com/api/3.0/threads/listPopular.json");
    const params = {
      forum: process.env.NEXT_PUBLIC_DISQUS_SHORTNAME,
      api_key: process.env.DISQUS_API_KEY,
      limit: "10",
    };

    // Filter out undefined values and ensure all values are strings
    const validParams = Object.entries(params).reduce(
      (acc, [key, value]) => {
        if (value) {
          acc[key] = value;
        }
        return acc;
      },
      {} as Record<string, string>
    );

    const { data } = await axios.get(
      `${url.origin}${url.pathname}?${new URLSearchParams(validParams)}`
    );

    if (data.response.length === 0) {
      const lastPosts = await getLatestPosts();
      return NextResponse.json({ response: lastPosts });
    }

    const posts = await getPostsByIds(
      data.response.map((post: any) => post.identifiers).flat()
    );
    return NextResponse.json({ response: posts });
  } catch (error) {
    logError("trending-posts-api", error, {
      hasDisqusShortname: !!process.env.NEXT_PUBLIC_DISQUS_SHORTNAME,
      hasDisqusApiKey: !!process.env.DISQUS_API_KEY,
    });
    return NextResponse.json({ response: [] });
  }
}
