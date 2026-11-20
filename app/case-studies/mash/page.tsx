import type { Metadata } from "next";

import { config } from "@constants/constants";

import { type PreviewImage, SOCIAL_CARD, pageMeta } from "@lib/metadata";
import { CaseStudyGlance } from "@components/common/Site/CaseStudyGlance";
import { CaseStudyHead } from "@components/common/Site/CaseStudyHead";
import { CaseStudySection } from "@components/common/Site/CaseStudySection";
import { CaseStudyStats } from "@components/common/Site/CaseStudyStats";
import { PageEnd } from "@components/common/Site/PageEnd";
import { SiteFooter } from "@components/common/Site/SiteFooter";
import { SiteHeader } from "@components/common/Site/SiteHeader";
import { SiteShell } from "@components/common/Site/SiteShell";

const title = "Mash case study | Luis Alejandro";
const description =
  "Mash is a desktop workspace for AI-assisted coding: a terminal, editor and coding agents in one app with every tool pinned. Built after Cursor blocked Venezuelan IPs.";

const previewCard: PreviewImage = { ...SOCIAL_CARD, alt: "Mash case study" };

export const metadata: Metadata = {
  ...pageMeta({
    title,
    description,
    path: "/case-studies/mash",
    image: previewCard,
    type: "article",
  }),
  keywords: [
    "Mash",
    "terminal workspace",
    "TUI",
    "AI-assisted coding",
    "Ghostty",
    "Herdr",
    "Pi",
    "Fresh editor",
    "open source IDE",
    "desktop app",
    "case study",
    "Luis Alejandro",
  ],
  alternates: {
    canonical: `${config.url}/case-studies/mash`,
    types: {
      "text/markdown": [
        { url: "/case-studies/mash.md", title: "Markdown twin" },
      ],
    },
  },
};

const links = [
  { text: "GitHub", url: "https://github.com/LuisAlejandro/mash" },
  { text: "Website", url: "https://letsma.sh" },
];

export default function MashPage() {
  return (
    <SiteShell header={<SiteHeader />} footer={<SiteFooter />}>
      <CaseStudyHead
        year={2026}
        subtitle="Mash"
        title="An IDE you can't be locked out of"
        description="Mash is a desktop workspace for AI-assisted coding. It brings a customized Ghostty terminal, Herdr workspaces, the Fresh editor and Pi into one app, with every external tool pinned, installed and configured. I built it because the editor I depended on stopped working in my country."
        team={["Luis Alejandro Martínez"]}
        deliverables={[
          "macOS and Linux app",
          "First-launch setup wizard",
          "Signed APT repository",
          "15-language UI",
        ]}
        links={links}
      />

      <CaseStudySection index="01" label="Problem">
        <CaseStudyGlance
          items={[
            {
              value: "10 years",
              label: "between the first try and the shipped app",
            },
            { value: "65", label: "components pinned in one manifest" },
            { value: "15", label: "languages in the app's own interface" },
            { value: "4", label: "release targets across macOS and Linux" },
          ]}
        />
        <p>
          Ten years ago I tried to rebuild the experience I liked from Sublime
          Text inside the terminal, using <b>Vim</b> and a pile of plugins.
          Everything could be approximated except <b>search</b>. The moment I
          needed to find something across a project the way a GUI editor does
          it, the illusion broke. I gave up and went back to a graphical editor
          for another decade.
        </p>
        <p>
          This year I was working in <b>Cursor</b> when it blocked Venezuelan IP
          addresses. I was not willing to route my work through a VPN to keep
          using a tool, so I cancelled my account and started looking for a
          replacement. The closest options were terminal workspaces built on top
          of someone else&apos;s stack, and I never adapted to them. The old
          idea had a reason to exist again: an IDE I could <b>own end to end</b>
          , in the terminal, where no vendor can decide that my country is out
          of scope.
        </p>
      </CaseStudySection>

      <CaseStudySection index="02" label="Challenge">
        <p>
          A terminal cannot pretend to be a GUI. Search, file browsing, editing
          and agent sessions are separate programs with separate ideas about
          keys, windows and state. The work is making them behave like{" "}
          <b>one application</b> without forking all of them: one terminal
          window, one set of tab and pane chords, one shared editor, one menu
          bar.
        </p>
        <p>
          The environment is the other half. Each external tool has to be pinned
          by version and checksum for four targets, staged inside the app, and
          started with variables that keep <b>~/.mash separate</b> from the
          user&apos;s own configuration, credentials and Pi sessions. That
          isolation cannot come from changing <b>HOME</b>, because the same
          tools are used outside Mash and their real homes must stay untouched.
          It has to be done with environment variables only, and the app has to
          seed a working setup on first launch without ever overwriting
          something the user edited.
        </p>
        <p>
          Then comes trust. A macOS app has to be signed and notarized on two
          architectures. Linux gets an Ubuntu package plus an{" "}
          <b>APT repository</b> that keeps verifying updates after installation.
          Users are expected to install this once and keep working, so releases
          have to be boring and reversible.
        </p>
      </CaseStudySection>

      <CaseStudySection index="03" label="Product">
        <p>
          Mash works by wrapping a set of excellent terminal programs instead of
          reimplementing them. The macOS app is a customized <b>Ghostty</b>{" "}
          build whose executable calls Mash&apos;s launcher: the launcher seeds{" "}
          <b>~/.mash</b>, exports the isolation variables and hands control to
          the terminal. Linux uses the packaged launcher for the same job, and
          both platforms open exactly one window, no matter how many workspaces
          are running inside.
        </p>
        <p>
          <b>Herdr</b> supplies the workspace model: tabs, panes, sessions and
          agents, plus a command menu bound to terminal chords. <b>Pi</b> runs
          inside panes as the coding agent, and <b>Fresh</b> is the editor
          shared by the whole workspace, reachable from a pane, from the command
          palette and from the agent itself. Tabs are named after the work they
          hold, and the ones waiting on you are marked. Because it is a TUI, the
          keyboard is the fast path, and the layout rewards learning a few
          chords instead of reaching for the mouse.
        </p>
        <p>
          A first-launch wizard asks for a language and configures the
          workspace. The interface itself is translated into <b>15 languages</b>
          ; the bundled tools and language servers keep their own English
          interfaces. Around 65 components, from the terminal fork to the Python
          runtime, are recorded in a single pin manifest with their source,
          version and SHA-256 hash, so a release is reproducible instead of
          hopeful. <b>Batteries are included</b>: skills, themes, plugins and a
          working editor/agent setup arrive with the app, so a new machine
          becomes a usable environment in one install.
        </p>
      </CaseStudySection>

      <CaseStudySection index="04" label="Results">
        <p>
          Mash&apos;s first public release shipped on 26 October 2026 and it is
          still measured in days, not months. I am not going to dress that up
          with download numbers that do not exist yet. What is real today: ten
          releases in three weeks, a launch announcement read{" "}
          <b>12,000 times</b>, and an app that became the environment I do all
          of my work in.
        </p>
        <CaseStudyStats
          items={[
            { value: "12K", lines: ["views on the", "launch announcement"] },
            {
              value: "2 days",
              lines: ["between releases,", "10 in three weeks"],
            },
          ]}
        />
        <p>
          The part I find worth telling is not the current version number. It is
          that a project I abandoned for <b>ten years</b> for a missing search
          experience ended up being finished by the arrival of the right
          terminal workspace, and by a vendor deciding my country was out of
          scope. The next milestone is adoption I can measure, and the feedback
          loop that comes with it.
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
