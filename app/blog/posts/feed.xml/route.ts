import { Feed } from "feed";
import { NextResponse } from "next/server";

import { canonicalHostnameUrl } from "@constants/constants";
import { getAllPostsForHome } from "@lib/api";

export async function GET() {
  try {
    const allPosts = await getAllPostsForHome();

    const feed = new Feed({
      title:
        "Blog | Luis Alejandro - Desarrollo de Software & Insights de Trabajo Remoto",
      description:
        "Blog de desarrollo de software por ingeniero venezolano. Tutoriales de TypeScript, Python, Golang. Consejos de trabajo remoto, insights de código abierto y descubrimientos tecnológicos.",
      language: "es",
      id: canonicalHostnameUrl,
      link: canonicalHostnameUrl,
      image: `${canonicalHostnameUrl}/logo.png`,
      favicon: `${canonicalHostnameUrl}/favicon.png`,
      copyright: `All rights reserved ${new Date().getFullYear()}, Luis Martínez`,
      updated: new Date(),
      generator: "Feed for Node.js",
      feedLinks: {
        rss2: `${canonicalHostnameUrl}/blog/posts/feed.xml`,
        atom: `${canonicalHostnameUrl}/blog/posts/atom.xml`,
        json: `${canonicalHostnameUrl}/blog/posts/feed.json`,
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
        image: post.metadata.hero.url,
      });
    });

    const rssXml = feed.rss2();

    return new NextResponse(rssXml, {
      headers: {
        "Content-Type": "application/rss+xml; charset=utf-8",
        "Cache-Control": "s-maxage=3600, stale-while-revalidate",
      },
    });
  } catch (error) {
    console.error("Error generating RSS feed:", error);
    return new NextResponse("Error generating RSS feed", { status: 500 });
  }
}
