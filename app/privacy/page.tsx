import type { Metadata } from "next";
import { pageMeta } from "@lib/metadata";
import { config } from "@constants/constants";

import { DocSection } from "@components/common/Site/DocSection";
import { PageEnd } from "@components/common/Site/PageEnd";
import { PageHero } from "@components/common/Site/PageHero";
import { SiteFooter } from "@components/common/Site/SiteFooter";
import { SiteHeader } from "@components/common/Site/SiteHeader";
import { SiteShell } from "@components/common/Site/SiteShell";

export const metadata: Metadata = {
  ...pageMeta({
    title: "Privacy | Luis Alejandro",
    description:
      "What this site stores: a brief when you send one, and anonymous analytics if you accept cookies. No newsletter, no advertising, no data sold.",
    path: "/privacy",
  }),
  alternates: {
    canonical: `${config.url}/privacy`,
    types: {
      "text/markdown": [{ url: "/privacy.md", title: "Markdown twin" }],
    },
  },
  robots: { index: true, follow: true },
};

const email = "luis@luisalejandro.org";

const sections = [
  {
    id: "brief",
    num: "01",
    title: "The contact form",
    body: [
      "When you send a brief, this site keeps your name, email, company if you gave one, what you said you need, your timeline, whether you asked for an NDA, and the brief itself.",
      "It is used to reply to you and to keep the lead on record. Nothing else. It is not added to a marketing list, it is not sold, and it is not used to profile you.",
      "The email is sent through Amazon SES. Submissions also pass through reCAPTCHA, which is operated by Google under its own privacy terms.",
    ],
  },
  {
    id: "analytics",
    num: "02",
    title: "Analytics",
    body: [
      "Analytics only runs after you accept the cookie prompt, and only when the site is configured with a measurement key. It records page views, not form contents.",
      "There is no advertising network on this site, no ad slot, and no cross-site tracking pixel for advertising purposes.",
    ],
  },
  {
    id: "cookies",
    num: "03",
    title: "Cookies",
    body: [
      "One cookie remembers that you accepted the banner, so it does not ask again. Analytics cookies appear only after that acceptance.",
      "You can clear them at any time in your browser; the banner will ask once more.",
    ],
  },
  {
    id: "rights",
    num: "04",
    title: "Your data, your call",
    body: [
      `Ask for a copy of what was kept about you, or ask for it to be deleted, by writing to ${email}. Requests are answered within 30 days.`,
      "This site does not knowingly collect data from children, and does not run any automated decision-making about you.",
    ],
  },
  {
    id: "changes",
    num: "05",
    title: "Changes",
    body: [
      "If this page changes materially, the revision line at the bottom changes with it. The page is intentionally short: there is very little to disclose.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <SiteShell header={<SiteHeader />} footer={<SiteFooter />}>
      <PageHero
        trail={[{ label: "Privacy" }]}
        index="[Privacy / 05]"
        lead="Privacy."
        typed="A brief, and nothing else. What this site keeps, and why."
        still
      />

      {sections.map((section) => (
        <DocSection key={section.id} num={section.num} label={section.title}>
          {section.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </DocSection>
      ))}

      <PageEnd
        num="06"
        note="Revision · as deployed"
        lines={["Questions about", "your data?"]}
        primary={{ label: "Write to me", href: `mailto:${email}` }}
        secondary={{ label: "Send a brief", href: "/contact" }}
      />
    </SiteShell>
  );
}
