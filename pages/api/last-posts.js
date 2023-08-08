import { getLatestPosts } from "@lib/api";

export default async function lastPosts(req, res) {
  // const posts = await getLatestPosts();
  const posts = [];
  return res.status(200).json(posts);
}
