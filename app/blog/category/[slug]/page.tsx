import "lazysizes";
import "lazysizes/plugins/parent-fit/ls.parent-fit";
import { notFound } from "next/navigation";

import { Layout } from "@components/Blog/Layout/Layout";
import MoreStories from "@components/Blog/more-stories";
import { Section } from "@components/common/Layout/Section";
import { getAllPostsForCategory } from "@lib/api";
import BlogCategoryClient from "../../components/BlogCategoryClient";

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { categoryPosts, categoryName } =
    (await getAllPostsForCategory(params.slug)) || {};

  if (!categoryPosts || !categoryName) {
    notFound();
  }

  return (
    <Layout>
      <style jsx global>{`
        body {
          font-family: var(--font-roboto), sans-serif;
          font-size: 1.6rem;
          cursor: default;
          overflow-x: hidden;
          line-height: 1em;
          background: #ddd;
          color: rgb(0, 0, 0);
        }
      `}</style>
      <BlogCategoryClient />
      <svg viewBox="0 0 1920 200">
        <path fill="#ddd" d="M960,50l960-50H0L960,50z" />
      </svg>
      <Section grid overflowVisible oneColumn nopadding wide>
        <h1>Posts related to {categoryName}</h1>
      </Section>
      <Section grid overflowVisible oneColumn nopadding wide>
        {categoryPosts?.length > 0 && <MoreStories posts={categoryPosts} />}
      </Section>
    </Layout>
  );
}
