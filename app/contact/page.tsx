import type { Metadata } from "next";

import { config } from "@constants/constants";
import Link from "next/link";

import { ContactForm } from "@components/common/Site/ContactForm";
import { SiteFooter } from "@components/common/Site/SiteFooter";
import { SiteHeader } from "@components/common/Site/SiteHeader";
import { SiteShell } from "@components/common/Site/SiteShell";
import { siteSocialLinks } from "@constants/siteNavigation";

export const metadata: Metadata = {
  title: "Contact | Luis Alejandro",
  description:
    "Send a brief: what you are building, the stack, and the timeline. Remote full-stack and AI engineering work, worldwide.",
  alternates: {
    canonical: `${config.url}/contact`,
    types: {
      "text/markdown": [{ url: "/contact.md", title: "Markdown twin" }],
    },
  },
};

const linkedin = siteSocialLinks.find((link) => link.label === "LinkedIn");

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
          <span className="site-display">Tell me what</span>
          <br />
          <span className="site-display site-contact-title__outline">
            you&apos;re building.
          </span>
        </h1>

        <div className="site-contact-head__foot">
          <p className="site-lead-type">
            A sentence about the product, the stack you already have, and when
            you need it. I answer from Venezuela, in English or Spanish.
          </p>
          <dl className="site-contact-facts">
            <div>
              <dt className="site-note">Best briefs include</dt>
              <dd>What it does, who uses it, and what is already built.</dd>
            </div>
            <div>
              <dt className="site-note">Elsewhere</dt>
              <dd>
                <a href={`mailto:luis@luisalejandro.org`} className="site-link">
                  luis@luisalejandro.org
                </a>
                {linkedin && (
                  <>
                    {" · "}
                    <a
                      href={linkedin.href}
                      className="site-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      LinkedIn
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </>
                )}
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <section
        className="site-wrap site-contact-body"
        aria-label="Contact form"
      >
        <ContactForm />
      </section>
    </SiteShell>
  );
}
