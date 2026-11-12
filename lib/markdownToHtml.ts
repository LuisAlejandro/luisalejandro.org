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

/** All text inside a node, including raw inline HTML and footnote markers. */
const text = (node: HastNode): string =>
  node.type === "text"
    ? (node.value ?? "")
    : node.type === "raw"
      ? stripHtmlToPlainText(node.value ?? "")
      : (node.children ?? []).map(text).join("");

/** Footnote reference nodes (`[^1]`) carry no readable heading text. */
const headingText = (node: HastNode): string =>
  (node.children ?? [])
    .filter((child) => child.properties?.dataFootnoteRef === undefined)
    .map(text)
    .join("")
    .trim();

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
// attributes, e.g. class="figure figure-right-40". Matched on class tokens so
// an extra class or single quotes still convert.
const FIGURE_CLASS = /(?:^|\s)figure(?:\s|$)/;
const FIGURE = /^\s*<span\s+([^>]*)>\s*<\/span>\s*$/i;
const decode = (value: string) =>
  value
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
const attr = (attrs: string, name: string) =>
  decode(
    attrs.match(new RegExp(`${name}\\s*=\\s*["']([^"']*)["']`, "i"))?.[1] ?? ""
  );

/** `figure-right-40` and friends drive the float; anything else is full width. */
const figureSize = (classes: string) =>
  classes.match(/figure-(100|(?:left|right)-(?:20|30|40))/)?.[1] ?? "100";

/** A figure marker, or undefined when the span is not one. */
function parseFigure(raw: string) {
  const match = raw.match(FIGURE);
  if (!match) return undefined;
  const attrs = match[1];
  const classes = attr(attrs, "class");
  if (!FIGURE_CLASS.test(classes)) return undefined;
  return {
    src: attr(attrs, "data-figure-href") || attr(attrs, "data-figure-src"),
    alt: stripHtmlToPlainText(attr(attrs, "data-figure-alt")),
    size: figureSize(classes),
  };
}

// Markdown keeps an inline span inside a paragraph, split into raw open and
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
          const figure = parseFigure(raw);
          if (!figure) return child;
          // No image means no figure: an empty src would request the page URL.
          if (!figure.src) {
            logError("markdownToArticle", new Error("figure without image"), {
              attrs: raw.slice(0, 120),
            });
            return { type: "text", value: "" };
          }
          figures += 1;
          const { src, alt, size } = figure;
          const caption = `fig. ${String(figures).padStart(2, "0")}${alt ? ` · ${truncateAtWord(alt, 90)}` : ""}`;
          return {
            type: "raw",
            value: `<figure class="site-fig site-fig--${size}"><img src="${escapeHtml(src)}" alt="${escapeHtml(alt)}" loading="lazy" decoding="async"><figcaption class="site-note">${escapeHtml(caption)}</figcaption></figure>`,
          };
        }

        if (child.type !== "element") return child;

        if (child.tagName === "h2" || child.tagName === "h3") {
          const label = headingText(child);
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
            properties: {
              className: ["site-prose__table"],
              tabIndex: 0,
              role: "region",
              "aria-label": "Table",
            },
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
            value: `<div class="site-prose__scroll" role="region" aria-label="Code sample" tabindex="0"><pre class="site-code"><code class="hljs${language ? ` language-${escapeHtml(language)}` : ""}">${body}</code></pre></div>`,
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
