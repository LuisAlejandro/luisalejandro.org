import "lazysizes";
import "lazysizes/plugins/parent-fit/ls.parent-fit";
import { notFound } from "next/navigation";

import { getAllPostsForCategory } from "@lib/api";

import MoreStories from "@components/Blog/MoreStories";
import { Section } from "@components/common/Layout/Section";
import Footer from "@components/Portfolio/Footer/Footer";
import Header from "@components/Portfolio/Header/Header";
import BlogCategoryClient from "@side-effects/Blog/BlogCategoryClient";

// Revalidate category pages every 60 seconds
export const revalidate = 60;

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const { categoryPosts, categoryName } =
    (await getAllPostsForCategory(slug)) || {};

  if (!categoryPosts || !categoryName) {
    notFound();
  }

  return (
    <div className="bg-gray-6 text-black w-full my-0 mx-auto">
      <Header />
      <main className="bg-white pb-50">
        <BlogCategoryClient />
        <svg viewBox="0 0 1920 200">
          <path fill="#ddd" d="M960,50l960-50H0L960,50z" />
        </svg>
        <Section grid overflowVisible oneColumn nopadding wide>
          <h1 className="text-4xl font-thin leading-4 mt-0 mb-[10px]">
            Posts related to {categoryName}
          </h1>
        </Section>
        <Section grid overflowVisible oneColumn nopadding wide>
          {categoryPosts?.length > 0 && <MoreStories posts={categoryPosts} />}
        </Section>
      </main>
      <Footer />
    </div>
  );
}
