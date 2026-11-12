import type { Metadata } from "next";
import Link from "next/link";

import { ContactForm } from "@components/common/Site/ContactForm";
import { SiteButton } from "@components/common/Site/SiteButton";
import { SiteFooter } from "@components/common/Site/SiteFooter";
import { SiteHeader } from "@components/common/Site/SiteHeader";
import { SiteShell } from "@components/common/Site/SiteShell";
import { contactAction, siteSocialLinks } from "@constants/siteNavigation";

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

const linkedin = siteSocialLinks.find((link) => link.label === "LinkedIn");
const github = siteSocialLinks.find((link) => link.label === "GitHub");

/** The four steps after a brief arrives, with the timing already published. */
const steps = [
  {
    num: "01",
    when: "3 business days",
    title: "Reply",
    body: "A human answer, usually with a couple of questions and a slot for a call.",
  },
  {
    num: "02",
    when: "30 min",
    title: "Call",
    body: "We go through the brief. NDA first, if you prefer.",
  },
  {
    num: "03",
    when: "≈ 1 week",
    title: "Proposal",
    body: "Scope, milestones, stack and timing, in writing so your team can pass it on.",
  },
  {
    num: "04",
    when: "Day 1",
    title: "Kick-off",
    body: "Access to your tools, a repo and staging from the first commit.",
  },
];

const elsewhere = [
  {
    label: "Email",
    value: email,
    href: `mailto:${email}`,
    note: "Briefs, questions, NDAs. The fastest way to reach me.",
    external: false,
  },
  {
    label: "LinkedIn",
    value: linkedin?.href.replace(/^https:\/\/www\./, "") ?? "linkedin.com",
    href: linkedin?.href ?? "#",
    note: "Where I share new posts and work.",
    external: true,
  },
  {
    label: "GitHub",
    value: "github.com/LuisAlejandro",
    href: github?.href ?? "#",
    note: "Open-source bits and experiments.",
    external: true,
  },
  {
    label: "RSS",
    value: "blog/posts/feed.xml",
    href: "/blog/posts/feed.xml",
    note: "New posts on engineering, AI in practice and remote work.",
    external: false,
  },
];

const faq = [
  {
    q: "Can you sign an NDA before we talk?",
    a: "Yes. Tick the box in the form or just ask by email: I'll sign yours or send mine before you share anything confidential.",
  },
  {
    q: "Do you work with companies too, or only with agencies?",
    a: "Both. Most of my work has been inside product teams and agencies, and I also work directly with companies on long-term contracts.",
  },
  {
    q: "Can I get a quote without a call?",
    a: "If the brief is clear, yes: I can send a written estimate by email. For anything with open questions, a 30-minute call saves both of us a round of guesses.",
  },
  {
    q: "What makes a good brief?",
    a: "What you're building and for whom, the deadline and why it exists, what's already decided (design, stack, hosting) and what worries you. A repo or a Figma link beats a long email.",
  },
  {
    q: "Which time zone are you in?",
    a: "Venezuela, UTC−4 all year. I keep overlap hours with US and European teams and work asynchronously by default.",
  },
  {
    q: "What happens to the data I send?",
    a: "It is used only to reply to you and to keep the lead on record. No newsletter, no ad targeting. Details in the privacy page.",
  },
];

