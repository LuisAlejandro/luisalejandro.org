import "lazysizes";
import "lazysizes/plugins/parent-fit/ls.parent-fit";

import { useEffect } from "react";

import { getAllPostsForHome } from "@lib/api";
import markdownToHtml from "@lib/markdownToHtml";
import ErrorPage from "@pages/_error";
import MoreStories from "@components/Blog/more-stories";
import HeroPost from "@components/Blog/hero-post";
import { Layout } from "@components/Blog/Layout/Layout";
import { BlogStyles } from "@styles/globals";
import { Section } from "@styles/GlobalComponents";

export default function Blog({ posts }: any) {
  useEffect(() => {
    const share_buttons = document.querySelectorAll(
      "#content > .preview > .bg > ul.socialbar > .share > button, #featured > article > .bg > ul.socialbar > .share > button"
    );

    share_buttons.forEach((button) => {
      button.addEventListener("click", (event) => {
        event.preventDefault();

        const pid = button.getAttribute("data-ident");
        const share_dialog = document.querySelectorAll(
          "#post-" + pid + " > .bg > .socialpop"
        );
        const post_bg = document.querySelectorAll("#post-" + pid + " > .bg");

        button.classList.toggle("active");
        if (share_dialog.length > 0) share_dialog[0].classList.toggle("show");
        if (post_bg.length > 0) post_bg[0].classList.toggle("dark");
      });
    });
  }, []);

  if (!posts?.length) {
    return <ErrorPage statusCode={404} />;
  }

  const heroPost = posts[0];
  const morePosts = posts.slice(1);

  return (
    <Layout>
      <BlogStyles />
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

export async function getServerSideProps() {
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
  return {
    props: { posts },
  };
}
