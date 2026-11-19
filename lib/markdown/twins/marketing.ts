import {
  canonicalHostnameUrl,
  experience,
  ProjectList,
  RecentProjectList,
} from "@constants/constants";
import { getBlogArchive, getPublishedPostsForHomeTwin } from "@lib/api";
import { expandTwinTokens } from "@lib/markdown/expandTwinTokens";
import { formatTwin } from "@lib/markdown/formatTwin";
import { readSection } from "@lib/markdown/readSection";
import markdownToHtml from "@lib/markdownToHtml";
import { stripHtmlToPlainText } from "@lib/plainText";
import { portfolioProjects } from "@lib/portfolio";

import type { LlmsFullPost } from "@lib/llms/buildLlmsFull";

async function formatBlogListing(posts: LlmsFullPost[]): Promise<string> {
  const lines = await Promise.all(
    posts.map(async (post) => {
      const url = `${canonicalHostnameUrl}/blog/posts/${post.slug}`;
      const rawTeaser = post.metadata?.teaser || "";
      const teaserHtml = rawTeaser.startsWith("<")
        ? rawTeaser
        : await markdownToHtml(rawTeaser);
      const teaser = stripHtmlToPlainText(teaserHtml).trim();
      let date = "";
      if (post.created_at) {
        const parsed = new Date(post.created_at);
        if (!Number.isNaN(parsed.getTime())) {
          date = parsed.toISOString().split("T")[0];
        }
      }
      const heading = `### [${post.title}](${url})${date ? ` — ${date}` : ""}`;
      return teaser ? `${heading}\n\n${teaser}` : heading;
    })
  );
  return lines.join("\n\n") || "_No posts available._";
}

export async function buildHomeTwin(): Promise<string> {
  return formatTwin(
    "Home",
    `${canonicalHostnameUrl}/`,
    expandTwinTokens(readSection("home.md"), { experience })
  );
}

export async function buildPortfolioTwin(): Promise<string> {
  const studies = [...RecentProjectList, ...ProjectList]
    .map(
      (study) =>
        `### [${study.title}](${canonicalHostnameUrl}${study.visit})\n\n${study.description}\n\nTechnologies: ${study.tags.join(", ")}`
    )
    .join("\n\n");
  // Each project lives as a row on the portfolio, so its twin entry carries
  // the whole project rather than a link to a page of its own.
  const archive = portfolioProjects
    .map((project) => {
      const sources = project.sources
        .map(
          (source) =>
            `- [${source.name}${source.url.includes("web.archive.org") ? " (archived)" : ""}](${source.url})`
        )
        .join("\n");
      return `### [${project.name}](${canonicalHostnameUrl}/portfolio#${project.slug}) — ${project.year}\n\n${project.shortDescription}\n\n${stripHtmlToPlainText(project.description)}\n\nTechnologies: ${project.tags.join(", ")}${sources ? `\n\n${sources}` : ""}`;
    })
    .join("\n\n");
  const body = `## Case studies\n\n${studies}\n\n## Project archive\n\n${archive}`;
  return formatTwin(
    "Project Archive",
    `${canonicalHostnameUrl}/portfolio`,
    body
  );
}

export async function buildAboutTwin(): Promise<string> {
  // Derived from the same facts the page renders, so the twin cannot drift.
  const body = [
    "## Positioning",
    "",
    `Senior full-stack engineer in Venezuela, ${experience} years shipping production web apps, now building AI products at Shokworks. Based in Maracay; remote by contract.`,
    "",
    "## Changelog",
    "",
    "- v0.1 · 2009 — Canaima GNU/Linux: Debian packaging, ISO builds and infrastructure for a Venezuelan government distribution.",
    "- v1.0 · 2018 — Leadbox, Canada: a courier-broker-worker build queue for more than a hundred dealership sites.",
    "- v2.0 · 2019 — Guayoyo, Uruguay: vulnerability modules on a CVE, CPE and CWE index; enterprise sales and a 66% memory cut.",
    "- v3.0 · 2020 — Collage Labs, still running: custom web apps in React, Next.js, and Node or Django.",
    "- v4.0 · 2020 — Soleit, Chile: SoleTech 2.0, a React and Electron desktop app that reached 150+ clinics and 1,000+ diagnoses.",
    "- v5.0 · 2022 — Wheel The World: Expedia inventory from 2,000 to 600,000+ properties (+39% Q1 2023 sales); deploys from 40 to 10 minutes, tests from 20 to 5, images from 1.5GB to 200MB.",
    "- v6.0 · 2023 — C3 Canada, August 2023 to February 2026, alongside Shokworks: zero-downtime migration of 28GB of CRM data spanning 20 years; 55% more new accounts, including Rogers Communications.",
    "- v7.0 · now — Shokworks, since January 2023: LOSA aviation safety analytics (Next.js 15, FastAPI, LangChain, LangGraph, DAX) and Andromeda 360, a multi-tenant AI SaaS on AWS EKS.",
    "",
    "## Elsewhere",
    "",
    `- [Call](https://cal.com/martinezfaneyth) — 30 minutes.`,
    `- [Contact](${canonicalHostnameUrl}/contact) — send a brief.`,
  ].join("\n");
  return formatTwin("About", `${canonicalHostnameUrl}/about`, body);
}

export async function buildPrivacyTwin(): Promise<string> {
  const body = [
    "## The contact form",
    "",
    "A brief keeps your name, email, company if given, needs, timeline, NDA preference and the brief text. Used only to reply and to keep the lead on record. Sent through Amazon SES; submissions pass through Google reCAPTCHA.",
    "",
    "## Analytics and cookies",
    "",
    "Analytics runs only after accepting the cookie prompt and only when a measurement key is configured. One cookie remembers that acceptance. No advertising network, no ad slot, no cross-site advertising pixel.",
    "",
    "## Your data",
    "",
    "Write to luis@luisalejandro.org for a copy or deletion; requests are answered within 30 days.",
  ].join("\n");
  return formatTwin("Privacy", `${canonicalHostnameUrl}/privacy`, body);
}

export async function buildContactTwin(): Promise<string> {
  return formatTwin(
    "Contact",
    `${canonicalHostnameUrl}/contact`,
    readSection("contact.md")
  );
}

export async function buildBlogIndexTwin(): Promise<string> {
  const posts = (await getPublishedPostsForHomeTwin()) || [];
  const body = await formatBlogListing(posts);
  return formatTwin("Blog Index", `${canonicalHostnameUrl}/blog`, body);
}

export async function buildBlogCategoryIndexTwin(): Promise<string> {
  // Same source as the HTML: only topics with published posts have pages.
  const { archive } = await getBlogArchive();
  const lines = archive.topics.map((topic) => {
    const url = `${canonicalHostnameUrl}/blog/category/${topic.slug}`;
    return `- [${topic.title}](${url}) — ${topic.count} ${
      topic.count === 1 ? "entry" : "entries"
    }`;
  });
  const body =
    lines.length > 0
      ? `## Categories\n\n${lines.join("\n")}`
      : "_No categories available._";
  return formatTwin(
    "Blog Categories",
    `${canonicalHostnameUrl}/blog/category`,
    body
  );
}
