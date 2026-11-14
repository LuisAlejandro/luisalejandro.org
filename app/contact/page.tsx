import type { Metadata } from "next";

import { ContactForm } from "@components/common/Site/ContactForm";
import { CopyEmail, LocalTime } from "@components/common/Site/ContactLive";
import { PageHero } from "@components/common/Site/PageHero";
import { FaqList } from "@components/common/Site/FaqList";
import { SectionHeader } from "@components/common/Site/SectionHeader";
import { SiteButton } from "@components/common/Site/SiteButton";
import { SiteFooter } from "@components/common/Site/SiteFooter";
import { SiteHeader } from "@components/common/Site/SiteHeader";
import { SiteShell } from "@components/common/Site/SiteShell";
import { Arrow } from "@components/common/Site/Arrow";
import { siteSocialLinks } from "@constants/siteNavigation";
import { generateHomepageFaqJsonLd } from "@lib/structuredData";

export const metadata: Metadata = {
  title: "Contact | Luis Alejandro",
  description:
    "A brief, a call or a plain email. Remote full-stack and AI engineering work; I reply within 3 business days.",
  alternates: {
    canonical: "https://luisalejandro.org/contact",
    types: {
      "text/markdown": [{ url: "/contact.md", title: "Markdown twin" }],
    },
  },
};

const email = "luis@luisalejandro.org";
const cal = "https://cal.com/martinezfaneyth";

const lead = "Let's talk.";
const typed =
  "A brief, a call or a plain email. I reply within 3 business days.";

const linkedin = siteSocialLinks.find((link) => link.label === "LinkedIn");
const github = siteSocialLinks.find((link) => link.label === "GitHub");

/** What the half hour covers, in the order it happens. */
const agenda = [
  "Your brief, the constraints and the date that can't move",
  "Whether I'm the right fit, and who to call if I'm not",
  "Next steps: scope, timing, NDA if you need one",
];

/** The four steps after a brief arrives, with the timing already published. */
const steps = [
  {
    when: "≤ 3 business days",
    title: "Reply",
    body: "A human answer, usually with a couple of questions and a slot for a call.",
  },
  {
    when: "30 min",
    title: "Call",
    body: "We go through the brief. NDA first, if you prefer.",
  },
  {
    when: "≈ 1 week",
    title: "Proposal",
    body: "Scope, milestones, stack and timing, in writing so your team can pass it on.",
  },
  {
    when: "Day 1",
    title: "Kick-off",
    body: "Access to your tools, a repo and staging from the first commit.",
  },
];

const channels = [
  {
    label: "Email",
    handle: email,
    href: `mailto:${email}`,
    body: "Briefs, questions, NDAs. The fastest way to reach me.",
  },
  {
    label: "LinkedIn",
    handle: "in/martinezfaneyth",
    href: linkedin?.href ?? "https://www.linkedin.com/in/martinezfaneyth",
    body: "Where I share new posts and work.",
  },
  {
    label: "GitHub",
    handle: "LuisAlejandro",
    href: github?.href ?? "https://github.com/LuisAlejandro",
    body: "Sixty-odd open-source projects and experiments.",
  },
  {
    label: "RSS",
    handle: "feed.xml",
    href: "/blog/posts/feed.xml",
    body: "New posts on engineering, AI in practice and remote work.",
  },
];

const faq = [
  {
    question: "Can you sign an NDA before we talk?",
    answer:
      "Yes. Tick the box in the form or just ask by email: I'll sign yours or send mine before you share anything confidential.",
  },
  {
    question: "Do you work with companies too, or only with agencies?",
    answer:
      "Both. Most of my work has been inside product teams and agencies, and I also work directly with companies on long-term contracts.",
  },
  {
    question: "Can I get a quote without a call?",
    answer:
      "If the brief is clear, yes: I can send a written estimate by email. For anything with open questions, a 30-minute call saves both of us a round of guesses.",
  },
  {
    question: "What makes a good brief?",
    answer:
      "What you're building and for whom, the deadline and why it exists, what's already decided (design, stack, hosting) and what worries you. A repo or a Figma link beats a long email.",
  },
  {
    question: "Which time zone are you in?",
    answer:
      "Venezuela, UTC−4 all year, no daylight saving. I keep overlap hours with US and European teams and work asynchronously by default.",
  },
  {
    question: "What happens to the data I send?",
    answer:
      "It is used only to reply to you and to keep the lead on record. No newsletter, no ad targeting. Details in the privacy page.",
  },
];

const updated = { iso: "2026-11-12", label: "12 Nov 2026" };

const isExternal = (href: string) => href.startsWith("http");

const faqJsonLd = generateHomepageFaqJsonLd(faq, "/contact");

