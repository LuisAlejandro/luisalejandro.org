import hljs from "highlight.js";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

import { logError } from "@lib/logger";
import { stripHtmlToPlainText, truncateAtWord } from "@lib/plainText";

export default async function markdownToHtml(markdown: any) {
  if (!markdown) return "";

  try {
    const result = await unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(rehypeStringify, { allowDangerousHtml: true })
      .process(markdown);
    return result.toString();
  } catch (error) {
    logError("markdownToHtml", error, { markdownLength: markdown?.length });
    return "";
  }
}

export type TocEntry = { id: string; text: string; depth: 2 | 3 };

// Minimal hast shapes: enough for the one transform below.
type HastNode = {
  type: string;
  tagName?: string;
  value?: string;
  properties?: Record<string, unknown>;
  children?: HastNode[];
};

const text = (node: HastNode): string =>
  node.type === "text"
    ? (node.value ?? "")
    : (node.children ?? []).map(text).join("");

/** ASCII slug: accents folded, everything else collapsed to dashes. */
export const slugify = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "") || "section";

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

// Legacy Cosmic figure marker: an empty span carrying the image in data
// attributes, e.g. class="figure figure-right-40".
const FIGURE =
  /^\s*<span class="figure(?:\s+figure-(100|(?:left|right)-(?:20|30|40)))?"([^>]*)><\/span>\s*$/;
const decode = (value: string) =>
  value
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
const attr = (attrs: string, name: string) =>
  decode(attrs.match(new RegExp(`${name}="([^"]*)"`))?.[1] ?? "");

// Markdown keeps the inline span inside a paragraph, split into raw open and
// close tags; a paragraph made only of raw HTML is joined back for matching.
const rawOnly = (node: HastNode) =>
  node.tagName === "p" &&
  node.children?.every(
    (c) => c.type === "raw" || (c.type === "text" && !c.value?.trim())
  )
    ? node.children.map((c) => c.value ?? "").join("")
    : undefined;

/**
 * Article mode: heading ids and a TOC, legacy figure markers as captioned
 * figures, tables in a scroll container, and code highlighted on the server so
 * the page needs no client-side parser or highlighter.
 */
function articleTransform(toc: TocEntry[]) {
  return () => (tree: HastNode) => {
    const used = new Map<string, number>();
    let figures = 0;

    const walk = (node: HastNode) => {
      const children = node.children;
      if (!children) return;

      node.children = children.map((child) => {
        const raw = child.type === "raw" ? child.value : rawOnly(child);
        if (raw) {
          const match = raw.match(FIGURE);
          if (!match) return child;
          figures += 1;
          const [, size = "100", attrs] = match;
          const src =
            attr(attrs, "data-figure-href") || attr(attrs, "data-figure-src");
          const alt = stripHtmlToPlainText(attr(attrs, "data-figure-alt"));
          const caption = `fig. ${String(figures).padStart(2, "0")}${alt ? ` · ${truncateAtWord(alt, 90)}` : ""}`;
          return {
            type: "raw",
            value: `<figure class="site-fig site-fig--${size}"><img src="${escapeHtml(src)}" alt="${escapeHtml(alt)}" loading="lazy" decoding="async"><figcaption class="site-note">${escapeHtml(caption)}</figcaption></figure>`,
          };
        }

        if (child.type !== "element") return child;

        if (child.tagName === "h2" || child.tagName === "h3") {
          const label = text(child).trim();
          const base = slugify(label);
          const seen = used.get(base) ?? 0;
          used.set(base, seen + 1);
          const id = seen ? `${base}-${seen + 1}` : base;
          child.properties = { ...child.properties, id };
          toc.push({ id, text: label, depth: child.tagName === "h2" ? 2 : 3 });
          return child;
        }

        if (child.tagName === "table") {
          return {
            type: "element",
            tagName: "div",
            properties: { className: ["site-prose__table"] },
            children: [child],
          };
        }

        if (child.tagName === "pre") {
          const code = child.children?.find((c) => c.tagName === "code");
          const classes = (code?.properties?.className as string[]) ?? [];
          const language = classes
            .find((c) => c.startsWith("language-"))
            ?.slice("language-".length);
          const source = code ? text(code) : text(child);
          // Unlabeled fences stay plain: auto-detection mis-colours prose and
          // logs, and costs a full pass over every grammar.
          const body =
            language && hljs.getLanguage(language)
              ? hljs.highlight(source, { language }).value
              : escapeHtml(source);
          return {
            type: "raw",
            value: `<pre class="site-code"><code class="hljs${language ? ` language-${escapeHtml(language)}` : ""}">${body}</code></pre>`,
          };
        }

        walk(child);
        return child;
      });
    };

    walk(tree);
  };
}

export async function markdownToArticle(
  markdown: string
): Promise<{ html: string; toc: TocEntry[] }> {
  const toc: TocEntry[] = [];
  if (!markdown) return { html: "", toc };

  try {
    const result = await unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(articleTransform(toc))
      .use(rehypeStringify, { allowDangerousHtml: true })
      .process(markdown);
    return { html: result.toString(), toc };
  } catch (error) {
    logError("markdownToArticle", error, { markdownLength: markdown.length });
    return { html: "", toc: [] };
  }
}
