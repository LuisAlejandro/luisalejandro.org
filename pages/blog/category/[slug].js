import "lazysizes";
import "lazysizes/plugins/parent-fit/ls.parent-fit";
import { useEffect } from "react";

import { getAllPostsForCategory } from "@lib/api";
import MoreStories from "@components/Blog/more-stories";
import { Layout } from "@components/Blog/Layout/Layout";
import { BlogStyles } from "@styles/globals";
import { Section } from "@styles/GlobalComponents";

export default function Blog({ allPosts, categoryName }) {
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

  return (
    <Layout>
      <BlogStyles />
      <svg viewBox="0 0 1920 200">
        <path fill="#ddd" d="M960,50l960-50H0L960,50z" />
      </svg>
      <Section grid overflowVisible oneColumn nopadding wide>
        <h1>Posts related to {categoryName}</h1>
      </Section>
      <Section grid overflowVisible oneColumn nopadding wide>
        {allPosts?.length > 0 && <MoreStories posts={allPosts} />}
      </Section>
    </Layout>
  );
}

export async function getServerSideProps({ params }) {
  const { categoryPosts, categoryName } =
    (await getAllPostsForCategory(params.slug)) || {};
  return {
    props: {
      allPosts: categoryPosts || null,
      categoryName: categoryName || null,
    },
  };
}
