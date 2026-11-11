import { Metadata } from "next";
import { notFound } from "next/navigation";

import Link from "next/link";

import { YearArchive } from "@components/Blog/YearArchive";
import { SectionHeader } from "@components/common/Site/SectionHeader";
import { SiteFooter } from "@components/common/Site/SiteFooter";
import { SiteHeader } from "@components/common/Site/SiteHeader";
import { SiteShell } from "@components/common/Site/SiteShell";
import { config } from "@constants/constants";
import { getBlogArchive } from "@lib/api";
import { logError } from "@lib/logger";

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

  let archive: Awaited<ReturnType<typeof getBlogArchive>>["archive"];
  try {
    ({ archive } = await getBlogArchive());
  } catch (error) {
    logError("blog-category-page", error, { slug });
    throw error;
  }

  // Only categories with published posts have a page; an emptied or deleted
  // category stops resolving instead of rendering an empty archive.
  const topic = archive.topics.find((t) => t.slug === slug);
  if (!topic) notFound();

  const rows = archive.rows.filter((row) => row.category?.slug === slug);

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
            /{" "}
            <span className="text-ink" lang="es">
              {topic.title}
            </span>
          </nav>
          <span>[Topic]</span>
          <Link href="/blog/category" className="site-link hidden sm:inline">
            All topics →
          </Link>
        </div>
        <h1 className="site-blog-head__title">
          <span className="site-h1" lang="es">
            {topic.title}
          </span>
          <span className="site-lead-type site-blog-head__lead">
            {topic.count} {topic.count === 1 ? "entry" : "entries"} ·{" "}
            <Link href="/blog" className="site-link">
              all {archive.specs.entries} posts →
            </Link>
          </span>
        </h1>
      </section>

      <section className="site-section site-wrap site-blog-tail">
        <SectionHeader num="01" label="Index" note="newest first" />
        <YearArchive rows={rows} />
      </section>
    </SiteShell>
  );
}
