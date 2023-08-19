import { getAllPostsSlugs, getPostAndMorePosts } from "@lib/api";
import markdownToHtml from "@lib/markdownToHtml";
import ErrorPage from "@pages/_error";
import { Layout } from "@components/Post/Layout/Layout";
import PostContent from "@components/Post/post-content";
import { BlogPostStyles } from "@styles/globals";
import { Section } from "@styles/GlobalComponents";

import "highlight.js/styles/default.css";

export default function Post({ post, morePosts }) {
  if (!post?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <>
      <Layout metadata={post}>
        <BlogPostStyles />
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
    </>
  );
}

export async function getServerSideProps({ params }) {
  const data = await getPostAndMorePosts(params.slug);
  return {
    props: {
      post: {
        ...data.post,
        metadata: {
          ...data.post?.metadata,
          teaser: await markdownToHtml(data.post?.metadata?.teaser || ""),
          content: await markdownToHtml(data.post?.metadata?.content || ""),
        },
      },
      morePosts: data.morePosts || [],
    },
  };
}
