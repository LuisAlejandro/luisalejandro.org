import "lazysizes";
import "lazysizes/plugins/parent-fit/ls.parent-fit";
import { notFound } from "next/navigation";

import { getAllPostsForHome } from "@lib/api";
import { logError } from "@lib/logger";
import markdownToHtml from "@lib/markdownToHtml";
import { generateBlogJsonLd } from "@lib/structuredData";

import BlogSearchWrapper from "@components/Blog/BlogSearchWrapper";
import Footer from "@components/Portfolio/Footer/Footer";
import Header from "@components/Portfolio/Header/Header";
import BlogClient from "@side-effects/Blog/BlogClient";

export default async function BlogPage() {
  try {
    const allPosts = (await getAllPostsForHome()) || [];
    const posts = await Promise.all(
      allPosts.map(async (post: any) => ({
        ...post,
        metadata: {
          ...post.metadata,
          teaser: await markdownToHtml(post.metadata?.teaser || ""),
        },
      }))
    );

    if (!posts?.length) {
      notFound();
    }

    // Generate JSON-LD structured data
    const blogJsonLd = generateBlogJsonLd(posts);

    return (
      <div className="bg-gray-6 text-black w-full my-0 mx-auto">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(blogJsonLd),
          }}
        />
        <Header />
        <main className="bg-white pb-50">
          <BlogClient />
          <svg viewBox="0 0 1920 200">
            <path fill="#ddd" d="M960,50l960-50H0L960,50z" />
          </svg>
          <BlogSearchWrapper posts={posts} />
        </main>
        <Footer />
      </div>
    );
  } catch (error) {
    logError("blog-page", error);
    throw error;
  }
}
