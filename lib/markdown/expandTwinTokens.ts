const TOKEN_PATTERN = /\{\{(\w+)\}\}/g;

/**
 * Expands `{{token}}` placeholders in the hand-maintained `content/llms/*.md`
 * files so facts the site computes (like years of experience) cannot drift
 * from the rendered page. Unknown tokens are left untouched.
 */
export function expandTwinTokens(
  content: string,
  tokens: Record<string, string | number>
): string {
  return content.replace(TOKEN_PATTERN, (match, key: string) => {
    const value = tokens[key];
    return value === undefined ? match : String(value);
  });
}
