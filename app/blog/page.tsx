import "lazysizes";
import "lazysizes/plugins/parent-fit/ls.parent-fit";
import { notFound } from "next/navigation";

import { getAllPostsForHome } from "@lib/api";
import markdownToHtml from "@lib/markdownToHtml";
import { generateBlogJsonLd } from "@lib/structuredData";

import HeroPost from "@components/Blog/HeroPost";
import MoreStories from "@components/Blog/MoreStories";
import { Section } from "@components/common/Layout/Section";
import Footer from "@components/Portfolio/Footer/Footer";
import Header from "@components/Portfolio/Header/Header";
import { ADSENSE_AD_SLOT_ID_FRONT } from "@constants/constants";
import AdSenseBanner from "@side-effects/AdSenseBanner";
import BlogClient from "@side-effects/Blog/BlogClient";

// Revalidate the page every 60 seconds
export const revalidate = 60;

export default async function BlogPage() {
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
            <HeroPost
              type="big"
              id={heroPost.id}
              slug={heroPost.slug}
              title={heroPost.title}
              coverImage={heroPost.metadata.hero}
              categories={heroPost.metadata.categories}
              excerpt={heroPost.metadata.teaser}
              date={heroPost.created_at}
            />
          )}
        </Section>
        {/* Google AdSense Banner Ad */}
        {ADSENSE_AD_SLOT_ID_FRONT && (
          <AdSenseBanner slotId={ADSENSE_AD_SLOT_ID_FRONT} />
        )}
        <Section grid overflowVisible oneColumn nopadding wide>
          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        </Section>
      </main>
      <Footer />
    </div>
  );
}
