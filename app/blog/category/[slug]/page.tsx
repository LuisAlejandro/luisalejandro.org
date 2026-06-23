import { Metadata } from "next";
import { notFound } from "next/navigation";

import { config } from "@constants/constants";
import { getAllPostsForCategory } from "@lib/api";
import { logError } from "@lib/logger";

import MoreStories from "@components/Blog/MoreStories";
import { Section } from "@components/common/Layout/Section";
import { WaveDivider } from "@components/common/Layout/WaveDivider";
import LazyImagesLoader from "@components/LazyImagesLoader";
import Footer from "@components/Portfolio/Footer/Footer";
import Header from "@components/Portfolio/Header/Header";
import BlogCategoryClient from "@side-effects/Blog/BlogCategoryClient";

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  return {
    alternates: {
      canonical: `${config.url}/blog/category/${slug}`,
      types: {
        "text/markdown": [
          {
            url: `/blog/category/${slug}.md`,
            title: "Markdown twin",
          },
        ],
      },
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  try {
    const { categoryPosts, categoryName } =
      (await getAllPostsForCategory(slug)) || {};

    if (!categoryPosts || !categoryName) {
      notFound();
    }

    return (
      <div className="bg-gray-6 text-black w-full my-0 mx-auto">
        <Header />
        <main id="main-content" tabIndex={-1} className="bg-white pb-50">
          <BlogCategoryClient />
          <WaveDivider variant="200" />
          <Section grid overflowVisible oneColumn nopadding wide>
            <h1 className="text-4xl font-light leading-4 mt-0 mb-[10px]">
              Posts related to {categoryName}
            </h1>
          </Section>
          <Section grid overflowVisible oneColumn nopadding wide>
            {categoryPosts?.length > 0 && <MoreStories posts={categoryPosts} />}
          </Section>
          <LazyImagesLoader />
        </main>
        <Footer />
      </div>
    );
  } catch (error) {
    logError("blog-category-page", error, {
      slug,
    });
    throw error;
  }
}
