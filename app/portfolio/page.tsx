import Image from "next/image";
import Link from "next/link";

import { WorkSection } from "@components/Home/WorkSection";
import { PageEnd } from "@components/common/Site/PageEnd";
import { PageHero } from "@components/common/Site/PageHero";
import { SectionHeader } from "@components/common/Site/SectionHeader";
import { SiteFooter } from "@components/common/Site/SiteFooter";
import { SiteHeader } from "@components/common/Site/SiteHeader";
import { SiteShell } from "@components/common/Site/SiteShell";
import { ProjectList } from "@constants/constants";
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
      <PageHero
        trail={[{ label: "Portfolio" }]}
        index="[Portfolio / 01]"
        lead="Built."
        typed="Not imagined."
        intro="Websites, tools, and the systems behind them: an archive of things I helped bring to life."
      >
        <dl className="site-spec" data-bp="dl.spec">
          <div>
            <dt className="site-note">Case studies</dt>
            <dd>{String(ProjectList.length).padStart(2, "0")}</dd>
          </div>
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
          <div>
            <dt className="site-note">Order</dt>
            <dd>Newest first</dd>
          </div>
        </dl>
      </PageHero>

      <WorkSection num="01" label="Case studies" id="case-studies" />

      <section className="site-section site-wrap">
        <SectionHeader
          num="02"
          label="Project index"
          note={`${String(portfolioProjects.length).padStart(2, "0")} entries`}
        />
        <ol className="site-project-grid" role="list">
          {portfolioProjects.map((project, index) => (
            <li
              key={project.slug}
              className="site-project-card"
              data-reveal="up"
            >
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
                    →
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
                  <li key={tag} className="site-pill">
                    {tag}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </section>
      <PageEnd
        num="03"
        note="30 minutes"
        lines={["Let's make", "it real."]}
        primary={{ label: "Let's talk", href: "/contact" }}
        secondary={{
          label: "Book a 30-min call",
          href: "https://cal.com/martinezfaneyth",
        }}
      />
    </SiteShell>
  );
}
