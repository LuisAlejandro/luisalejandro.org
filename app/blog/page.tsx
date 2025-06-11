import "lazysizes";
import "lazysizes/plugins/parent-fit/ls.parent-fit";
import { notFound } from "next/navigation";

import { getAllPostsForHome } from "@lib/api";
import markdownToHtml from "@lib/markdownToHtml";

import HeroPost from "@components/Blog/hero-post";
import { Layout } from "@components/Blog/Layout/Layout";
import MoreStories from "@components/Blog/more-stories";
import { Section } from "@components/common/Layout/Section";
import BlogClient from "./components/BlogClient";

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
    <Layout>
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
    </Layout>
  );
}
