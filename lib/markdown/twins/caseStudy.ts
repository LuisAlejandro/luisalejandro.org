import fs from "fs";
import path from "path";

import { canonicalHostnameUrl } from "@constants/constants";
import { formatTwin } from "@lib/markdown/formatTwin";

export const CASE_STUDY_SLUGS = new Set([
  "expedia",
  "wheeltheworld",
  "soleit",
  "dockershelf",
  "canaima",
]);

export function isCaseStudySlug(slug: string): boolean {
  return CASE_STUDY_SLUGS.has(slug);
}

export async function buildCaseStudyTwin(slug: string): Promise<string | null> {
  if (!isCaseStudySlug(slug)) {
    return null;
  }

  const filePath = path.join(
    process.cwd(),
    "content/case-studies",
    `${slug}.md`
  );

  let body: string;
  try {
    body = fs.readFileSync(filePath, "utf-8").trim();
  } catch {
    return null;
  }

  const titleMatch = body.match(/^#\s+(.+)/m);
  const title = titleMatch?.[1] || slug;
  const canonicalUrl = `${canonicalHostnameUrl}/case-studies/${slug}`;

  const contentBody = body.replace(/^#\s+.+\n*/m, "").trim();

  return formatTwin(title, canonicalUrl, contentBody);
}
