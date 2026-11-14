import { WorkSection } from "@components/Home/WorkSection";
import { ProjectArchive } from "@components/common/Site/ProjectArchive";
import { PageEnd } from "@components/common/Site/PageEnd";
import { PageHero } from "@components/common/Site/PageHero";
import { SectionHeader } from "@components/common/Site/SectionHeader";
import { SiteFooter } from "@components/common/Site/SiteFooter";
import { SiteHeader } from "@components/common/Site/SiteHeader";
import { SiteShell } from "@components/common/Site/SiteShell";
import { ProjectList } from "@constants/constants";
import { portfolioProjects } from "@lib/portfolio";
import { generatePortfolioJsonLd } from "@lib/structuredData";

export default async function PortfolioPage() {
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
        <ProjectArchive projects={portfolioProjects} />
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
