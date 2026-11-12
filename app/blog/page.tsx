import Link from "next/link";
import { notFound } from "next/navigation";

import { PaletteSearchButton } from "@components/Blog/PaletteSearchButton";
import { TopicCards } from "@components/Blog/TopicCards";
import { coverVariant, YearArchive } from "@components/Blog/YearArchive";
import { SectionHeader } from "@components/common/Site/SectionHeader";
import { SiteButton } from "@components/common/Site/SiteButton";
import { SiteFooter } from "@components/common/Site/SiteFooter";
import { SiteHeader } from "@components/common/Site/SiteHeader";
import { SiteShell } from "@components/common/Site/SiteShell";
import { siteSocialLinks } from "@constants/siteNavigation";
import { getBlogArchive } from "@lib/api";
import { entryNumber, formatPostDate } from "@lib/blogArchive";
import { logError } from "@lib/logger";
import { generateBlogJsonLd } from "@lib/structuredData";

const linkedin = siteSocialLinks.find((link) => link.label === "LinkedIn");
const rss = "/blog/posts/feed.xml";

export default async function BlogPage() {
  let data: Awaited<ReturnType<typeof getBlogArchive>>;
  try {
    data = await getBlogArchive();
  } catch (error) {
    logError("blog-page", error);
    throw error;
  }

  const { rows, topics, specs } = data.archive;
  // Cosmic errors surface as an empty collection; a blog with no entries is a
  // 404 here, so an outage never publishes "0 entries" as fact.
  if (rows.length === 0) notFound();

  const [latest, ...rest] = rows;
  const blogJsonLd = generateBlogJsonLd(data.posts);

  return (
    <SiteShell header={<SiteHeader />} footer={<SiteFooter />}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />

      <section className="site-blog-head site-wrap">
        <div className="site-blog-head__top site-note">
          <nav aria-label="Breadcrumb">
            <Link href="/" className="site-link">
              Home
            </Link>{" "}
            / <span className="text-ink">Blog</span>
          </nav>
          <span>[Blog / 02]</span>
          <span className="hidden sm:inline">Notes from current work</span>
        </div>

        <h1 className="site-blog-head__title">
          <span className="site-display">Field notes.</span>
          <span className="site-h2 site-blog-head__sub">
            Software engineering, applied AI, and production systems.
          </span>
        </h1>

        <div className="site-blog-head__foot">
          <p className="site-lead-type site-blog-head__lead">
            Notes on full-stack architecture, AI engineering, and dependable
            systems from more than a decade of remote work: TypeScript, Python,
            Go, and agent workflows.
          </p>

          <dl className="site-spec">
            <div>
              <dt className="site-note">Entries</dt>
              <dd>{String(specs.entries).padStart(2, "0")}</dd>
            </div>
            <div>
              <dt className="site-note">Words</dt>
              <dd>{specs.words.toLocaleString("en-US")}</dd>
            </div>
            <div>
              <dt className="site-note">Since</dt>
              <dd>{specs.since || "—"}</dd>
            </div>
            <div>
              <dt className="site-note">Last entry</dt>
              <dd>{specs.last ? formatPostDate(specs.last) : "—"}</dd>
            </div>
          </dl>

          <div className="site-blog-head__actions">
            <PaletteSearchButton />
            <SiteButton href={rss} variant="ghost">
              RSS
            </SiteButton>
          </div>
        </div>

        {topics.length > 0 && (
          <nav className="site-pills" aria-label="Topics">
            <ul>
              <li>
                <Link href="/blog" className="site-pill" aria-current="page">
                  All <span className="site-note">{specs.entries}</span>
                </Link>
              </li>
              {topics.map((topic) => (
                <li key={topic.slug}>
                  <Link
                    href={`/blog/category/${topic.slug}`}
                    className="site-pill"
                  >
                    <span lang="es">{topic.title}</span>{" "}
                    <span className="site-note">{topic.count}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </section>

      {latest && (
        <section className="site-section site-wrap">
          <SectionHeader
            num="00"
            label="Latest entry"
            note={entryNumber(latest.number)}
          />
          <Link href={`/blog/posts/${latest.slug}`} className="site-feat">
            {latest.cover && (
              <figure className="site-feat__cover">
                <img
                  src={coverVariant(latest.cover, 1200)}
                  alt=""
                  width={1200}
                  height={900}
                  fetchPriority="high"
                  decoding="async"
                />
                <figcaption className="site-note">
                  fig. 01 · <span lang="es">{latest.title}</span>
                </figcaption>
              </figure>
            )}
            <div className="site-feat__body">
              {latest.category && (
                <span className="site-note site-accent" lang="es">
                  {latest.category.title}
                </span>
              )}
              <h2 className="site-h2 site-feat__title" lang="es">
                {latest.title}
              </h2>
              {latest.teaser && (
                <p className="site-feat__desc" lang="es">
                  {latest.teaser}
                </p>
              )}
              <dl className="site-feat__meta">
                <div>
                  <dt className="site-note">Published</dt>
                  <dd>{formatPostDate(latest.date)}</dd>
                </div>
                <div>
                  <dt className="site-note">Reading</dt>
                  <dd>{latest.minutes} min</dd>
                </div>
              </dl>
              <span className="site-feat__cta">
                Read the entry <span aria-hidden="true">→</span>
              </span>
            </div>
          </Link>
        </section>
      )}

      <section className="site-section site-wrap">
        <SectionHeader
          num="01"
          label="Index"
          note={`${rest.length} ${rest.length === 1 ? "entry" : "entries"} · newest first`}
        />
        <YearArchive rows={rest} />
      </section>

      {topics.length > 0 && (
        <section className="site-section site-wrap">
          <SectionHeader
            num="02"
            label="What I write about"
            note={`${topics.length} topics · from the archive`}
          />
          <TopicCards topics={topics} />
        </section>
      )}

      <section className="site-section site-wrap">
        <SectionHeader num="03" label="Subscribe" note="RSS · LinkedIn" />
        <div className="site-subscribe">
          <h2 className="site-h2">No schedule. No newsletter spam.</h2>
          <div className="site-subscribe__body">
            <p className="site-lead-type">
              New entries land in the RSS feed the day they publish. Want a
              topic covered, or have a project behind the question? Write to me.
            </p>
            <div className="site-blog-head__actions">
              <SiteButton href={rss} arrow>
                RSS feed
              </SiteButton>
              {linkedin && (
                <SiteButton href={linkedin.href} variant="ghost">
                  LinkedIn ↗
                </SiteButton>
              )}
              <SiteButton href="/contact" variant="ghost">
                Suggest a topic
              </SiteButton>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
