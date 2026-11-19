import type { Metadata } from "next";

import { config } from "@constants/constants";

import { SOCIAL_CARD, preview } from "@lib/metadata";
import { CaseStudyGlance } from "@components/common/Site/CaseStudyGlance";
import { CaseStudyHead } from "@components/common/Site/CaseStudyHead";
import { CaseStudySection } from "@components/common/Site/CaseStudySection";
import { CaseStudyStats } from "@components/common/Site/CaseStudyStats";
import { PageEnd } from "@components/common/Site/PageEnd";
import { SiteFooter } from "@components/common/Site/SiteFooter";
import { SiteHeader } from "@components/common/Site/SiteHeader";
import { SiteShell } from "@components/common/Site/SiteShell";

const title = "Shoky Enterprise Harness case study | Luis Alejandro";
const description =
  "Shoky is a reusable meta-workspace for multi-repo AI-first teams: agent workflow skills, per-repo memory and a generated container stack, used by ~25 engineers.";

const previewCard = preview({
  ...SOCIAL_CARD,
  alt: "Shoky Enterprise Harness case study",
});

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "Shoky Enterprise Harness",
    "agentic workspace",
    "AI-first teams",
    "multi-repo",
    "Memory Bank",
    "Sentrux",
    "Cursor rules",
    "developer workflow",
    "Docker",
    "case study",
    "Luis Alejandro",
  ],
  alternates: {
    canonical: `${config.url}/case-studies/shoky`,
    types: {
      "text/markdown": [
        { url: "/case-studies/shoky.md", title: "Markdown twin" },
      ],
    },
  },
  openGraph: {
    title,
    description,
    url: `${config.url}/case-studies/shoky`,
    type: "article",
    images: previewCard.openGraph,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: previewCard.twitter,
  },
};

