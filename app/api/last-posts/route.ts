import { NextResponse } from "next/server";

import { getLatestPosts } from "@lib/api";
import { logError } from "@lib/logger";

export async function GET() {
  try {
    const posts = await getLatestPosts();
    return NextResponse.json(posts);
  } catch (error) {
    logError("last-posts-api", error);
    return NextResponse.json({ response: [] });
  }
}
