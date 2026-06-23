import { canonicalHostnameUrl } from "@constants/constants";
import { getPublishedPostForTwin } from "@lib/api";
import { formatTwin } from "@lib/markdown/formatTwin";
import markdownToHtml from "@lib/markdownToHtml";
import { stripHtmlToPlainText } from "@lib/plainText";

async function bodyFromContent(content: string): Promise<string> {
  if (!content.trim()) {
    return "";
  }
  if (!content.trimStart().startsWith("<")) {
    return content.trim();
  }
  const html = await markdownToHtml(content);
  return stripHtmlToPlainText(html).trim();
}

export async function buildBlogPostTwin(slug: string): Promise<string | null> {
  const post = await getPublishedPostForTwin(slug);
  if (!post) {
    return null;
  }
  const title = post.title || slug;
  const canonicalUrl = `${canonicalHostnameUrl}/blog/posts/${slug}`;
  const content = post.metadata?.content || "";
  const body = await bodyFromContent(content);
  const categories = post.metadata?.categories || [];
  const categoryLine =
    categories.length > 0
      ? `Categories: ${categories
          .map((c: { title?: string }) => c.title)
          .filter(Boolean)
          .join(", ")}\n\n`
      : "";
  let dateLine = "";
  if (post.created_at) {
    const parsed = new Date(post.created_at);
    if (!Number.isNaN(parsed.getTime())) {
      dateLine = `Published: ${parsed.toISOString().split("T")[0]}\n\n`;
    }
  }
  return formatTwin(title, canonicalUrl, `${dateLine}${categoryLine}${body}`);
}
