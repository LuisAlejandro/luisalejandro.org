import type { Metadata } from "next";
import Link from "next/link";

import { SiteButton } from "@components/common/Site/SiteButton";
import { SiteFooter } from "@components/common/Site/SiteFooter";
import { SiteHeader } from "@components/common/Site/SiteHeader";
import { SiteShell } from "@components/common/Site/SiteShell";
import { experience } from "@constants/constants";
import { generateAboutJsonLd } from "@lib/structuredData";

export const metadata: Metadata = {
  title: "About | Luis Alejandro",
  description:
    "Venezuelan full-stack AI engineer. A Linux distribution lead turned product engineer, building AI agents and web products that keep working after launch.",
  alternates: {
    canonical: "https://luisalejandro.org/about",
    types: {
      "text/markdown": [{ url: "/about.md", title: "Markdown twin" }],
    },
  },
};

const cal = "https://cal.com/martinezfaneyth";

const facts = [
  { label: "Based", value: "Maracay, Venezuela" },
  { label: "Born in", value: "Caracas" },
  { label: "Mode", value: "Remote · by contract" },
  { label: "Status", value: "Open to remote work" },
];

/** The career as a changelog: one entry per move, newest last. */
const changelog = [
  {
    version: "v0.1",
    year: "2009",
    title: "Canaima GNU/Linux",
    body: "Started as a Linux distribution developer for a Venezuelan government agency: Debian packaging, ISO builds, and the infrastructure the distribution ran on. Leading it meant consensus with a community and requirements from an administration at the same time.",
    tags: ["Debian", "Python", "Django", "Packaging"],
    href: "/case-studies/canaima",
  },
  {
    version: "v1.0",
    year: "2017",
    title: "Cybersecurity, Python",
    body: "Worked with Guayoyo's security team in Uruguay: a CVE, CPE and CWE indexer behind a Flask API, deployed on Azure Kubernetes so the company had one source of truth for vulnerability data.",
    tags: ["Python", "Flask", "MongoDB", "Azure"],
    href: "/portfolio/howlermonkey-cve-indexer",
  },
  {
    version: "v2.0",
    year: "2018",
    title: "Leadbox, at scale",
    body: "Full-stack at an automotive dealership platform in Canada: a courier-broker-worker build queue that let any developer trigger deploys for more than a hundred sites, and a video generator that produced campaigns in minutes with FFmpeg and Azure Blob.",
    tags: ["Python", "Bash", "systemd", "Angular"],
    href: "/portfolio/leadbox-build-queue",
  },
  {
    version: "v3.0",
    year: "2019",
    title: "Collage Labs, and agencies",
    body: "Founded Collage Labs for mobile and web work, and built WordPress and e-commerce sites with agencies in Spain. Client sites, custom themes, and the discipline of shipping on someone else's deadline.",
    tags: ["WordPress", "PHP", "CSS", "Docker"],
    href: "/portfolio",
  },
  {
    version: "v4.0",
    year: "2020",
    title: "Soleit, hardware and desktop",
    body: "Full-stack for a Chilean healthtech startup: an Electron and Ionic React desktop app, a REST API, and a driver bridging a closed-source 3D scanner into a diagnosis workflow. It carried the product to its growth round.",
    tags: ["Electron", "Ionic", "Node.js", "PostgreSQL"],
    href: "/case-studies/soleit",
  },
  {
    version: "v5.0",
    year: "2022",
    title: "Wheel The World",
    body: "Senior software engineer at an accessible-travel startup: the Expedia integration that took inventory from about 1,000 to 600,000+ accessible properties and raised Q1 2023 bookings 39%, and a CI/CD rebuild that cut deploys from 40 to 10 minutes.",
    tags: ["Go", "TypeScript", "PostgreSQL", "GitHub Actions"],
    href: "/case-studies/expedia",
  },
  {
    version: "v6.0 (HEAD)",
    year: String(new Date().getFullYear()),
    title: "AI engineering, in production",
    body: "Today the work is AI in products that ship: agents, retrieval and model calls wired into real systems with tests, fallbacks and cost limits, on top of full-stack delivery in TypeScript, Python and Go. What holds up on real projects ends up on the blog.",
    tags: ["LLM APIs", "Agents", "RAG", "MCP"],
    href: "/#services",
  },
];

