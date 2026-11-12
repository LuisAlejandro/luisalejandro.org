import type { Metadata } from "next";
import Link from "next/link";

import { PageHero } from "@components/common/Site/PageHero";
import { Reveal } from "@components/common/Site/Reveal";
import { SectionHeader } from "@components/common/Site/SectionHeader";
import { SiteFooter } from "@components/common/Site/SiteFooter";
import { SiteHeader } from "@components/common/Site/SiteHeader";
import { SiteShell } from "@components/common/Site/SiteShell";
import {
  generateAboutJsonLd,
  generateHomepageFaqJsonLd,
} from "@lib/structuredData";

export const metadata: Metadata = {
  title: "About | Luis Alejandro",
  description:
    "Venezuelan full-stack AI engineer. Lead developer of Canaima GNU/Linux, remote for startups across the Americas and Europe since, now building AI agents and products that keep working after launch.",
  alternates: {
    canonical: "https://luisalejandro.org/about",
    types: {
      "text/markdown": [{ url: "/about.md", title: "Markdown twin" }],
    },
  },
};

const cal = "https://cal.com/martinezfaneyth";

const lead = "Hi, I'm Luis.";
const typed =
  "Full-stack AI engineer in Venezuela, building for remote teams since 2009.";

const facts = [
  { label: "Based", value: "Maracay, Venezuela" },
  { label: "Languages", value: "Spanish · English" },
  { label: "Mode", value: "Remote · by contract" },
];

/** The story in dated beats; every fact here is from Luis's own record. */
const story = [
  {
    note: "2006 · Ubuntu Dapper",
    body: (
      <>
        I studied telecommunications engineering and spent more time at a
        terminal than at a circuit board: FrontPage pages on GeoCities, then
        OpenSuse, then Ubuntu Dapper, then WordPress and PHP, all out of
        curiosity. My thesis was a fibre network for a cable company, hundreds
        of calculations to reach 200,000 potential customers. There was no time
        to do them by hand, so I wrote the simulator that didn&apos;t exist yet,
        in PHP. It finished on time and scored 20 out of 20.
      </>
    ),
  },
  {
    note: "2009 → Caracas",
    body: (
      <>
        I joined CNTI, the institution behind Canaima GNU/Linux, as IT support;
        within months I was a developer, and then lead developer of versions
        3.0, 3.1, 4.0 and 4.1. Python, Debian packaging and Docker all came from
        there, along with a few nights asleep at the office out of pure
        enthusiasm. I announced a release on national TV, answered the
        president&apos;s questions about it, and spoke at DebConf12 in
        Nicaragua.
      </>
    ),
  },
  {
    note: "→ Maracay, remote",
    body: (
      <>
        Then my daughter was born and I moved home to Maracay. Every role since
        has been remote, with startups in Chile, the United States, Uruguay,
        Spain, Canada and Mexico. Working from Venezuela taught me that delivery
        depends on more than thinking, so the desk runs on a power generator and
        three internet providers.
      </>
    ),
  },
  {
    note: "2020 → a scanner in Chile",
    body: (
      <>
        My proudest moment as a lead wasn&apos;t on TV. A Chilean startup needed
        a driver for a foot scanner whose maker shipped only a Windows DLL; I
        wrote it in Python from Venezuela, with the scanner in Chile.
        Mid-roadmap, the staffing agency that hired us vanished with our pay.
        The client hired us directly, I took over development, and the{" "}
        <Link
          href="/case-studies/soleit"
          className="site-link site-link--inline"
        >
          product
        </Link>{" "}
        went on to diagnose thousands of patients.
      </>
    ),
  },
];

