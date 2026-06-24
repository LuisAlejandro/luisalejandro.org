import { notFound } from "next/navigation";

import {
  getAllCategories,
  getAllPostsSlugs,
  getPostAndMorePosts,
} from "@lib/api";
import { logError } from "@lib/logger";
import markdownToHtml from "@lib/markdownToHtml";
import { generateBlogPostingJsonLd } from "@lib/structuredData";

import { Section } from "@components/common/Layout/Section";
import { WaveDivider } from "@components/common/Layout/WaveDivider";
import Footer from "@components/Portfolio/Footer/Footer";
import Header from "@components/Portfolio/Header/Header";
import PostContent from "@components/Post/PostContent";

import "highlight.js/styles/default.css";

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const posts = await getAllPostsSlugs();

  return posts.map((post: { slug: string }) => ({
    slug: post.slug,
  }));
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  let post: any;
  let morePosts: any[];
  let allCategories: any[];
  let blogPostingJsonLd: ReturnType<typeof generateBlogPostingJsonLd>;

  try {
    const data = await getPostAndMorePosts(slug);
    allCategories = (await getAllCategories()) || [];

    if (!data?.post?.slug) {
      notFound();
    }

    post = {
      ...data.post,
      metadata: {
        ...data.post?.metadata,
        teaser: await markdownToHtml(data.post?.metadata?.teaser || ""),
        content: await markdownToHtml(data.post?.metadata?.content || ""),
      },
    };

    morePosts = data.morePosts || [];
    blogPostingJsonLd = generateBlogPostingJsonLd(post);
  } catch (error) {
    logError("blog-post-page", error, {
      slug,
    });
    throw error;
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogPostingJsonLd),
        }}
      />
      <div className="bg-gray-6 w-full mx-auto">
        <Header />
        <main id="main-content" tabIndex={-1} className="bg-white pb-50">
          <WaveDivider variant="200" />
          <Section grid overflowVisible oneColumn nopadding wide>
            <PostContent
              title={post.title}
              coverImage={post.metadata.hero}
              date={post.created_at}
              id={post.id}
              content={post.metadata.content}
              categories={post.metadata.categories}
              slug={post.slug}
              excerpt={post.metadata.teaser}
              morePosts={morePosts}
              allCategories={allCategories}
            />
          </Section>
        </main>
        <Footer />
      </div>
    </>
  );
}

// Metadata is now handled by layout.tsx for better SEO optimization
