import { format, parseISO } from "date-fns";

import { plainTeaser, stripHtmlToPlainText } from "@lib/plainText";

/**
 * The blog's derived view of Cosmic data. Every figure the blog shows (entry
 * numbers, years, word totals, topic counts, the next post) comes from here, so
 * renaming, adding or deleting a category, or publishing a post, changes the
 * pages on the next render with no hand-maintained copy to update.
 */

type CosmicCategory = {
  slug?: string;
  title?: string;
  content?: string;
};

export type CosmicPost = {
  id: string;
  slug: string;
  title: string;
  created_at: string;
  metadata?: {
    hero?: { url?: string; imgix_url?: string };
    categories?: CosmicCategory[];
    teaser?: string;
    content?: string;
    faqs?: { question: string; answer: string }[];
  };
};

export type BlogCategory = { slug: string; title: string };

export type BlogRow = {
  id: string;
  slug: string;
  title: string;
  date: string;
  year: string;
  /** 1 is the oldest post, so numbers stay stable as new posts arrive. */
  number: number;
  /** Every category the post carries; `category` is the first, for display. */
  categories: BlogCategory[];
  category?: BlogCategory;
  teaser: string;
  cover?: string;
  words: number;
  minutes: number;
};

export type BlogTopic = BlogCategory & {
  count: number;
  latest: BlogRow;
  /** The category's own description when set in Cosmic, else its newest post. */
  description: string;
};

export type BlogArchive = {
  /** Newest first. */
  rows: BlogRow[];
  topics: BlogTopic[];
  specs: { entries: number; words: number; since: string; last?: string };
};

const WORDS_PER_MINUTE = 200;

export function countWords(text = ""): number {
  return stripHtmlToPlainText(text)
    .split(/\s+/)
    .filter((token) => /[\p{L}\p{N}]/u.test(token)).length;
}

export const readingMinutes = (words: number) =>
  Math.max(1, Math.round(words / WORDS_PER_MINUTE));

export const entryNumber = (n: number) => `#${String(n).padStart(3, "0")}`;

/** date-fns `format` throws on an invalid date; one bad record must not 500. */
export const formatPostDate = (iso: string) => {
  const date = parseISO(iso);
  return Number.isNaN(date.getTime()) ? "" : format(date, "dd MMM yyyy");
};

export function buildArchive(
  posts: CosmicPost[],
  categories: CosmicCategory[] = []
): BlogArchive {
  const known = new Map(
    categories
      .filter(
        (c): c is Required<Pick<CosmicCategory, "slug">> & CosmicCategory =>
          Boolean(c?.slug)
      )
      .map((c) => [c.slug, c])
  );

  const oldestFirst = [...posts]
    .filter((p) => p?.slug && p.created_at)
    .sort((a, b) => a.created_at.localeCompare(b.created_at));

  const rows: BlogRow[] = oldestFirst
    .map((post, index) => {
      // A post may carry several categories; each one keeps it in that
      // archive and counts toward that topic.
      const categories: BlogCategory[] = (post.metadata?.categories ?? [])
        .filter((c) => Boolean(c?.slug))
        .map((c) => {
          const named = known.get(c.slug as string) ?? c;
          return {
            slug: c.slug as string,
            title: named.title || (c.slug as string),
          };
        });
      const words = countWords(post.metadata?.content);
      const hero = post.metadata?.hero;
      return {
        id: post.id,
        slug: post.slug,
        title: post.title,
        date: post.created_at,
        year: post.created_at.slice(0, 4),
        number: index + 1,
        categories,
        category: categories[0],
        teaser: plainTeaser(post.metadata?.teaser),
        cover: hero?.imgix_url || hero?.url,
        words,
        minutes: readingMinutes(words),
      };
    })
    .reverse();

  const bySlug = new Map<string, BlogTopic>();
  for (const row of rows) {
    for (const category of row.categories) {
      const topic = bySlug.get(category.slug);
      if (topic) {
        topic.count += 1;
        continue;
      }
      // Rows are newest first, so the first row seen is the latest post.
      const own = plainTeaser(known.get(category.slug)?.content);
      bySlug.set(category.slug, {
        ...category,
        count: 1,
        latest: row,
        description: own || `Latest: ${row.title}`,
      });
    }
  }

  const topics = [...bySlug.values()].sort(
    (a, b) => b.count - a.count || b.latest.date.localeCompare(a.latest.date)
  );

  return {
    rows,
    topics,
    specs: {
      entries: rows.length,
      words: rows.reduce((sum, row) => sum + row.words, 0),
      since: rows.at(-1)?.year ?? "",
      last: rows[0]?.date,
    },
  };
}

/** Newest year first; rows keep their newest-first order inside each year. */
export function groupByYear(rows: BlogRow[]) {
  const years: { year: string; rows: BlogRow[] }[] = [];
  for (const row of rows) {
    const group = years.at(-1);
    if (group?.year === row.year) group.rows.push(row);
    else years.push({ year: row.year, rows: [row] });
  }
  return years;
}

/** The next older post, wrapping from the oldest back to the newest. */
export function nextOlder(rows: BlogRow[], slug: string): BlogRow | undefined {
  if (rows.length < 2) return undefined;
  const index = rows.findIndex((row) => row.slug === slug);
  if (index < 0) return undefined;
  return rows[(index + 1) % rows.length];
}
