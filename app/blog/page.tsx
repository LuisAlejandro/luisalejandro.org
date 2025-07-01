import { Adsense } from "@ctrl/react-adsense";
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
import {
  ADSENSE_AD_SLOT_ID_FRONT,
  ADSENSE_PUBLISHER_ID,
  ENV_NAME,
} from "@constants/constants";
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
        {ADSENSE_PUBLISHER_ID &&
          ADSENSE_AD_SLOT_ID_FRONT &&
          ENV_NAME !== "local" && (
            <div className="inline-block align-top w-full my-12">
              <div className="flex justify-center">
                <div className="w-full max-w-4xl">
                  {/* AdSense Responsive Banner using @ctrl/react-adsense */}
                  <Adsense
                    client={ADSENSE_PUBLISHER_ID}
                    slot={ADSENSE_AD_SLOT_ID_FRONT}
                    style={{ display: "block" }}
                    format="auto"
                    responsive="true"
                  />
                </div>
              </div>
            </div>
          )}
        <Section grid overflowVisible oneColumn nopadding wide>
          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        </Section>
      </main>
      <Footer />
    </div>
  );
}
