import Image from "next/image";
import Link from "next/link";

import { SiteButton } from "@components/common/Site/SiteButton";
import { SiteFooter } from "@components/common/Site/SiteFooter";
import { SiteHeader } from "@components/common/Site/SiteHeader";
import { SiteShell } from "@components/common/Site/SiteShell";
import { portfolioProjects } from "@lib/portfolio";
import { generatePortfolioJsonLd } from "@lib/structuredData";

export default function PortfolioPage() {
  const firstYear = portfolioProjects.at(-1)?.year;
  const lastYear = portfolioProjects[0]?.year;

  return (
    <SiteShell header={<SiteHeader />} footer={<SiteFooter />}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generatePortfolioJsonLd()).replace(
            /</g,
            "\\u003c"
          ),
        }}
      />
      <section className="site-project-head site-wrap">
        <div className="site-kicker site-note">
          <nav aria-label="Breadcrumb">
            <Link href="/" className="site-link">
              Home
            </Link>{" "}
            / <span className="text-ink">Portfolio</span>
          </nav>
          <span>[Portfolio / 01]</span>
        </div>
        <h1 className="site-project-head__title site-display">
          Built.
          <br />
          <span className="site-project-head__outline">Not imagined.</span>
        </h1>
        <div className="site-project-head__foot">
          <p className="site-lead-type">
            Websites, tools, and the systems behind them.
            <br />
            An archive of things I helped bring to life.
          </p>
          <dl className="site-project-spec">
            <div>
              <dt className="site-note">Projects</dt>
              <dd>{String(portfolioProjects.length).padStart(2, "0")}</dd>
            </div>
            <div>
              <dt className="site-note">Archive</dt>
              <dd>
                {firstYear}—{lastYear}
              </dd>
            </div>
          </dl>
        </div>
      </section>
      <section
        className="site-wrap site-project-index"
        aria-labelledby="project-index-title"
      >
        <div className="site-section-head site-note">
          <h2 id="project-index-title">Project index</h2>
          <span>
            Newest first / {String(portfolioProjects.length).padStart(2, "0")}{" "}
            entries
          </span>
        </div>
        <ol className="site-project-grid" role="list">
          {portfolioProjects.map((project, index) => (
            <li key={project.slug} className="site-project-card">
              <Link
                href={`/portfolio/${project.slug}`}
                className="site-project-card__link"
                aria-labelledby={`project-${project.slug}`}
              >
                <div className="site-project-card__image">
                  <span
                    className="site-project-card__number site-note"
                    aria-hidden="true"
                  >
                    /{String(index + 1).padStart(2, "0")}
                  </span>
                  <Image
                    src={project.images.thumbnail}
                    alt=""
                    fill
                    sizes="(max-width: 767px) 90vw, 44vw"
                  />
                  <span className="site-project-card__arrow" aria-hidden="true">
                    ↗
                  </span>
                </div>
                <div className="site-project-card__heading">
                  <h3 id={`project-${project.slug}`} className="site-h3">
                    {project.name}
                  </h3>
                  <span className="site-note">{project.year}</span>
                </div>
              </Link>
              <p className="site-project-card__description">
                {project.shortDescription}
              </p>
              <ul
                className="site-project-tags"
                aria-label="Technologies"
                role="list"
              >
                {project.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </section>
      <section className="site-wrap site-project-end">
        <p className="site-note">Have something worth building?</p>
        <h2 className="site-h2">Let’s make it real.</h2>
        <SiteButton href="/contact" arrow>
          Let’s talk
        </SiteButton>
      </section>
    </SiteShell>
  );
}