/** The career as a changelog: one entry per move, newest last. */
const changelog = [
  {
    version: "v0.1",
    year: "2009",
    title: "Canaima GNU/Linux",
    body: "From IT support to lead developer of versions 3.0 to 4.1 of a Venezuelan government Linux distribution: Debian packaging, ISO builds, an installer and the repository the distribution ran on.",
    tags: ["Debian", "Python", "GTK", "Packaging"],
    link: { href: "/case-studies/canaima", label: "Read the case study" },
  },
  {
    version: "v1.0",
    year: "2017",
    title: "Cybersecurity in Uruguay",
    body: "Worked with Guayoyo's security team: a CVE, CPE and CWE indexer behind a Flask API on Azure Kubernetes, one source of truth for vulnerability data.",
    tags: ["Python", "Flask", "MongoDB", "Azure"],
    link: {
      href: "/portfolio/howlermonkey-cve-indexer",
      label: "See the project",
    },
  },
  {
    version: "v2.0",
    year: "2018",
    title: "Leadbox, Canada",
    body: "Full-stack at an automotive dealership platform: a build queue that let any developer deploy more than a hundred sites, and a video generator that produced campaigns in minutes.",
    tags: ["Python", "Bash", "systemd", "Angular"],
    link: { href: "/portfolio/leadbox-build-queue", label: "See the project" },
  },
  {
    version: "v3.0",
    year: "2019",
    title: "Collage Labs, and agencies",
    body: "Founded Collage Labs for mobile and web work, and built WordPress and e-commerce sites with agencies in Spain, on someone else's deadline.",
    tags: ["WordPress", "PHP", "Docker"],
  },
  {
    version: "v4.0",
    year: "2020",
    title: "Soleit, Chile",
    body: "Full-stack for a healthtech startup: an Electron and Ionic React desktop app, a REST API, and the driver that bridged a closed-source 3D scanner into a diagnosis workflow.",
    tags: ["Electron", "Ionic", "Python", "PostgreSQL"],
    link: { href: "/case-studies/soleit", label: "Read the case study" },
  },
  {
    version: "v5.0",
    year: "2022",
    title: "Wheel The World",
    body: "The Expedia integration that took accessible inventory from about 1,000 to 600,000+ properties and raised Q1 2023 bookings 39%, and a CI/CD rebuild that cut deploys from 40 to 10 minutes.",
    tags: ["Go", "TypeScript", "PostgreSQL", "GitHub Actions"],
    link: { href: "/case-studies/expedia", label: "Read the case study" },
  },
  {
    version: "v6.0",
    head: true,
    year: "Now",
    title: "AI engineering, in production",
    body: "Everything above, pointed at one job: agents, retrieval and model calls wired into real products, with tests, fallbacks and cost limits.",
    tags: ["LLM APIs", "Agents", "RAG", "MCP"],
    link: { href: "/#services", label: "See the services" },
  },
];

/** Three words, three measures: what the work is held to. */
const principles = [
  { word: "Dependable.", note: "tests · fallbacks · cost limits" },
  { word: "Automated.", note: "containers · CI/CD · weekly builds" },
  { word: "Shipped.", note: "the demo is not the deliverable" },
];

const toolbox = [
  { group: "Languages", items: ["Python", "TypeScript", "Go", "Bash", "PHP"] },
  {
    group: "Front-end & desktop",
    items: ["Next.js", "React", "Ionic", "Electron", "GTK", "Tailwind"],
  },
  {
    group: "Back-end",
    items: ["Django", "Flask", "FastAPI", "Node.js", "REST APIs"],
  },
  { group: "AI", items: ["LLM APIs", "Agents", "RAG", "MCP", "Claude Code"] },
  {
    group: "Containers & delivery",
    items: ["Docker", "Kubernetes", "Tilt", "GitHub Actions", "AWS", "Azure"],
  },
  {
    group: "Linux & data",
    items: ["Debian packaging", "live-build", "PostgreSQL", "MySQL", "Redis"],
  },
];

/** Personal posts, not work: what he does when nobody is paying. */
const offTheClock = [
  {
    title: "I run coding agents in parallel at home",
    body: "Four or five at once, without melting the machine or paying for cloud CI.",
    href: "/blog/posts/como-correr-4-5-agentes-de-codigo-en-paralelo-sin-quemar-tu-maquina-y-sin-pagar-ci-cloud",
  },
  {
    title: "I think songwriting explains code",
    body: "Structure as an emotional tool, not a template: what songs teach about programs.",
    href: "/blog/posts/la-estructura-como-herramienta-emocional-no-plantilla-lo-que-el-songwriting-le-ensena-a-tu-codigo",
  },
  {
    title: "I defend the grey",
    body: "A case for nuanced thinking in an age of noise, hot takes included.",
    href: "/blog/posts/elogio-del-gris-una-defensa-del-pensamiento-matizado-en-la-era-del-ruido",
  },
];

