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

const title = "The Writing Council case study | Luis Alejandro";
const description =
  "A writing system that turns a one-line premise into a published, sourced article: specialized agents for research, drafting, fact-grounding and a de-AI editing pass, then CMS publishing and a social queue.";

const previewCard = preview({
  ...SOCIAL_CARD,
  alt: "The Writing Council case study",
});

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "multi-agent writing",
    "editorial pipeline",
    "AI content generation",
    "fact grounding",
    "humanizer",
    "SEO",
    "Cosmic CMS",
    "TypeScript",
    "case study",
    "Luis Alejandro",
  ],
  alternates: {
    canonical: `${config.url}/case-studies/blog-system`,
    types: {
      "text/markdown": [
        { url: "/case-studies/blog-system.md", title: "Markdown twin" },
      ],
    },
  },
  openGraph: {
    title,
    description,
    url: `${config.url}/case-studies/blog-system`,
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

const links = [{ text: "Blog", url: "https://luisalejandro.org/blog" }];

export default function BlogSystemPage() {
  return (
    <SiteShell header={<SiteHeader />} footer={<SiteFooter />}>
      <CaseStudyHead
        year={2025}
        subtitle="The Writing Council"
        title="Nine agents, one signature"
        description="A writing system that turns a one-line premise into a published, sourced article: specialized agents for research, drafting, fact-grounding and a de-AI editing pass, then CMS publishing and a social queue. Every post still ships under one human byline."
        team={["Luis Alejandro Martínez"]}
        deliverables={[
          "Multi-agent drafting pipeline",
          "Claim verification",
          "De-AI editing pass",
          "CMS publishing",
          "Social scheduling",
        ]}
        links={links}
      />

      <CaseStudySection index="01" label="Problem">
        <CaseStudyGlance
          items={[
            { value: "9", label: "agents in the generation pipeline" },
            { value: "4", label: "post types, each with its own writer" },
            { value: "3", label: "freshness modes by post type" },
            { value: "6", label: "social platforms in the queue" },
          ]}
        />
        <p>
          Writing regularly is a second job on top of the first one. Research,
          drafting, sourcing, images, meta descriptions, publishing and then the
          social queue are seven separate chores, and the last four are the ones
          that quietly stop happening.
        </p>
        <p>
          The obvious answer is to hand the whole thing to a model, and that is
          exactly how a blog loses its credibility. Generated posts invent
          prices, model names and product states that were never true; they
          carry the rhythm of a machine; and a reader who notices once stops
          trusting the byline. I wanted the volume without the <b>slop</b>, and
          the byline is mine.
        </p>
      </CaseStudySection>

      <CaseStudySection index="02" label="Challenge">
        <p>
          Facts go stale on a schedule. Prices change, models get superseded,
          products ship or die, and a paragraph that was right in June is wrong
          in August. So the pipeline cannot only ask a model to write well; it
          has to fetch the current state of the world first and then hold the
          writer to it. A separate research step produces a pack of claims with
          source URLs, and the body gets checked against that pack before it is
          allowed to publish, with a small, explicit list of things the writer
          is forbidden to invent.
        </p>
        <p>
          The second problem is voice. Models default to a register that reads
          as generated regardless of the language: the tricolon, the rhetorical
          question, the summary paragraph nobody needed. The fix is a dedicated
          editing pass, but that pass is dangerous: an editor that can add a
          sentence can add a claim. So the pass is constrained. It may not add
          or drop a claim, and its output is thrown away and the original kept
          if it touches a media placeholder, unbalances a code fence, or shrinks
          the post below sixty percent of its length. When a voice profile is
          set, the profile wins, so a writer who uses em dashes keeps them.
        </p>
        <p>
          The last constraint is cost and time. Nine agents is nine chances to
          spend tokens on work nobody reads, so each post type only runs the
          agents that earn their place, and freshness research runs only where
          facts are load-bearing.
        </p>
      </CaseStudySection>

      <CaseStudySection index="03" label="Product">
        <p>
          Everything starts as a markdown file with YAML frontmatter: a premise,
          a post type, a target audience, keywords, links and any media I want
          placed. The post type picks the writer. General posts get the SEO
          specialist, technical posts get the engineer, narrative posts get the
          storyteller, product reviews get the reviewer, and market analysis
          gets the data analyst. The same field picks the freshness mode:{" "}
          <b>research</b> for general and technical, which fetches the input
          links and the analysis sources and writes a claim pack that the writer
          must respect; <b>links only</b> for reviews; <b>off</b> for narrative.
        </p>
        <p>
          After the draft comes the editing pass, which strips the tells of
          machine writing under the constraints above and cites Wikipedia&apos;s
          catalogue of those tells as its rulebook. Then the pipeline generates
          a hero image and any inline illustrations, and replaces the{" "}
          <b>media placeholders</b> with real components: YouTube, SoundCloud,
          galleries, SVG diagrams, PDFs, placed where the text actually calls
          for them rather than in a block at the end.
        </p>
        <p>
          Publishing is the part that has to be boring. Posts go to the CMS with
          their hero image uploaded to the CDN, their categories created if
          missing, and their draft or published state tracked so a re-run
          updates instead of duplicating. From there the same content feeds a
          social queue that schedules the post across six platforms for the
          week. The whole thing is TypeScript run through the project&apos;s
          Make targets, so a post is four commands: create the template,
          generate, upload as draft, publish.
        </p>
      </CaseStudySection>

      <CaseStudySection index="04" label="Results">
        <p>
          The pipeline is what the blog runs on. Each post below was a premise
          and a set of links before it became a page with images, sources and a
          social queue behind it, and I still read every one before it publishes
          because the byline is mine.
        </p>
        <CaseStudyStats
          items={[
            { value: "100×", lines: ["monthly search", "impressions"] },
            { value: "20 min", lines: ["from premise", "to published post"] },
            { value: "33", lines: ["posts published", "through the pipeline"] },
          ]}
        />
        <p>
          A post takes about <b>twenty minutes</b> from premise to page when I
          publish it straight away; scheduled posts wait for their slot. Each
          one is grounded in a claim pack fetched that day rather than in
          whatever the model remembered. That is the part worth having: the
          volume is automated and the <b>checking is not</b>.
        </p>
        <p>
          Search is where it shows. In July 2025, the month the pipeline
          started, the blog&apos;s posts drew <b>17 impressions</b> on Google;
          in September 2026 they drew <b>1,708</b> and <b>40 clicks</b>, and
          October held at 1,478 impressions. Clicks are still small, and that is
          the honest next step: letting search data pick the topics the pipeline
          chases, so readers who see a post also open it.
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
