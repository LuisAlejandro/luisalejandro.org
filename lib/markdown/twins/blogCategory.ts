import { canonicalHostnameUrl } from "@constants/constants";
import { getPublishedPostsForCategoryTwin } from "@lib/api";
import { formatTwin } from "@lib/markdown/formatTwin";
import markdownToHtml from "@lib/markdownToHtml";
import { stripHtmlToPlainText } from "@lib/plainText";

async function teaserFromPost(post: {
  metadata?: { teaser?: string };
}): Promise<string> {
  const rawTeaser = post.metadata?.teaser || "";
  if (!rawTeaser.trim()) {
    return "";
  }
  const teaserHtml = rawTeaser.startsWith("<")
    ? rawTeaser
    : await markdownToHtml(rawTeaser);
  return stripHtmlToPlainText(teaserHtml).trim();
}

export async function buildBlogCategoryTwin(
  categorySlug: string
): Promise<string | null> {
  const { categoryPosts, categoryName } =
    (await getPublishedPostsForCategoryTwin(categorySlug)) || {};

  if (!categoryName) {
    return null;
  }

  const canonicalUrl = `${canonicalHostnameUrl}/blog/category/${categorySlug}`;
  const lines = await Promise.all(
    (categoryPosts || []).map(
      async (post: {
        title?: string;
        slug?: string;
        created_at?: string;
        metadata?: { teaser?: string };
      }) => {
        const url = `${canonicalHostnameUrl}/blog/posts/${post.slug}`;
        const teaser = await teaserFromPost(post);
        let date = "";
        if (post.created_at) {
          const parsed = new Date(post.created_at);
          if (!Number.isNaN(parsed.getTime())) {
            date = parsed.toISOString().split("T")[0];
          }
        }
        const heading = `### [${post.title}](${url})${date ? ` — ${date}` : ""}`;
        return teaser ? `${heading}\n\n${teaser}` : heading;
      }
    )
  );

  const body =
    lines.length > 0 ? lines.join("\n\n") : "_No posts in this category._";

  return formatTwin(categoryName, canonicalUrl, body);
}
