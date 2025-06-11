import { notFound } from "next/navigation";

import { getPostAndMorePosts } from "@lib/api";
import markdownToHtml from "@lib/markdownToHtml";

import { Section } from "@components/common/Layout/Section";
import { Layout } from "@components/Post/Layout/Layout";
import PostContent from "@components/Post/post-content";

import "highlight.js/styles/default.css";

interface PostPageProps {
  params: {
    slug: string;
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const data = await getPostAndMorePosts(slug);

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

  return (
    <Layout metadata={post}>
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
        />
      </Section>
    </Layout>
  );
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PostPageProps) {
  const { slug } = await params;
  const data = await getPostAndMorePosts(slug);

  if (!data?.post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: data.post.title,
    description:
      data.post.metadata?.teaser?.replace(/<[^>]*>/g, "").substring(0, 160) ||
      "",
    openGraph: {
      title: data.post.title,
      description:
        data.post.metadata?.teaser?.replace(/<[^>]*>/g, "").substring(0, 160) ||
        "",
      images: data.post.metadata?.hero ? [data.post.metadata.hero] : [],
    },
  };
}