const faq = [
  {
    question: "Where are you based? Do you work remotely?",
    answer:
      "In Maracay, Venezuela, UTC−4 all year. Every role since Canaima has been remote, with teams in the Americas and Europe: asynchronous by default, with overlap hours when real time helps.",
  },
  {
    question: "Do you work white-label?",
    answer:
      "Yes. I work under NDA inside your tools and process, and your client deals with your team.",
  },
  {
    question: "What kind of projects do you take on?",
    answer:
      "Full-stack product builds, AI features and agents, third-party integrations at scale, and CI/CD hardening. Long-term contracts and focused projects both work.",
  },
  {
    question: "Are you available for new projects?",
    answer:
      "Yes. A 30-minute call is enough to tell you whether I'm the right fit and when I could start.",
  },
];

const updated = { iso: "2026-11-12", label: "12 Nov 2026" };

const jsonLd = [
  generateAboutJsonLd(),
  generateHomepageFaqJsonLd(faq, "/about"),
];

const lines = (text: string[]) =>
  text.map((line) => (
    <span key={line} className="site-line-mask">
      <span>{line}</span>
    </span>
  ));

export default function AboutPage() {
  return (
    <SiteShell header={<SiteHeader />} footer={<SiteFooter />}>
      {jsonLd.map((data, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(data).replace(/</g, "\\u003c"),
          }}
        />
      ))}

      <PageHero crumb="About" index="[About / 03]" lead={lead} typed={typed}>
        <dl className="site-contact-spec site-contact-spec--even">
          {facts.map((fact) => (
            <div key={fact.label}>
              <dt className="site-note">{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
          <div>
            <dt className="site-note">Status</dt>
            <dd>
              <span
                className="site-contact-live"
                data-on="true"
                aria-hidden="true"
              />
              <span>Open to remote work</span>
            </dd>
          </div>
        </dl>
      </PageHero>

      {/* 01 — the story: a portrait frame beside the dated beats. */}
      <section className="site-section site-wrap">
        <SectionHeader num="01" label="Long story short" note="Maracay, VE" />
        <div className="site-grid site-about-story">
          <figure className="site-about-portrait">
            <div className="site-about-portrait__frame">
              <span className="site-note site-accent site-about-portrait__dim">
                ↤ 4 : 5 ↦
              </span>
              <span aria-hidden="true" className="site-about-portrait__mono">
                LA
              </span>
            </div>
            <figcaption className="site-note">
              fig. 01 · monogram · Luis Alejandro
            </figcaption>
          </figure>

          <div className="site-about-story__text">
            <Reveal>
              <p className="site-h3 site-about-story__lead">
                {lines([
                  "At 22 I shook hands with my country's president.",
                  "Two years later I was unemployed,",
                  "with a wife and a daughter.",
                ])}
              </p>
            </Reveal>
            <div className="site-about-story__body">
              {story.map((beat) => (
                <p key={beat.note}>
                  <span className="site-note site-accent site-about-story__note">
                    {beat.note}
                  </span>
                  {beat.body}
                </p>
              ))}
              <p>
                One rule above everything: moral leadership comes before
                technical leadership. Honesty, transparency, and saying so when
                I&apos;m wrong.
              </p>
              <p className="site-about-story__quote">
                <em>
                  Working for a Linux distribution was my dream job, and I can
                  still say it was the happiest I&apos;ve been with a job.
                </em>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 02 — the changelog: one row per move, newest last. */}
      <section className="site-section site-wrap">
        <SectionHeader
          num="02"
          label="Changelog"
          note="git log --reverse --oneline"
        />
        <ol className="site-about-log">
          {changelog.map((entry) => (
            <li key={entry.version} className="site-about-log__entry site-grid">
              <span className="site-note site-about-log__v">
                {entry.version}
                {entry.head && <span className="site-accent"> (HEAD)</span>}
              </span>
              <span className="site-h3 site-about-log__year">{entry.year}</span>
              <h3 className="site-about-log__title">{entry.title}</h3>
              <div className="site-about-log__body">
                <p>{entry.body}</p>
                <ul className="site-about-log__tags" role="list">
                  {entry.tags.map((tag) => (
                    <li key={tag} className="site-note">
                      {tag}
                    </li>
                  ))}
                </ul>
                {entry.link && (
                  <Link
                    href={entry.link.href}
                    className="site-note site-link site-about-log__link"
                  >
                    {entry.link.label} →
                  </Link>
                )}
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* 03 — principles: three words that fill in as they scroll past. */}
      <section className="site-section site-wrap">
        <SectionHeader
          num="03"
          label="Principles"
          note="fig. 02 · spec → build"
        />
        <h2 className="sr-only">Principles</h2>
        {principles.map((principle, index) => (
          <div
            key={principle.word}
            className="site-about-wf"
            style={{ "--site-wf-step": index } as React.CSSProperties}
          >
            <p
              className="site-display site-about-wf__line"
              data-text={principle.word}
            >
              {principle.word}
            </p>
            <span className="site-note site-accent site-about-wf__dim">
              {principle.note}
            </span>
          </div>
        ))}
        <div className="site-grid site-about-principles">
          <p className="site-lead-type">
            A strong pipeline catches bugs before people do and gives the whole
            team its time back. On a new project I&apos;m the one checking that
            containers are in place and the build is as fast as the resources
            allow. Then I measure, after agreeing what we&apos;re measuring and
            why.
          </p>
        </div>
      </section>

      {/* 04 — toolbox: one row per area, the tools as pills. */}
      <section className="site-section site-wrap">
        <SectionHeader
          num="04"
          label="Toolbox"
          note="Every tool here shipped on a real project"
        />
        <dl className="site-about-tools">
          {toolbox.map((row) => (
            <div key={row.group} className="site-about-tools__row site-grid">
              <dt className="site-note text-ink">{row.group}</dt>
              <dd>
                <ul className="site-about-tools__stack" role="list">
                  {row.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
        <p className="site-note site-about-tools__foot">
          Industries so far: government · cybersecurity · automotive ·
          healthtech · travel &amp; accessibility · e-commerce · developer
          tooling
        </p>
      </section>

      {/* 05 — off the clock: three posts that are not about work. */}
      <section className="site-section site-wrap">
        <SectionHeader
          num="05"
          label="Off the clock"
          note={
            <Link href="/blog" className="site-link">
              All posts →
            </Link>
          }
        />
        <ul className="site-about-off site-grid" role="list">
          {offTheClock.map((item, index) => (
            <li key={item.href}>
              <Link href={item.href} className="site-about-off__link">
                <span className="site-note site-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="site-h3 site-about-off__title">{item.title}</h3>
                <p className="site-about-off__body">{item.body}</p>
                <span className="site-note site-about-off__more">
                  Read on the blog (ES) →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* 06 — FAQ, the same rows as the contact page. */}
      <section className="site-section site-wrap">
        <SectionHeader
          num="06"
          label="FAQ"
          note={
            <>
              Updated · <time dateTime={updated.iso}>{updated.label}</time>
            </>
          }
        />
        <div className="site-contact-faqs">
          {faq.map((item) => (
            <details key={item.question} className="site-contact-faq">
              <summary>
                <span className="site-h3">{item.question}</span>
                <span aria-hidden="true" className="site-contact-faq__icon" />
              </summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      {/* 07 — next: a display claim and the two ways to act on it. */}
      <section className="site-section site-wrap">
        <SectionHeader num="07" label="Next" note="30 minutes" />
        <Reveal>
          <h2 className="site-display site-about-next">
            {lines(["That's me.", "Your turn."])}
          </h2>
        </Reveal>
        <div className="site-hero__ctas site-about-next__actions">
          <a
            href={cal}
            target="_blank"
            rel="noopener noreferrer"
            className="site-btn"
          >
            <span>Book a 30-min call</span>
            <span aria-hidden="true">↗</span>
          </a>
          <a href="/files/resume.pdf" className="site-btn site-btn--ghost">
            <span>Download CV (PDF)</span>
          </a>
        </div>
      </section>
    </SiteShell>
  );
}