const principles = [
  {
    title: "Dependable after launch",
    note: "the demo is not the deliverable",
    body: "A feature that works once is not done. Tests, fallbacks, limits and a deploy path that fails loudly are part of the build, not a later phase.",
  },
  {
    title: "Readable by the next engineer",
    note: "boring over clever",
    body: "Code is read far more often than it is written. The shortest working diff that the next person can follow beats the elegant one only I understand.",
  },
  {
    title: "Measured, then claimed",
    note: "no invented numbers",
    body: "Every figure on this site comes from a project that shipped. If a number cannot be traced to a source, it does not go on the page.",
  },
];

const toolbox = [
  {
    group: "Languages",
    items: ["TypeScript", "Python", "Go", "Bash", "PHP"],
  },
  {
    group: "Front-end",
    items: ["Next.js", "React", "Ionic", "Tailwind", "Lenis"],
  },
  {
    group: "Back-end",
    items: ["Node.js", "FastAPI", "Django", "Express", "REST APIs"],
  },
  {
    group: "AI",
    items: ["LLM APIs", "Agents", "RAG", "MCP", "Claude Code"],
  },
  {
    group: "Infra & delivery",
    items: ["Docker", "GitHub Actions", "Google Cloud", "AWS", "Azure"],
  },
  {
    group: "Data",
    items: ["PostgreSQL", "MySQL", "Redis", "MongoDB", "DynamoDB"],
  },
];

const faq = [
  {
    q: "Where are you based? Do you work remotely?",
    a: "I live in Maracay, Venezuela (UTC−4 all year) and work remotely. More than a decade of that has been with teams in the US and Europe, asynchronous by default with overlap hours when real time helps.",
  },
  {
    q: "What kind of projects do you take on?",
    a: "Full-stack product builds, AI features and agents, third-party integrations at scale, and CI/CD hardening. Long-term contracts and focused projects both work.",
  },
  {
    q: "Do you work white-label?",
    a: "Yes. I work under NDA inside your tools and process, and your client deals with your team.",
  },
  {
    q: "Are you available for new projects?",
    a: "Yes. A 30-minute call is enough to tell you whether I'm the right fit and when I could start.",
  },
];

