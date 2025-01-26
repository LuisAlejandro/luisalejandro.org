import { getLatestPosts } from "@lib/api";

export default async function lastPosts(req: any, res: any) {
  // const posts = await getLatestPosts();
  const posts: any = [];
  return res.status(200).json(posts);
}
