const ARTICLE_URL = /^https:\/\/luisalejandro\.org\/blog\/posts\/([a-z0-9-]+)$/;

/**
 * Slug of a Postiz "post published" webhook body, or null to ignore it.
 * Postiz sends an array of post records; only a published Cosmic article on
 * this site's canonical URL counts.
 */
export function publishedPostizSlug(body: unknown): string | null {
  if (!Array.isArray(body) || body.length !== 1) return null;
  const [post] = body as Array<{
    state?: unknown;
    releaseURL?: unknown;
    integration?: { providerIdentifier?: unknown };
  }>;
  if (post?.state !== "PUBLISHED") return null;
  if (post.integration?.providerIdentifier !== "cosmic") return null;
  if (typeof post.releaseURL !== "string") return null;
  return ARTICLE_URL.exec(post.releaseURL)?.[1] ?? null;
}
