import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { join } from "node:path";

import { GalleryList, ProjectList } from "@constants/constants";
import { getPortfolioProject, portfolioProjects } from "@lib/portfolio";
import { generatePortfolioJsonLd } from "@lib/structuredData";

assert.equal(portfolioProjects.length, 10);
assert.equal(new Set(portfolioProjects.map((p) => p.slug)).size, 10);
assert.equal(getPortfolioProject("missing-project"), undefined);
assert.equal(getPortfolioProject("constructor"), undefined);
assert.deepEqual(
  portfolioProjects.map((p) => p.year),
  [...GalleryList.map((p) => p.year)].sort((a, b) => b - a)
);
for (const project of GalleryList) {
  assert.match(project.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
  assert.equal(
    getPortfolioProject(project.slug),
    project,
    "preserve original content"
  );
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
  assert.ok(!ProjectList.some((p) => p.visit === `/portfolio/${project.slug}`));
}
const graph = generatePortfolioJsonLd()["@graph"];
const list = graph.find((node) => node["@type"] === "ItemList");
assert.ok(list && "itemListElement" in list);
assert.equal(list.itemListElement?.length, 10);
assert.ok(!JSON.stringify(graph).includes("/case-studies/"));
console.log("portfolio: ok");
