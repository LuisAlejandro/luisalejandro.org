import "lazysizes";
import "lazysizes/plugins/parent-fit/ls.parent-fit";
import { notFound } from "next/navigation";

import { getAllPostsForHome } from "@lib/api";
import { logError } from "@lib/logger";
import markdownToHtml from "@lib/markdownToHtml";
import { generateBlogJsonLd } from "@lib/structuredData";

import HeroPost from "@components/Blog/HeroPost";
import MoreStories from "@components/Blog/MoreStories";
import PostPreview from "@components/Blog/PostPreview";
import { Section } from "@components/common/Layout/Section";
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

    const heroPost = posts[0];
    const morePosts = posts.slice(1);

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
        <Section grid overflowVisible oneColumn nopadding wide>
          {heroPost && (
            <>
              <HeroPost
                className="hidden lg:flex"
                type="big"
                id={heroPost.id}
                slug={heroPost.slug}
                title={heroPost.title}
                coverImage={heroPost.metadata.hero}
                categories={heroPost.metadata.categories}
                excerpt={heroPost.metadata.teaser}
                date={heroPost.created_at}
              />
              <div
                id="featured-preview"
                className="grid grid-cols-1 lg:hidden gap-[25px] w-[94%] mx-auto"
              >
                <PostPreview
                  key={heroPost.id}
                  type="preview"
                  id={heroPost.id}
                  slug={heroPost.slug}
                  title={heroPost.title}
                  coverImage={heroPost.metadata.hero}
                  categories={heroPost.metadata.categories}
                  excerpt={heroPost.metadata.teaser}
                  date={heroPost.created_at}
                />
              </div>
            </>
          )}
        </Section>
        <Section grid overflowVisible oneColumn nopadding wide>
          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        </Section>
      </main>
      <Footer />
    </div>
    );
  } catch (error) {
    logError("blog-page", error);
    throw error;
  }
}
