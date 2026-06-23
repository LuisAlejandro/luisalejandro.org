import { canonicalHostnameUrl } from "@constants/constants";
import { readSection } from "@lib/markdown/readSection";
import markdownToHtml from "@lib/markdownToHtml";
import { stripHtmlToPlainText } from "@lib/plainText";

export type LlmsFullPost = {
  slug: string;
  title: string;
  created_at?: string;
  metadata?: { teaser?: string };
};

function formatSection(title: string, url: string, body: string): string {
  return `# ${title}\n\nCanonical URL: ${url}\n\n${body}`;
}

async function formatBlogSection(posts: LlmsFullPost[]): Promise<string> {
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

  return formatSection(
    "Blog Index",
    `${canonicalHostnameUrl}/blog`,
    lines.join("\n\n") || "_No posts available._"
  );
}

export async function buildLlmsFull(
  posts: LlmsFullPost[] = []
): Promise<string> {
  const sections = [
    formatSection("Home", `${canonicalHostnameUrl}/`, readSection("home.md")),
    formatSection(
      "Portfolio",
      `${canonicalHostnameUrl}/portfolio`,
      readSection("portfolio.md")
    ),
    await formatBlogSection(posts),
    formatSection(
      "Contact",
      `${canonicalHostnameUrl}/contact`,
      readSection("contact.md")
    ),
  ];

  const generatedAt = new Date().toISOString();

  return `${sections.join("\n\n---\n\n")}\n\n---\n\n## Generated\n\nSnapshot generated at: ${generatedAt}\n`;
}