export default function AboutPage() {
  return (
    <SiteShell header={<SiteHeader />} footer={<SiteFooter />}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateAboutJsonLd()).replace(
            /</g,
            "\\u003c"
          ),
        }}
      />
      <section className="site-contact-head site-wrap">
        <div className="site-kicker site-note">
          <nav aria-label="Breadcrumb">
            <Link href="/" className="site-link">
              Home
            </Link>{" "}
            /{" "}
            <span className="text-ink" aria-current="page">
              About
            </span>
          </nav>
          <span>[About / 03]</span>
        </div>

        <h1 className="site-contact-title">
          <span className="site-display">Hi, I&apos;m Luis.</span>
          <br />
          <span className="site-contact-title__lead site-lead-type">
            Full-stack AI engineer in Venezuela, building products for remote
            teams since 2009.
          </span>
        </h1>

        <dl className="site-facts site-contact-facts">
          {facts.map((fact) => (
            <div key={fact.label}>
              <dt className="site-note">{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section
        className="site-wrap site-contact-section"
        aria-labelledby="story-title"
      >
        <div className="site-contact-section__label">
          <p className="site-note">
            <span className="site-case-section__index">01</span> Long story
            short
          </p>
          <p className="site-note text-ink-muted">Maracay, VE</p>
        </div>
        <div className="site-contact-section__body site-story">
          <h2 id="story-title" className="site-h2">
            {experience} years of shipping, in four moves.
          </h2>

          <p>
            I started in 2009 building a Linux distribution for a Venezuelan
            government agency. Canaima GNU/Linux meant Debian packaging, ISO
            builds, our own repository and a community that had opinions. It
            shipped to schools, universities and public offices, and it taught
            me the thing I still optimise for: software that keeps working when
            thousands of people depend on it and nobody is watching.
          </p>
          <p>
            Then came the years of agencies and product teams. A vulnerability
            indexer in Uruguay, a build queue for a hundred dealership sites in
            Canada, a closed-source 3D scanner wired into a desktop app for a
            Chilean healthtech startup. Different countries, same job: take a
            messy process and make it a system someone can operate.
          </p>
          <p>
            The largest of those was Wheel The World. Integrating the Expedia
            hotel database took their accessible inventory from about a thousand
            properties to more than 600,000, and rebuilding their pipeline cut
            deploys from 40 minutes to 10. Both were measured, which is why they
            are on this site and the unmeasured ones are not.
          </p>
          <p>
            Today the work is AI engineering on top of that foundation: agents,
            retrieval and model calls wired into products with tests, fallbacks
            and cost limits, in TypeScript, Python and Go. I say no a lot,
            especially when the hype is high. What survives a real project ends
            up on the blog.
          </p>
          <p>
            One rule above everything: I tell clients the truth, including when
            it is inconvenient. Trust lasts longer than any excuse.
          </p>
        </div>
      </section>

      <section
        className="site-wrap site-contact-section"
        aria-labelledby="changelog-title"
      >
        <div className="site-contact-section__label">
          <p className="site-note">
            <span className="site-case-section__index">02</span> Changelog
          </p>
          <p className="site-note text-ink-muted">
            git log --reverse --oneline
          </p>
        </div>
        <div className="site-contact-section__body">
          <h2 id="changelog-title" className="site-h2">
            One entry per move.
          </h2>
          <ol className="site-changelog" role="list">
            {changelog.map((entry) => (
              <li key={entry.version}>
                <div className="site-changelog__head site-note">
                  <span>{entry.version}</span>
                  <span>{entry.year}</span>
                </div>
                <h3 className="site-h3">{entry.title}</h3>
                <p>{entry.body}</p>
                <ul className="site-project-tags" role="list">
                  {entry.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
                <Link href={entry.href} className="site-link site-note">
                  {entry.href.startsWith("/#")
                    ? "What that looks like now"
                    : "See it in detail"}
                  <span aria-hidden="true"> →</span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        className="site-wrap site-contact-section"
        aria-labelledby="principles-title"
      >
        <div className="site-contact-section__label">
          <p className="site-note">
            <span className="site-case-section__index">03</span> Principles
          </p>
          <p className="site-note text-ink-muted">what I optimise for</p>
        </div>
        <div className="site-contact-section__body">
          <h2 id="principles-title" className="site-h2">
            Three rules that decide the rest.
          </h2>
          <dl className="site-principles">
            {principles.map((principle) => (
              <div key={principle.title}>
                <dt>
                  <span className="site-h3">{principle.title}</span>
                  <span className="site-note text-ink-muted">
                    {principle.note}
                  </span>
                </dt>
                <dd>{principle.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section
        className="site-wrap site-contact-section"
        aria-labelledby="toolbox-title"
      >
        <div className="site-contact-section__label">
          <p className="site-note">
            <span className="site-case-section__index">04</span> Toolbox
          </p>
          <p className="site-note text-ink-muted">
            every tool earned a real project
          </p>
        </div>
        <div className="site-contact-section__body">
          <h2 id="toolbox-title" className="site-h2">
            What I reach for.
          </h2>
          <dl className="site-toolbox">
            {toolbox.map((group) => (
              <div key={group.group}>
                <dt className="site-note">{group.group}</dt>
                <dd>
                  <ul className="site-project-tags" role="list">
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section
        className="site-wrap site-contact-section"
        aria-labelledby="faq-title"
      >
        <div className="site-contact-section__label">
          <p className="site-note">
            <span className="site-case-section__index">05</span> FAQ
          </p>
        </div>
        <div className="site-contact-section__body">
          <h2 id="faq-title" className="site-h2">
            The usual questions.
          </h2>
          <dl className="site-qa">
            {faq.map((item) => (
              <div key={item.q}>
                <dt>{item.q}</dt>
                <dd>{item.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="site-wrap site-project-end">
        <p className="site-note">Now you know me. Your turn.</p>
        <h2 className="site-h2">Let&apos;s build something.</h2>
        <div className="site-contact-actions">
          <SiteButton href={cal} arrow>
            Book a 30-min call
          </SiteButton>
          <SiteButton href="/contact" variant="ghost">
            Send a brief
          </SiteButton>
        </div>
      </section>
    </SiteShell>
  );
}
