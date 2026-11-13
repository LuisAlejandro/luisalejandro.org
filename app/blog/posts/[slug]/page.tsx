import Link from "next/link";
import { notFound } from "next/navigation";

import { ArticleToc } from "@components/Blog/ArticleToc";
import { DetailHead } from "@components/common/Site/DetailHead";
import { SiteButton } from "@components/common/Site/SiteButton";
import { SiteFooter } from "@components/common/Site/SiteFooter";
import { SiteHeader } from "@components/common/Site/SiteHeader";
import { SiteShell } from "@components/common/Site/SiteShell";
import { getAllPostsSlugs, getBlogArchive, getPost } from "@lib/api";
import {
  buildArchive,
  entryNumber,
  formatPostDate,
  nextOlder,
  type CosmicPost,
} from "@lib/blogArchive";
import { logError } from "@lib/logger";
import { markdownToArticle } from "@lib/markdownToHtml";
import { generateBlogPostingJsonLd } from "@lib/structuredData";

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const posts = await getAllPostsSlugs();

  return posts.map((post: { slug: string }) => ({
    slug: post.slug,
  }));
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;

  let post: CosmicPost | undefined;
  let archive: Awaited<ReturnType<typeof getBlogArchive>>["archive"];
  try {
    const [data, blog] = await Promise.all([getPost(slug), getBlogArchive()]);
    post = data as CosmicPost | undefined;
    archive = blog.archive;
  } catch (error) {
    logError("blog-post-page", error, { slug });
    throw error;
  }

  if (!post?.slug) notFound();

  // The archive carries every published post, so a published post always has a
  // row; a draft outside local falls back to its own record. Either way there
  // is a row — a missing one is a 404, never a dereference of undefined.
  const listed = archive.rows.find((entry) => entry.slug === slug);
  const row = listed ?? buildArchive([post]).rows[0];
  if (!row) notFound();

  const next = nextOlder(archive.rows, slug);

  const { html, toc } = await markdownToArticle(post.metadata?.content || "");
  const faqs: { question: string; answer: string }[] =
    post.metadata?.faqs || [];
  const jsonLd = generateBlogPostingJsonLd(post);

  return (
    <SiteShell header={<SiteHeader />} footer={<SiteFooter />}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="site-article site-wrap">
        <DetailHead
          trail={[
            { label: "Blog", href: "/blog" },
            ...(row.category
              ? [
                  {
                    label: row.category.title,
                    href: `/blog/category/${row.category.slug}`,
                    lang: "es",
                  },
                ]
              : []),
            { label: "Entry" },
          ]}
          index={`[Blog / ${listed ? entryNumber(row.number) : "Draft"}]`}
          eyebrow={row.category?.title}
          title={post.title}
          size="article"
          lang="es"
          lead={row.teaser || undefined}
        >
          <dl className="site-spec">
            <div>
              <dt className="site-note">Published</dt>
              <dd>
                <time dateTime={row.date}>{formatPostDate(row.date)}</time>
              </dd>
            </div>
            <div>
              <dt className="site-note">Reading</dt>
              <dd>{row.minutes} min</dd>
            </div>
            <div>
              <dt className="site-note">Words</dt>
              <dd>{row.words.toLocaleString("en-US")}</dd>
            </div>
          </dl>
        </DetailHead>

        {row.cover && (
          <figure className="site-cover">
            <img src={row.cover} alt="" fetchPriority="high" decoding="async" />
            <figcaption className="site-note">
              fig. 00 · <span lang="es">{post.title}</span>
            </figcaption>
          </figure>
        )}

        <div className="site-article__body" data-toc={toc.length > 0}>
          {toc.length > 0 && <ArticleToc toc={toc} />}
          <div
            className="site-prose"
            lang="es"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>

        {faqs.length > 0 && (
          <section className="site-article__faq" aria-labelledby="post-faq">
            <h2 id="post-faq" className="site-note text-ink">
              FAQ
            </h2>
            <dl lang="es">
              {faqs.map((faq) => (
                <div key={faq.question}>
                  <dt>{faq.question}</dt>
                  <dd>{faq.answer}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}

        <footer className="site-article__foot">
          <div className="site-author">
            <p className="site-note">Written by</p>
            <p className="site-author__name">Luis Alejandro</p>
            <p className="site-author__bio">
              Fullstack AI engineer. Full-stack products and AI agents that stay
              dependable after launch.
            </p>
            <SiteButton href="/contact" arrow>
              Work with me
            </SiteButton>
          </div>

          {next && (
            <Link href={`/blog/posts/${next.slug}`} className="site-next">
              <span className="site-note">
                Next in the archive
                {next.category && (
                  <>
                    {" · "}
                    <span lang="es">{next.category.title}</span>
                  </>
                )}
              </span>
              <span className="site-next__title" lang="es">
                {next.title}
              </span>
            </Link>
          )}
        </footer>
      </article>
    </SiteShell>
  );
}

// Metadata is handled by layout.tsx
