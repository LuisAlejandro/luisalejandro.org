import { notFound } from "next/navigation";

import { getAllPostsForHome } from "@lib/api";
import { logError } from "@lib/logger";
import markdownToHtml from "@lib/markdownToHtml";
import { generateBlogJsonLd } from "@lib/structuredData";

import BlogSearchWrapper from "@components/Blog/BlogSearchWrapper";
import { WaveDivider } from "@components/common/Layout/WaveDivider";
import LazyImagesLoader from "@components/LazyImagesLoader";
import Footer from "@components/Portfolio/Footer/Footer";
import Header from "@components/Portfolio/Header/Header";
import BlogClient from "@side-effects/Blog/BlogClient";

export default async function BlogPage() {
  try {
    const allPosts = (await getAllPostsForHome()) || [];
    const posts = await Promise.all(
      allPosts.map(async (post: any) => {
        // Check if teaser is already HTML (starts with <)
        const teaserHtml = post.metadata?.teaser?.startsWith("<")
          ? post.metadata.teaser
          : await markdownToHtml(post.metadata?.teaser || "");

        return {
          ...post,
          metadata: {
            ...post.metadata,
            teaser: teaserHtml,
          },
        };
      })
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
        <main id="main-content" tabIndex={-1} className="bg-white pb-50">
          <BlogClient />
          <WaveDivider variant="200" />
          <BlogSearchWrapper posts={posts} />
          <LazyImagesLoader />
        </main>
        <Footer />
      </div>
    );
  } catch (error) {
    logError("blog-page", error);
    throw error;
  }
}
