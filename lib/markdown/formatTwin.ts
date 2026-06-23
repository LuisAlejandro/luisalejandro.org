export function formatTwin(
  title: string,
  canonicalUrl: string,
  body: string
): string {
  return `# ${title}\n\nCanonical URL: ${canonicalUrl}\n\n${body}`;
}
