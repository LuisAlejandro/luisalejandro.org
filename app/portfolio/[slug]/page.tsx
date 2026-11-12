import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { SiteButton } from "@components/common/Site/SiteButton";
import { SiteFooter } from "@components/common/Site/SiteFooter";
import { SiteHeader } from "@components/common/Site/SiteHeader";
import { SiteShell } from "@components/common/Site/SiteShell";
import { config } from "@constants/constants";
import markdownToHtml from "@lib/markdownToHtml";
import { getPortfolioProject, portfolioProjects } from "@lib/portfolio";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return portfolioProjects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getPortfolioProject(slug);
  if (!project) notFound();
  const title = `${project.name} | Luis Alejandro`;
  const url = `${config.url}/portfolio/${project.slug}`;
  const image = {
    url: `${config.url}${project.images.thumbnail}`,
    alt: project.name,
  };
  return {
    title,
    description: project.shortDescription,
    alternates: {
      canonical: url,
      types: {
        "text/markdown": [
          { url: `/portfolio/${project.slug}.md`, title: "Markdown twin" },
        ],
      },
    },
    openGraph: {
      title,
      description: project.shortDescription,
      url,
      type: "website",
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: project.shortDescription,
      images: [image.url],
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getPortfolioProject(slug);
  if (!project) notFound();
  const html = await markdownToHtml(project.description);
  if (!html.trim())
    throw new Error(`Project description could not be rendered: ${slug}`);
  const [hero, ...screenshots] = project.images.hero;

  return (
    <SiteShell header={<SiteHeader />} footer={<SiteFooter />}>
      <section className="site-project-head site-project-head--detail site-wrap">
        <div className="site-kicker site-note">
          <nav aria-label="Breadcrumb">
            <Link href="/" className="site-link">
              Home
            </Link>{" "}
            /{" "}
            <Link href="/portfolio" className="site-link">
              Portfolio
            </Link>{" "}
            /{" "}
            <span className="text-ink" aria-current="page">
              Project
            </span>
          </nav>
          <span>[{project.year}]</span>
        </div>
        <h1 className="site-project-title">{project.name}</h1>
        <div className="site-project-head__foot">
          <p className="site-lead-type">{project.shortDescription}</p>
          <ul
            className="site-project-tags"
            aria-label="Technologies"
            role="list"
          >
            {project.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </div>
      </section>
      <div className="site-wrap">
        <figure className="site-project-shot site-project-shot--hero">
          <Image
            src={hero}
            alt={`${project.name} — project screenshot`}
            fill
            sizes="90vw"
            priority
          />
        </figure>
      </div>
      <section
        className="site-wrap site-project-story"
        aria-labelledby="project-story-title"
      >
        <aside className="site-project-story__meta">
          <img
            className="site-project-logo"
            src={project.images.logo}
            alt="Project organization or brand"
            width="120"
            height="80"
            loading="lazy"
          />
          <dl>
            <dt className="site-note">Year</dt>
            <dd>{project.year}</dd>
          </dl>
          <p className="site-note">From the project archive</p>
          <Link href="/portfolio" className="site-link site-note">
            ← All projects
          </Link>
        </aside>
        <div>
          <h2 id="project-story-title" className="site-h2">
            The work.
          </h2>
          <div
            className="site-prose site-project-prose"
            dangerouslySetInnerHTML={{ __html: html }}
          />
          {project.sources.length > 0 && (
            <nav className="site-project-sources" aria-label="Project sources">
              <h3 className="site-note">Explore the project</h3>
              <ul role="list">
                {project.sources.map((source) => (
                  <li key={source.url}>
                    <a
                      href={source.url}
                      className="site-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {source.name}
                      <span className="site-note">
                        {source.url.includes("web.archive.org")
                          ? "Archived ↗"
                          : "External ↗"}
                        <span className="sr-only"> (opens in a new tab)</span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
      </section>
      {screenshots.length > 0 && (
        <section
          className="site-wrap site-project-screens"
          aria-labelledby="project-screens-title"
        >
          <div className="site-section-head site-note">
            <h2 id="project-screens-title">A closer look</h2>
            <span>Original project imagery</span>
          </div>
          {screenshots.map((src, index) => (
            <figure className="site-project-shot" key={src}>
              <Image
                src={src}
                alt={`${project.name} — additional screenshot ${index + 1}`}
                fill
                sizes="90vw"
              />
            </figure>
          ))}
        </section>
      )}
      <section className="site-wrap site-project-end">
        <p className="site-note">There’s more in the archive.</p>
        <SiteButton href="/portfolio" variant="ghost" arrow>
          All projects
        </SiteButton>
      </section>
    </SiteShell>
  );
}
