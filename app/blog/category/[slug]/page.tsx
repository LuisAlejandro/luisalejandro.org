import { Metadata } from "next";
import { notFound } from "next/navigation";

import Link from "next/link";

import { YearArchive } from "@components/Blog/YearArchive";
import { Arrow } from "@components/common/Site/Arrow";
import { DetailHead } from "@components/common/Site/DetailHead";
import { SectionHeader } from "@components/common/Site/SectionHeader";
import { SiteFooter } from "@components/common/Site/SiteFooter";
import { SiteHeader } from "@components/common/Site/SiteHeader";
import { SiteShell } from "@components/common/Site/SiteShell";
import { config } from "@constants/constants";
import { getBlogArchive } from "@lib/api";
import { logError } from "@lib/logger";
import { pageMeta } from "@lib/metadata";
import { truncateAtWord } from "@lib/plainText";

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  // The archive call is cached per build; a miss only costs the topic's name.
  const topic = await getBlogArchive()
    .then(({ archive }) => archive.topics.find((t) => t.slug === slug))
    .catch(() => undefined);
  return {
    ...(topic &&
      pageMeta({
        title: `${topic.title} | Blog de Luis Alejandro`,
        description: truncateAtWord(topic.description, 160),
        path: `/blog/category/${slug}`,
        locale: "es_VE",
      })),
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

export async function generateStaticParams() {
  const { archive } = await getBlogArchive();
  return archive.topics.map((topic) => ({ slug: topic.slug }));
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

  // Only categories with published posts have a page. An empty archive means
  // Cosmic answered with nothing, which is an outage, not a deleted category:
  // 404ing here would let a transient failure be cached as "this page is gone".
  if (archive.rows.length === 0) {
    throw new Error("Blog archive unavailable");
  }

  const topic = archive.topics.find((t) => t.slug === slug);
  if (!topic) notFound();

  // A post can carry several topics; it belongs in each of their archives.
  const rows = archive.rows.filter((row) =>
    row.categories.some((category) => category.slug === slug)
  );

  return (
    <SiteShell header={<SiteHeader />} footer={<SiteFooter />}>
      <section className="site-wrap">
        <DetailHead
          trail={[
            { label: "Blog", href: "/blog" },
            { label: "Topics", href: "/blog/category" },
            { label: topic.title, lang: "es" },
          ]}
          index="[Blog / Topic]"
          title={topic.title}
          lang="es"
          lead={`${topic.count} ${topic.count === 1 ? "entry" : "entries"} in this topic.`}
        >
          <p className="site-detail-head__more">
            <Link href="/blog" className="site-note site-link">
              All {archive.specs.entries} posts <Arrow size="sm" />
            </Link>
          </p>
        </DetailHead>
      </section>

      <section className="site-section site-wrap site-blog-tail">
        <SectionHeader num="01" label="Index" note="newest first" />
        <YearArchive rows={rows} />
      </section>
    </SiteShell>
  );
}