export default function ShokyPage() {
  return (
    <SiteShell header={<SiteHeader />} footer={<SiteFooter />}>
      <CaseStudyHead
        year={2026}
        subtitle="Shoky Enterprise Harness"
        title="One workspace for every project"
        description="Shoky is a reusable meta-workspace for small multi-repo projects: a forkable template that brings the agent workflow, per-repo memory and a local container stack with it. Around 25 engineers use it across five client projects."
        team={["Luis Alejandro Martínez"]}
        deliverables={[
          "Forkable workspace template",
          "Agent workflow skills",
          "Memory Bank contract",
          "Docker stack scaffolding",
        ]}
        links={[]}
      />

      <CaseStudySection index="01" label="Problem">
        <CaseStudyGlance
          items={[
            { value: "~25", label: "engineers working from forks" },
            { value: "5", label: "client projects using it" },
            {
              value: "1 week",
              label: "from induction to a first useful change",
            },
            { value: "3", label: "hosts: macOS, Linux and WSL2" },
          ]}
        />
        <p>
          The teams faced two phases of the same problem. First, they were not
          using AI at all. Then, once they started, each developer used their
          own personal account and their own habits, so every project began with
          a different setup and nobody could say what a good one looked like.
          Rules were copied from repo to repo, there was no shared memory
          between sessions, and there was no agreed path from an idea to a
          merged pull request.
        </p>
        <p>
          The projects make this worse. They are <b>small multi-repo systems</b>
          , typically two or three sibling services on GitHub Enterprise, where
          one change spans a backend, a frontend and the contract between them.
          A single-repository assistant setup does not fit that shape: it loses
          the other repos, it forgets what the last session learned, and it
          cannot open one pull request per repo with a coherent story.
        </p>
        <p>
          Onboarding was the visible cost. A new engineer joined, was told the
          project has an AI workflow, and then spent their first week
          rediscovering the setup instead of shipping.
        </p>
      </CaseStudySection>

      <CaseStudySection index="02" label="Challenge">
        <p>
          The deliverable is a{" "}
          <b>template, so everything has to survive a fork</b>. That rules out a
          platform team, a hosted service or an internal tool that needs
          maintenance: the answer has to be files and bash scripts inside the
          repo, readable and editable by whoever inherits the project.
        </p>
        <p>
          It also has to run on three hosts. macOS and Linux are
          straightforward; Windows is supported only through <b>WSL2</b>,
          because bind mounts and file watching on a Windows path break the
          container stack and there is no native PowerShell port of the scripts.
          The clone has to live inside the Linux filesystem, and the
          documentation has to say so before an engineer discovers it by losing
          an afternoon.
        </p>
        <p>
          Memory was the subtle one. Agents need durable knowledge per
          repository, but the meta-repo that coordinates them is not itself a
          project, so its memory has no target. Memory Bank files are generated
          from git history and then curated, which means the pipeline has to
          distinguish ingestion from curation and never let the
          coordinator&apos;s own notes leak into a client repository.
        </p>
        <p>
          Finally, the workflow has to be opinionated enough to be repeatable
          and honest enough to be useful: design, PRD, plan with a topology
          baseline, implementation, code review plus a minimalism review, then
          multi-repo pull requests. Every step needs a skill an agent will
          actually follow, and every skill needs the same shared contract for
          topology and for memory.
        </p>
      </CaseStudySection>

      <CaseStudySection index="03" label="Product">
        <p>
          Shoky is one repository you fork per project. Two files describe the
          project: <b>repos.list</b> holds the sibling repositories, and{" "}
          <b>project.env</b> the project name and any branch overrides. From
          there, <b>init-template.sh</b> writes the workspace file,{" "}
          <b>clone-repos.sh</b> puts the siblings under <b>packages/</b>, and a
          small set of scripts covers the daily loop: status, checkout, pull,
          and memory ingest.
        </p>
        <p>
          The workflow lives in agent skills: design a feature, write the PRD,
          plan the implementation with a topology baseline, execute it, review
          it with both a correctness and a minimalism reviewer, then open
          coordinated pull requests for every repo the change touches. Two more
          skills cover the parts teams always skip: onboarding a machine end to
          end, and scaffolding the local stack.
        </p>
        <p>
          <b>Memory Bank</b> keeps three files per clone (system patterns,
          technical context, progress), written from git history and curated
          down to what is still true. <b>Sentrux</b> supplies the structural
          view used in planning and QA, called through its MCP server so a scan
          never blocks a terminal. The container stack is generated, not
          hand-written: thin development Dockerfiles per repo, a compose file, a
          manifest and secrets examples, so a new project has a working local
          environment without a compose file being edited by hand. Nothing about
          a client&apos;s data, credentials or repository names lives in the
          template itself.
        </p>
      </CaseStudySection>

      <CaseStudySection index="04" label="Results">
        <p>
          Shoky is the standard workspace for the teams where I lead AI
          adoption. Around <b>25 engineers</b> work from forks of it, and it has
          been the starting point for <b>five client projects</b>. The engineers
          are not the only ones affected: the clients get a project whose
          conventions are written down from the first commit instead of living
          in one person&apos;s head.
        </p>
        <CaseStudyStats
          items={[
            { value: "~25", lines: ["engineers working", "from forks"] },
            {
              value: "1",
              lines: ["week from induction", "to a merged change"],
            },
          ]}
        />
        <p>
          The measurable result is onboarding: after the induction session, an
          engineer is landing a useful change on a repository they have never
          seen in about <b>one week</b>, on a project split across several
          services. Teams also report working faster and with fewer setup
          mistakes than when the same work was done by hand. I want to be
          careful with that claim: I have not instrumented it with a controlled
          study. What I can point at is the induction path shrinking, the setup
          questions disappearing from team chat, and the same conventions
          holding across five projects maintained by different people.
        </p>
        <p>
          The next step is making that evidence quantitative, and keeping the
          template honest as the models and the tools underneath it change.
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
