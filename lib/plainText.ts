/**
 * Strip HTML tags for plain-text excerpts (metadata, JSON-LD).
 * Uses repeated replacement so nested/bypass patterns cannot survive.
 */
export function stripHtmlToPlainText(html: string): string {
  let text = html;
  let previous: string;
  do {
    previous = text;
    text = text.replace(/<[^>]*>/g, "");
  } while (text !== previous);
  return text;
}

/**
 * Trim text to `max` characters for meta descriptions and titles.
 *
 * Breaks on the last word boundary so the result does not end mid-word, and
 * never splits a surrogate pair or leaves a dangling high surrogate, which
 * plain `substring` can do.
 */
export function truncateAtWord(text: string, max: number): string {
  const clean = text.trim();
  if (clean.length <= max) return clean;

  // Work in code points so an astral character is never cut in half.
  const chars = Array.from(clean).slice(0, max + 1);
  const hard = chars.slice(0, max).join("");
  const tail = chars[max] ?? "";

  const boundary = hard.lastIndexOf(" ");
  const cut = boundary > max * 0.6 ? hard.slice(0, boundary) : hard;

  return `${cut.replace(/[\s,;:.\u2013\u2014-]+$/u, "")}…`;
}
