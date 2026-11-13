import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { DetailHead } from "@components/common/Site/DetailHead";
import { PageEnd } from "@components/common/Site/PageEnd";
import { SectionHeader } from "@components/common/Site/SectionHeader";
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

  const end = screenshots.length > 0 ? "03" : "02";

  return (
    <SiteShell header={<SiteHeader />} footer={<SiteFooter />}>
      <section className="site-wrap">
        <DetailHead
          trail={[
            { label: "Portfolio", href: "/portfolio" },
            { label: "Project" },
          ]}
          index={`[Portfolio / ${project.year}]`}
          eyebrow="From the project archive"
          title={project.name}
          lead={project.shortDescription}
        >
          <dl className="site-spec">
            <div>
              <dt className="site-note">Year</dt>
              <dd>{project.year}</dd>
            </div>
            <div className="site-spec__wide">
              <dt className="site-note">Stack</dt>
              <dd>{project.tags.join(" · ")}</dd>
            </div>
            <div>
              <dt className="site-note">Sources</dt>
              <dd>
                {project.sources.length > 0
                  ? String(project.sources.length).padStart(2, "0")
                  : "Archive only"}
              </dd>
            </div>
          </dl>
        </DetailHead>
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

      <section className="site-section site-wrap">
        <SectionHeader num="01" label="The work" note={String(project.year)} />
        <div className="site-project-story">
          <aside className="site-project-story__meta">
            <img
              className="site-project-logo"
              src={project.images.logo}
              alt="Project organization or brand"
              width="120"
              height="80"
              loading="lazy"
            />
          </aside>
          <div>
            <div
              className="site-prose site-project-prose"
              dangerouslySetInnerHTML={{ __html: html }}
            />
            {project.sources.length > 0 && (
              <nav
                className="site-project-sources"
                aria-label="Project sources"
              >
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
        </div>
      </section>

      {screenshots.length > 0 && (
        <section className="site-section site-wrap site-project-screens">
          <SectionHeader
            num="02"
            label="A closer look"
            note="Original project imagery"
          />
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

      <PageEnd
        num={end}
        note="From the archive"
        lines={["There's more", "in the archive."]}
        primary={{ label: "All projects", href: "/portfolio" }}
        secondary={{ label: "Let's talk", href: "/contact" }}
      />
    </SiteShell>
  );
}
