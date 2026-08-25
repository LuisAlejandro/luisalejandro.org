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
