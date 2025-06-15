import "lazysizes";
import "lazysizes/plugins/parent-fit/ls.parent-fit";
import { notFound } from "next/navigation";

import { getAllPostsForHome } from "@lib/api";
import markdownToHtml from "@lib/markdownToHtml";

import HeroPost from "@components/Blog/HeroPost";
import MoreStories from "@components/Blog/MoreStories";
import { Section } from "@components/common/Layout/Section";
import Footer from "@components/Portfolio/Footer/Footer";
import Header from "@components/Portfolio/Header/Header";
import BlogClient from "@side-effects/Blog/BlogClient";

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

  return (
    <div
      itemScope={true}
      itemType="http://schema.org/Blog"
      className="bg-gray-6 text-black w-full my-0 mx-auto"
    >
      <meta itemProp="name" content="xxxx" />
      <meta itemProp="url" content="xxxx" />
      <meta itemProp="headline" content="xxxx" />
      <meta itemProp="description about" content="xxxx" />
      <meta itemProp="keywords" content="xxxx" />
      <meta itemProp="image" content="xxxx" />
      <meta itemProp="inLanguage" content="en" />
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
        <Section grid overflowVisible oneColumn nopadding wide>
          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        </Section>
      </main>
      <div id="modal-container" className="hidden z-[99998]">
        <div
          id="modal-overlay"
          className="inline-block fixed top-0 left-0 w-full h-full bg-white/80 z-[99997]"
        >
          <div
            id="modal-vertical-offset"
            className="inline-block absolute top-0 bottom-0 left-0 right-0 w-4/5 h-4/5 m-auto z-[99998] cursor-pointer"
          >
            <div
              id="modal"
              className="block relative w-full h-full m-0 p-0 bg-contain bg-no-repeat bg-center"
            >
              <div
                id="modal-close"
                className="inline-block absolute -right-10 w-8 h-8 cursor-pointer bg-no-repeat"
                style={{
                  backgroundImage: 'url("/images/sprite.svg")',
                  backgroundPosition: "-624px -32px",
                }}
              >
                <span className="sprite"></span>
              </div>
              <div id="modal-content"></div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
