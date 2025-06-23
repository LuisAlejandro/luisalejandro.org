import { NextResponse } from "next/server";

import { getLatestPosts } from "@lib/api";

export async function GET() {
  try {
    const posts = await getLatestPosts();
    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error fetching latest posts:", error);
    return NextResponse.json({ response: [] });
  }
}
