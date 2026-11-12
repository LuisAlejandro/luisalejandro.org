import { canonicalHostnameUrl, experience } from "@constants/constants";
import { getBlogArchive, getPublishedPostsForHomeTwin } from "@lib/api";
import { expandTwinTokens } from "@lib/markdown/expandTwinTokens";
import { formatTwin } from "@lib/markdown/formatTwin";
import { readSection } from "@lib/markdown/readSection";
import markdownToHtml from "@lib/markdownToHtml";
import { stripHtmlToPlainText } from "@lib/plainText";

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
  return formatTwin(
    "Portfolio",
    `${canonicalHostnameUrl}/portfolio`,
    readSection("portfolio.md")
  );
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
