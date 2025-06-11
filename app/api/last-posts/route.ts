import { NextResponse } from "next/server";

export async function GET() {
  // const posts = await getLatestPosts();
  const posts: any = [];
  return NextResponse.json(posts);
}
