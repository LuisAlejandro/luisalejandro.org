/**
 * Self-check for the blog's derived data and article renderer (no test runner
 * in this repo). Run inside the app container:
 *   npx tsx lib/blogArchive.check.ts
 */
import assert from "node:assert/strict";

import {
  buildArchive,
  groupByYear,
  nextOlder,
  readingMinutes,
  type CosmicPost,
} from "./blogArchive";

const post = (
  slug: string,
  date: string,
  category?: string,
  words = 50
): CosmicPost => ({
  id: slug,
  slug,
  title: `Title ${slug}`,
  created_at: date,
  metadata: {
    teaser: "**Bold** teaser",
    content: Array(words).fill("palabra").join(" "),
    categories: category ? [{ slug: category, title: `Old ${category}` }] : [],
  },
});

const archive = buildArchive(
  [
    post("a", "2025-01-01T00:00:00Z", "dev"),
    post("c", "2026-03-01T00:00:00Z", "dev"),
    post("b", "2025-06-01T00:00:00Z", "ops"),
    post("d", "2025-07-01T00:00:00Z", "gone"),
    post("e", "2026-01-01T00:00:00Z"),
  ],
  [
    { slug: "dev", title: "Dev", content: "" },
    { slug: "ops", title: "Ops", content: "<p>Running things.</p>" },
    { slug: "empty", title: "Empty" },
  ]
);

// Years, newest first, newest first inside each year.
assert.deepEqual(
  groupByYear(archive.rows).map((g) => [g.year, g.rows.map((r) => r.slug)]),
  [
    ["2026", ["c", "e"]],
    ["2025", ["d", "b", "a"]],
  ]
);

// Entry numbers: oldest is #1, newest equals the total.
assert.equal(archive.rows.at(-1)?.number, 1);
assert.equal(archive.rows[0].number, archive.rows.length);

// Titles come from the category list (renames), counts from posts; empty
// categories never appear; a category missing from the list keeps its
// embedded title; uncategorized posts stay in the archive.
assert.deepEqual(
  archive.topics.map((t) => [t.slug, t.title, t.count]),
  [
    ["dev", "Dev", 2],
    ["gone", "Old gone", 1],
    ["ops", "Ops", 1],
  ]
);
assert.equal(archive.rows.find((r) => r.slug === "e")?.category, undefined);

// Description: the category's own text, else its newest post.
assert.equal(
  archive.topics.find((t) => t.slug === "ops")?.description,
  "Running things."
);
assert.equal(
  archive.topics.find((t) => t.slug === "dev")?.description,
  "Latest: Title c"
);

// Specs, teaser, reading time, next post.
assert.deepEqual(archive.specs, {
  entries: 5,
  words: 250,
  since: "2025",
  last: "2026-03-01T00:00:00Z",
});
assert.equal(archive.rows[0].teaser, "Bold teaser");
assert.equal(readingMinutes(50), 1);
assert.equal(readingMinutes(1593), 8);
assert.equal(nextOlder(archive.rows, "c")?.slug, "e");
assert.equal(nextOlder(archive.rows, "a")?.slug, "c");
assert.equal(nextOlder(archive.rows, "missing"), undefined);

console.log("blogArchive: ok");
