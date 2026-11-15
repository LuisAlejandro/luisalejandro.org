import type { Metadata } from "next";

import { config } from "@constants/constants";

import { CaseStudyGlance } from "@components/common/Site/CaseStudyGlance";
import { CaseStudyHead } from "@components/common/Site/CaseStudyHead";
import { CaseStudySection } from "@components/common/Site/CaseStudySection";
import { CaseStudyStats } from "@components/common/Site/CaseStudyStats";
import { PageEnd } from "@components/common/Site/PageEnd";
import { SiteFooter } from "@components/common/Site/SiteFooter";
import { SiteHeader } from "@components/common/Site/SiteHeader";
import { SiteShell } from "@components/common/Site/SiteShell";

const title = "Whol Master case study | Luis Alejandro";
const description =
  "Whol Master is offline-first gym management software: desktop app, embedded database and biometric entrance control, in daily use at a gym for over a year.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "Whol Master",
    "gym management software",
    "offline first",
    "Electron",
    "Go",
    "SvelteKit",
    "SQLite",
    "biometric entrance",
    "fingerprint reader",
    "desktop application",
    "case study",
    "Luis Alejandro",
  ],
  alternates: {
    canonical: `${config.url}/case-studies/wholmaster`,
    types: {
      "text/markdown": [
        { url: "/case-studies/wholmaster.md", title: "Markdown twin" },
      ],
    },
  },
  openGraph: {
    title,
    description,
    url: `${config.url}/case-studies/wholmaster`,
    type: "article",
    images: [
      {
        url: `${config.url}/images/banner.png`,
        width: 1024,
        height: 576,
        alt: "Whol Master case study",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [`${config.url}/images/banner.png`],
  },
};

export default function WholmasterPage() {
  return (
    <SiteShell header={<SiteHeader />} footer={<SiteFooter />}>
      <CaseStudyHead
        year={2025}
        subtitle="Whol Master"
        title="Gym software that never phones home"
        description="Whol Master is a gym management platform that runs on the front desk's own computer: members, subscriptions, payments, shop sales, reports and biometric entrance control, with an embedded database instead of a cloud account. One gym in Maracay has been running it for over a year."
        team={["Luis Alejandro Martínez"]}
        deliverables={[
          "Electron desktop app",
          "Go REST API",
          "Admin UI in 5 languages",
          "Biometric entrance service",
        ]}
        links={[{ text: "Website", url: "https://wholmaster.com" }]}
      />

      <CaseStudySection index="01" label="Problem">
        <CaseStudyGlance
          items={[
            { value: "14 months", label: "in daily use at a real gym" },
            { value: "1.2K", label: "commits from the first line to today" },
            { value: "5", label: "languages for front desk staff" },
            { value: "4", label: "fingerprint readers validated" },
          ]}
        />
        <p>
          A gym was running its entire operation on a program written years
          earlier by <b>one person</b> who then disappeared. No updates, no
          support, nobody to ask when the thing that records payments breaks.
          The staff had adapted to it, but every month on that program was a
          month where a failure would have no fix.
        </p>
        <p>
          The obvious answer, a cloud gym platform, is the wrong one for a lot
          of gyms. Those products bill monthly, meter members and stop working
          when the connection, the card or the vendor does. A front desk with a
          queue in front of it cannot depend on someone else&apos;s server. So
          the brief was simple to say and hard to build: software the gym{" "}
          <b>owns</b>, running <b>offline</b>, covering the same work the old
          program did, and surviving upgrades without losing a year of payment
          history.
        </p>
      </CaseStudySection>

      <CaseStudySection index="02" label="Challenge">
        <p>
          Offline-first changes the whole architecture. There is no server to
          hide behind and no tenant to isolate: the database is a single{" "}
          <b>SQLite file</b> on the machine that runs the front desk, so it has
          to be backed up, migrated and recovered as such. Schema changes ship
          inside the API binary and apply on startup, on a computer where nobody
          will ever type a command. A failed migration cannot leave a gym
          staring at an unusable machine, so every app update checkpoints the
          write-ahead log and copies the database aside before installing.
        </p>
        <p>
          The entrance is the second hard part. <b>Fingerprint readers</b> come
          from vendors that each expose a different low-level driver, so the
          readers sit behind one C++ interface service that the rest of the app
          talks to over HTTP. A HID numpad bridge lets a scanner drive member
          lookup, and face recognition runs from the gym&apos;s own camera.
          Manual search by name or member ID always remains, because hardware
          fails and a queue does not wait.
        </p>
        <p>
          Licensing had to work with no online check on every keystroke: keys
          that never expire, a short lease bound to the machine fingerprint,
          both <b>signed with Ed25519</b> and verified against a public key
          compiled into the backend. Nothing a user can edit grants entitlement,
          and an expired lease drops the install to evaluation instead of
          locking the gym out of its own records. Seven days of slack mean a
          week-long outage is invisible.
        </p>
        <p>
          Around that sits the unglamorous part: an Electron app distributed for
          Windows, macOS and Linux with auto-update, an admin interface in{" "}
          <b>five languages</b> for staff who are not technical, PDF and CSV
          reports the accountant accepts, and a shop point of sale that shares
          the same database as the memberships.
        </p>
      </CaseStudySection>

      <CaseStudySection index="03" label="Product">
        <p>
          Whol Master is one desktop application made of cooperating processes:
          an <b>Electron</b> shell that boots a <b>Go REST API</b>, a{" "}
          <b>SvelteKit</b> admin interface served from the same install, and
          optional hardware services for the fingerprint interface and the
          numpad bridge. Data lives in embedded SQLite, so a backup is a file
          copy.
        </p>
        <p>
          The modules cover the whole front desk: members and their documents,
          subscriptions and billing cycles, packages and services, payments with
          a quick renew action, a shop point of sale with stock, analytics with
          revenue, churn and cohort views, entrance logging with biometric
          matching, WhatsApp campaigns for birthdays and expiry reminders, and
          the reports exported to CSV and PDF. Optional Stripe autopay collects
          recurring dues into the gym&apos;s own Stripe account without Whol
          Master ever holding member money.
        </p>
        <p>
          A first-run onboarding wizard walks a new gym through its basic data,
          branded colours, admin user, cycles, services and packages, so an
          install ends in a usable system rather than an empty database. The
          user manual is generated from the same codebase and ships inside the
          app, in Spanish and English, because the person installing this is a
          gym owner, not an IT department.
        </p>
      </CaseStudySection>

      <CaseStudySection index="04" label="Results">
        <p>
          <b>Bahia&apos;s Gym</b>, in Maracay, Venezuela, has been running Whol
          Master for more than a year. The abandoned program is gone, the
          payment history came across, and the front desk works when the
          internet does not. That is the result I care about most: a small
          business replaced software nobody could fix with software it owns.
        </p>
        <CaseStudyStats
          items={[
            { value: "14", lines: ["months in daily", "use at one gym"] },
            {
              value: "4",
              lines: ["fingerprint readers", "validated on hardware"],
            },
          ]}
        />
        <p>
          Every differentiator in the product has been exercised on real
          hardware and real data rather than demonstrated in a mock: four
          fingerprint readers paired and identified members, face recognition
          ran from a camera, the numpad bridge looked members up from a scanner,
          and the entrance log filled up one member at a time. The platform
          itself is around <b>1,200 commits</b> and fourteen releases over
          sixteen months, built end to end by one person: backend, admin UI,
          desktop shell, hardware services, licensing, manuals and release
          engineering.
        </p>
        <p>
          The next step is the part that is not written in code: opening the
          platform to more gyms and repeating this with customers who are not
          the first one.
        </p>
      </CaseStudySection>

      <PageEnd
        num="05"
        note="30 minutes"
        lines={["A problem", "like this one?"]}
        primary={{ label: "Let's talk", href: "/contact" }}
        secondary={{ label: "More work", href: "/portfolio" }}
      />
    </SiteShell>
  );
}
