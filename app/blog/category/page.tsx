import "lazysizes";
import "lazysizes/plugins/parent-fit/ls.parent-fit";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { config } from "@constants/constants";
import { getAllCategories } from "@lib/api";

import { Section } from "@components/common/Layout/Section";
import Footer from "@components/Portfolio/Footer/Footer";
import Header from "@components/Portfolio/Header/Header";

// Metadata for the categories page
export const metadata: Metadata = {
  title: "Blog Categories | Luis Alejandro - Browse Posts by Topic",
  description:
    "Explore all blog categories and topics. Find posts about software development, programming tutorials, remote work insights, and technology discoveries organized by category.",
  keywords: [
    "blog categories",
    "software development topics",
    "programming categories",
    "TypeScript topics",
    "Python topics",
    "Golang topics",
    "remote work topics",
    "web development categories",
    "technical blog topics",
    "coding topics",
    "DevOps topics",
    "open source topics",
  ],
  authors: [{ name: config.author.name }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Blog Categories | Luis Alejandro - Browse Posts by Topic",
    description:
      "Explore all blog categories and topics. Find posts about software development, programming tutorials, remote work insights, and technology discoveries.",
    url: `${config.url}/blog/category`,
    siteName: "Luis Alejandro Martínez Faneyth",
    images: [
      {
        url: `${config.url}/favicon/android-chrome-512x512.png`,
        width: 512,
        height: 512,
        alt: config.app_name,
      },
    ],
    locale: "es_VE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog Categories | Luis Alejandro - Browse Posts by Topic",
    description:
      "Explore all blog categories and topics. Find posts about software development, programming tutorials, remote work insights, and technology discoveries.",
    images: [`${config.url}/images/banner.png`],
    site: `@${config.blog.twitter}`,
    creator: `@${config.author.twitter}`,
  },
  alternates: {
    canonical: `${config.url}/blog/category`,
  },
};

// Revalidate the page every 60 seconds
export const revalidate = 60;

export default async function CategoriesPage() {
  const categories = (await getAllCategories()) || [];

  if (!categories?.length) {
    notFound();
  }

  return (
    <div className="bg-gray-6 text-black w-full my-0 mx-auto">
      <Header />
      <main className="bg-white pb-50">
        <svg viewBox="0 0 1920 200">
          <path fill="#ddd" d="M960,50l960-50H0L960,50z" />
        </svg>
        <Section grid overflowVisible oneColumn nopadding wide>
          <div className="w-full px-[2%] py-8">
            <h1 className="text-4xl font-thin leading-4 mt-0 mb-8 text-center">
              Blog Categories
            </h1>
            <p className="text-lg font-light text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              Explore posts organized by topics. Click on any category to see
              all related articles.
            </p>

            <div className="flex flex-wrap justify-center items-center gap-4 max-w-4xl mx-auto">
              {categories.map((category: any) => {
                return (
                  <Link
                    key={category.id}
                    href={`/blog/category/${category.slug}`}
                    className={`
                      inline-block align-top font-normal
                      bg-[rgb(210,210,210)] text-[rgb(90,90,90)]
                      rounded-md transition-all duration-300 ease-in-out
                      hover:bg-[rgb(248,217,131)] hover:text-black
                      active:scale-95 active:bg-white
                      text-base px-4 py-2
                    `}
                    title={`View all posts in the "${category.title}" category`}
                    rel="tag"
                  >
                    {category.title}
                  </Link>
                );
              })}
            </div>

            <div className="text-center mt-12">
              <Link
                href="/blog"
                className="inline-block text-lg text-[rgb(90,90,90)] hover:text-black transition-colors duration-200 underline"
              >
                ← Back to all posts
              </Link>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