export default function ContactPage() {
  return (
    <SiteShell header={<SiteHeader />} footer={<SiteFooter />}>
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
          }}
        />
      )}

      <PageHero
        trail={[{ label: "Contact" }]}
        index="[Contact / 04]"
        lead={lead}
        typed={typed}
      >
        <dl className="site-spec" data-bp="dl.spec">
          <div>
            <dt className="site-note">Email</dt>
            <dd>
              <a href={`mailto:${email}`} className="site-link">
                {email}
              </a>
              <CopyEmail email={email} />
            </dd>
          </div>
          <div>
            <dt className="site-note">Reply</dt>
            <dd>Within 3 business days</dd>
          </div>
          <div>
            <dt className="site-note">Local time</dt>
            <dd>
              <LocalTime />
            </dd>
          </div>
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

        <div className="site-hero__ctas">
          <SiteButton href="#the-brief" arrow>
            Write a brief
          </SiteButton>
          <SiteButton href={cal} variant="ghost" arrow>
            Book a 30-min call
          </SiteButton>
        </div>
      </PageHero>

      {/* 01 — the brief: a claim, then the form beside its live payload. */}
      <section className="site-section site-wrap">
        <SectionHeader
          id="the-brief"
          num="01"
          label="The brief"
          note="≈ 2 min · 6 fields"
        />
        <h2 className="site-h2 site-contact-claim" data-reveal="lines">
          Tell me what you&apos;re building. I&apos;ll tell you what it takes.
        </h2>
        <ContactForm />
      </section>

      {/* 02 — the call: a large claim on the left, the ticket on the right. */}
      <section className="site-section site-wrap">
        <SectionHeader
          num="02"
          label="Prefer to talk?"
          note="Video call · 30 min"
        />
        <div className="site-grid site-contact-call">
          <div className="site-contact-call__intro">
            <h2
              className="site-h1 site-contact-call__title"
              data-reveal="lines"
            >
              Thirty minutes. No slides.
            </h2>
            <p
              className="site-lead-type site-contact-call__lead"
              data-reveal="up"
            >
              Bring the brief, or just the problem. By the end of the call
              you&apos;ll know whether I&apos;m the right person for it, and
              when I could start.
            </p>
          </div>

          <div className="site-contact-ticket" data-reveal="up">
            <div className="site-contact-ticket__head site-note">
              <span>Call · 30 min</span>
              <span>Cal.com · video</span>
            </div>
            <ol className="site-contact-ticket__agenda">
              {agenda.map((item, index) => (
                <li key={item}>
                  <span className="site-note">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
            <div className="site-contact-ticket__foot">
              <SiteButton href={cal} variant="paper" arrow>
                Pick a slot
              </SiteButton>
              <span className="site-note">UTC−4</span>
            </div>
          </div>
        </div>
      </section>

      {/* 03 — what happens next: the home page's drawn line and four steps. */}
      <section className="site-section site-wrap">
        <SectionHeader
          num="03"
          label="What happens next"
          note={`${steps.length} steps`}
        />
        <div className="site-process-line" data-draw />
        <ol className="site-steps site-grid site-contact-steps">
          {steps.map((step, index) => (
            <li key={step.title} className="site-step" data-reveal="up">
              <span aria-hidden="true" className="site-step__dot" />
              <span className="site-note site-contact-steps__meta">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <span className="site-accent">{step.when}</span>
              </span>
              <h3 className="site-step__title">{step.title}</h3>
              <p className="site-step__body">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* 04 — elsewhere: one full-width row per channel. */}
      <section className="site-section site-wrap">
        <SectionHeader
          num="04"
          label="Elsewhere"
          note={`${channels.length} channels`}
        />
        <ul className="site-contact-channels" role="list">
          {channels.map((channel) => {
            const external = isExternal(channel.href);
            return (
              <li key={channel.label} data-reveal="up">
                <a
                  href={channel.href}
                  className="site-contact-channel site-grid"
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                >
                  <span className="site-note site-contact-channel__label">
                    {channel.label}
                  </span>
                  <span className="site-h3 site-contact-channel__handle">
                    {channel.handle}
                  </span>
                  <span className="site-contact-channel__body">
                    {channel.body}
                  </span>
                  <Arrow
                    href={channel.href}
                    size="lg"
                    className="site-contact-channel__arrow"
                  />
                </a>
              </li>
            );
          })}
        </ul>
      </section>

      {/* 05 — the questions people ask before writing. */}
      <section className="site-section site-wrap">
        <SectionHeader
          num="05"
          label="Before you write"
          note={
            <>
              Updated · <time dateTime={updated.iso}>{updated.label}</time>
            </>
          }
        />
        <FaqList items={faq} />
      </section>
    </SiteShell>
  );
}
