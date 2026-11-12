import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { TopicCards } from "@components/Blog/TopicCards";
import { SectionHeader } from "@components/common/Site/SectionHeader";
import { SiteFooter } from "@components/common/Site/SiteFooter";
import { SiteHeader } from "@components/common/Site/SiteHeader";
import { SiteShell } from "@components/common/Site/SiteShell";
import { config } from "@constants/constants";
import { getBlogArchive } from "@lib/api";
import { logError } from "@lib/logger";

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
    types: {
      "text/markdown": [
        {
          url: "/blog/category.md",
          title: "Markdown twin",
        },
      ],
    },
  },
};

export default async function CategoriesPage() {
  let archive: Awaited<ReturnType<typeof getBlogArchive>>["archive"];
  try {
    ({ archive } = await getBlogArchive());
  } catch (error) {
    logError("blog-categories-page", error);
    throw error;
  }

  // An empty archive is a Cosmic outage, not "no topics exist".
  if (archive.rows.length === 0) throw new Error("Blog archive unavailable");
  if (archive.topics.length === 0) notFound();

  return (
    <SiteShell header={<SiteHeader />} footer={<SiteFooter />}>
      <section className="site-blog-head site-wrap">
        <div className="site-blog-head__top site-note">
          <nav aria-label="Breadcrumb">
            <Link href="/" className="site-link">
              Home
            </Link>{" "}
            /{" "}
            <Link href="/blog" className="site-link">
              Blog
            </Link>{" "}
            / <span className="text-ink">Topics</span>
          </nav>
          <span>[Topics]</span>
        </div>
        <h1 className="site-blog-head__title">
          <span className="site-display">Topics.</span>
          <span className="site-lead-type site-blog-head__lead">
            {archive.topics.length} topics across {archive.specs.entries} posts.
          </span>
        </h1>
      </section>

      <section className="site-section site-wrap site-blog-tail">
        <SectionHeader
          num="01"
          label="All topics"
          note="by number of entries"
        />
        <TopicCards topics={archive.topics} />
      </section>
    </SiteShell>
  );
}
