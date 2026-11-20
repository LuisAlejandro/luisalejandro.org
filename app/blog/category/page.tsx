import { Metadata } from "next";
import { notFound } from "next/navigation";

import { TopicCards } from "@components/Blog/TopicCards";
import { DetailHead } from "@components/common/Site/DetailHead";
import { SectionHeader } from "@components/common/Site/SectionHeader";
import { pageMeta } from "@lib/metadata";
import { SiteFooter } from "@components/common/Site/SiteFooter";
import { SiteHeader } from "@components/common/Site/SiteHeader";
import { SiteShell } from "@components/common/Site/SiteShell";
import { config } from "@constants/constants";
import { getBlogArchive } from "@lib/api";
import { logError } from "@lib/logger";

// Metadata for the categories page
export const metadata: Metadata = {
  ...pageMeta({
    title: "Blog Categories | Luis Alejandro - Browse Posts by Topic",
    description:
      "Explore all blog categories and topics. Find posts about software development, programming tutorials, remote work insights, and technology discoveries organized by category.",
    path: "/blog/category",
    locale: "es_VE",
  }),
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
      <section className="site-wrap">
        <DetailHead
          trail={[{ label: "Blog", href: "/blog" }, { label: "Topics" }]}
          index="[Blog / Topics]"
          title="Topics."
          lead={`${archive.topics.length} topics across ${archive.specs.entries} posts.`}
        />
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
