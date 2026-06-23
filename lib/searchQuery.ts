export const MAX_SEARCH_QUERY_LENGTH = 128;

export function sanitizeSearchQuery(query: string): string | null {
  const trimmed = query.trim();

  if (!trimmed || trimmed.length > MAX_SEARCH_QUERY_LENGTH) {
    return null;
  }

  return trimmed.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
