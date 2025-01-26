
import path from "node:path";

import { mkdir, writeFile } from "node:fs/promises";
import { Feed } from "feed";

import { canonicalHostnameUrl } from "@constants/constants";
import { getAllPostsForHome } from "@lib/api";

export default async function generateFeed() {
  
  const basedir = process.cwd();
  const feedUrlPath = "blog/posts/feed.xml";
  const atomUrlPath = "blog/posts/atom.xml";
  const jsonUrlPath = "blog/posts/feed.json";
  const feedPath = path.join(basedir, "public", feedUrlPath);
  const atomPath = path.join(basedir, "public", atomUrlPath);
  const jsonPath = path.join(basedir, "public", jsonUrlPath);

  const allPosts = await getAllPostsForHome();

  const feed = new Feed({
    title: "Luis Alejandro's Blog",
    description: "Some of this and that",
    language: "es",
    id: canonicalHostnameUrl,
    link: canonicalHostnameUrl,
    image: `${canonicalHostnameUrl}/logo.png`,
    favicon: `${canonicalHostnameUrl}/favicon.png`,
    copyright: `All rights reserved ${new Date().getFullYear()}, Luis Martínez`,
    updated: new Date(),
    generator: "Feed for Node.js",
    feedLinks: {
      rss2: `${canonicalHostnameUrl}/${feedUrlPath}`,
      atom: `${canonicalHostnameUrl}/${atomUrlPath}`,
      json: `${canonicalHostnameUrl}/${jsonUrlPath}`,
    },
    author: {
      name: "Luis Martínez",
      email: "luis@luisalejandro.org",
      link: `${canonicalHostnameUrl}/portfolio`,
    },
  });

  allPosts.forEach((post: any) => {
    feed.addItem({
      title: post.title,
      id: `${canonicalHostnameUrl}/blog/posts/${post.slug}`,
      link: `${canonicalHostnameUrl}/blog/posts/${post.slug}`,
      description: post.teaser,
      date: new Date(post.created_at),
      image: post.metadata.hero.url
    });
  });

  await mkdir(path.dirname(feedPath), { recursive: true });
  await writeFile(feedPath, feed.rss2());
  await writeFile(atomPath, feed.atom1());
  await writeFile(jsonPath, feed.json1());
}
