import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { join } from "node:path";

import {
  GalleryList,
  ProjectList,
  RecentProjectList,
} from "@constants/constants";
import { portfolioProjects } from "@lib/portfolio";
import { generatePortfolioJsonLd } from "@lib/structuredData";

assert.equal(portfolioProjects.length, 13);
assert.equal(new Set(portfolioProjects.map((p) => p.slug)).size, 13);
assert.deepEqual(
  portfolioProjects.map((p) => p.year),
  [...GalleryList.map((p) => p.year)].sort((a, b) => b - a)
);
for (const project of GalleryList) {
  assert.match(project.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
  assert.ok(portfolioProjects.includes(project), "preserve original content");
  for (const src of [
    project.images.thumbnail,
    project.images.logo,
    ...project.images.hero,
  ]) {
    assert.ok(
      existsSync(join(process.cwd(), "public", src)),
      `Missing asset: ${src}`
    );
  }
  // Projects are rows on /portfolio, never pages: nothing links to one.
  assert.ok(!ProjectList.some((p) => p.visit.startsWith("/portfolio/")));
}
const graph = generatePortfolioJsonLd()["@graph"];
const byId = (suffix: string) =>
  graph.find((node) => String(node["@id"] ?? "").endsWith(suffix));
// The page shows the case studies, then the project archive; each list
// carries exactly its own entries.
const archive = byId("#Projects");
assert.ok(archive && "itemListElement" in archive);
assert.equal(archive.itemListElement?.length, 13);
assert.ok(!JSON.stringify(archive).includes("/case-studies/"));
const studies = byId("#CaseStudies");
assert.ok(studies && "itemListElement" in studies);
assert.equal(
  studies.itemListElement?.length,
  RecentProjectList.length + ProjectList.length
);
assert.ok(
  studies.itemListElement?.every((entry) =>
    entry.item.url.includes("/case-studies/")
  )
);
console.log("portfolio: ok");