export default function ContactPage() {
  return (
    <SiteShell header={<SiteHeader />} footer={<SiteFooter />}>
      <section className="site-contact-head site-wrap">
        <div className="site-kicker site-note">
          <nav aria-label="Breadcrumb">
            <Link href="/" className="site-link">
              Home
            </Link>{" "}
            /{" "}
            <span className="text-ink" aria-current="page">
              Contact
            </span>
          </nav>
          <span>[Contact / 04]</span>
        </div>

        <h1 className="site-contact-title">
          <span className="site-display">Let&apos;s talk.</span>
          <br />
          <span className="site-contact-title__lead site-lead-type">
            A brief, a call or a plain email. I reply within 3 business days.
          </span>
        </h1>

        <dl className="site-facts site-contact-facts">
          <div>
            <dt className="site-note">Email</dt>
            <dd>
              <a href={`mailto:${email}`} className="site-link">
                {email}
              </a>
            </dd>
          </div>
          <div>
            <dt className="site-note">Reply</dt>
            <dd>3 business days</dd>
          </div>
          <div>
            <dt className="site-note">Local time</dt>
            <dd>Maracay · UTC−4</dd>
          </div>
          <div>
            <dt className="site-note">Status</dt>
            <dd>
              <span className="site-dot" aria-hidden="true" /> Open to remote
              work
            </dd>
          </div>
        </dl>

        <div className="site-contact-actions">
          <a href="#the-brief" className="site-btn">
            Write a brief <span aria-hidden="true">↓</span>
          </a>
          <SiteButton href={cal} variant="ghost" arrow>
            Book a 30-min call
          </SiteButton>
        </div>
      </section>

      <section
        id="the-brief"
        className="site-wrap site-contact-section"
        aria-labelledby="brief-title"
      >
        <div className="site-contact-section__label">
          <p className="site-note">
            <span className="site-case-section__index">01</span> The brief
          </p>
          <p className="site-note text-ink-muted">≈ 2 min · 6 fields</p>
        </div>
        <div className="site-contact-section__body">
          <h2 id="brief-title" className="site-h2">
            Tell me what you&apos;re building. I&apos;ll tell you what it takes.
          </h2>
          <ContactForm />
        </div>
      </section>

      <section
        className="site-wrap site-contact-section"
        aria-labelledby="call-title"
      >
        <div className="site-contact-section__label">
          <p className="site-note">
            <span className="site-case-section__index">02</span> Prefer to talk?
          </p>
          <p className="site-note text-ink-muted">Video call · 30 min</p>
        </div>
        <div className="site-contact-section__body">
          <h2 id="call-title" className="site-h2">
            Thirty minutes. No slides.
          </h2>
          <p>
            Bring the brief, or just the problem. By the end of the call
            you&apos;ll know whether I&apos;m the right person for it, and when
            I could start.
          </p>
          <ul className="site-contact-call">
            <li>
              Your brief, the constraints and the date that can&apos;t move
            </li>
            <li>
              Whether I&apos;m the right fit, and who to call if I&apos;m not
            </li>
            <li>Next steps: scope, timing, NDA if you need one</li>
          </ul>
          <SiteButton href={cal} arrow>
            Pick a slot
          </SiteButton>
        </div>
      </section>

      <section
        className="site-wrap site-contact-section"
        aria-labelledby="next-title"
      >
        <div className="site-contact-section__label">
          <p className="site-note">
            <span className="site-case-section__index">03</span> What happens
            next
          </p>
          <p className="site-note text-ink-muted">{steps.length} steps</p>
        </div>
        <div className="site-contact-section__body">
          <h2 id="next-title" className="site-h2">
            From brief to first commit.
          </h2>
          <dl className="site-steps">
            {steps.map((step) => (
              <div key={step.num}>
                <dt className="site-note">
                  <span className="site-case-section__index">{step.num}</span>{" "}
                  {step.when}
                </dt>
                <dd>
                  <p className="site-h3">{step.title}</p>
                  <p>{step.body}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section
        className="site-wrap site-contact-section"
        aria-labelledby="elsewhere-title"
      >
        <div className="site-contact-section__label">
          <p className="site-note">
            <span className="site-case-section__index">04</span> Elsewhere
          </p>
          <p className="site-note text-ink-muted">
            {elsewhere.length} channels
          </p>
        </div>
        <div className="site-contact-section__body">
          <h2 id="elsewhere-title" className="site-h2">
            Other ways in.
          </h2>
          <ul className="site-channels" role="list">
            {elsewhere.map((channel) => (
              <li key={channel.label}>
                <a
                  href={channel.href}
                  className="site-link"
                  target={channel.external ? "_blank" : undefined}
                  rel={channel.external ? "noopener noreferrer" : undefined}
                >
                  <span className="site-note">{channel.label}</span>
                  <span className="site-channels__value">
                    {channel.value}
                    <span aria-hidden="true">
                      {channel.external ? " ↗" : " →"}
                    </span>
                  </span>
                  <span className="site-channels__note">{channel.note}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        className="site-wrap site-contact-section"
        aria-labelledby="before-title"
      >
        <div className="site-contact-section__label">
          <p className="site-note">
            <span className="site-case-section__index">05</span> Before you
            write
          </p>
        </div>
        <div className="site-contact-section__body">
          <h2 id="before-title" className="site-h2">
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
        <p className="site-note">Got a brief that needs to move?</p>
        <h2 className="site-h2">Let&apos;s talk.</h2>
        <SiteButton href={contactAction.href} arrow>
          Send a brief
        </SiteButton>
      </section>
    </SiteShell>
  );
}
