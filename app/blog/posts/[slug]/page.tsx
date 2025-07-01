import { notFound } from "next/navigation";

import { getAllCategories, getPostAndMorePosts } from "@lib/api";
import markdownToHtml from "@lib/markdownToHtml";
import { generateBlogPostingJsonLd } from "@lib/structuredData";

import { Section } from "@components/common/Layout/Section";
import Footer from "@components/Portfolio/Footer/Footer";
import Header from "@components/Portfolio/Header/Header";
import PostContent from "@components/Post/PostContent";

import "highlight.js/styles/default.css";

// Revalidate individual blog posts every 60 seconds
export const revalidate = 60;

interface PostPageProps {
  params: {
    slug: string;
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const data = await getPostAndMorePosts(slug);
  const allCategories = (await getAllCategories()) || [];

  if (!data?.post?.slug) {
    notFound();
  }

  const post = {
    ...data.post,
    metadata: {
      ...data.post?.metadata,
      teaser: await markdownToHtml(data.post?.metadata?.teaser || ""),
      content: await markdownToHtml(data.post?.metadata?.content || ""),
    },
  };

  const morePosts = data.morePosts || [];

  // Generate JSON-LD structured data
  const blogPostingJsonLd = generateBlogPostingJsonLd(post);

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
        <main className="bg-white pb-50">
          <svg viewBox="0 0 1920 200">
            <path fill="#ddd" d="M960,50l960-50H0L960,50z" />
          </svg>
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
