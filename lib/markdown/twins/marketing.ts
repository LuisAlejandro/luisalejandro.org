import { canonicalHostnameUrl } from "@constants/constants";
import { getAllCategories, getPublishedPostsForHomeTwin } from "@lib/api";
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
  return formatTwin("Home", `${canonicalHostnameUrl}/`, readSection("home.md"));
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
  const categories = (await getAllCategories()) || [];
  const lines = categories.map(
    (category: { title?: string; slug?: string }) => {
      const title = category.title || category.slug || "Category";
      const slug = category.slug || "";
      const url = `${canonicalHostnameUrl}/blog/category/${slug}`;
      return `- [${title}](${url})`;
    }
  );
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
