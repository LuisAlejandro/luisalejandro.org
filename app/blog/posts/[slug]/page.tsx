import { notFound } from "next/navigation";

import { getPostAndMorePosts } from "@lib/api";
import markdownToHtml from "@lib/markdownToHtml";

import { Section } from "@components/common/Layout/Section";
import Footer from "@components/Portfolio/Footer/Footer";
import Header from "@components/Portfolio/Header/Header";
import PostContent from "@components/Post/PostContent";

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
    <>
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
            />
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
                  className="inline-block absolute -right-10 w-8 h-8 cursor-pointer bg-no-repeat post-modal-close"
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
    </>
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
