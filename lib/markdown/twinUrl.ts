/** HTML path → markdown twin URL (KTD2). */
export function twinUrl(htmlPath: string): string {
  if (htmlPath === "/" || htmlPath === "") {
    return "/index.md";
  }
  const normalized = htmlPath.endsWith("/") ? htmlPath.slice(0, -1) : htmlPath;
  return `${normalized}.md`;
}
