"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/** Gap between items that enter together, as in the reference's batch. */
const STAGGER_MS = 90;
/** An item reveals when its top crosses this share of the viewport. */
const UP_AT = 0.88;
const LINES_AT = 0.85;

/**
 * Wraps each rendered line of a heading in its own mask, measured from the
 * words' real positions, so the rise follows the line breaks the reader
 * actually sees at this width. Runs once per heading; a resize re-splits.
 */
function splitLines(heading: HTMLElement) {
  // The authored copy, with any <br> kept as a forced break.
  if (heading.dataset.revealText === undefined) {
    let text = "";
    heading.childNodes.forEach((node) => {
      text += node.nodeName === "BR" ? "\n" : (node.textContent ?? "");
    });
    heading.dataset.revealText = text.trim();
  }
  const source = heading.dataset.revealText;

  // Words are measured inside one block-level wrapper, so a heading that is
  // itself a flex or grid container cannot turn each word into its own item.
  heading.textContent = "";
  const measure = document.createElement("span");
  measure.style.display = "block";
  heading.append(measure);
  const spans: { span: HTMLSpanElement; word: string }[] = [];
  source.split("\n").forEach((segment, s) => {
    if (s > 0) measure.append(document.createElement("br"));
    const words = segment.trim().split(/\s+/).filter(Boolean);
    words.forEach((word, i) => {
      const span = document.createElement("span");
      span.textContent = i < words.length - 1 ? `${word} ` : word;
      measure.append(span);
      spans.push({ span, word });
    });
  });

  const lines: string[][] = [];
  let top = Number.NaN;
  for (const { span, word } of spans) {
    if (span.offsetTop !== top) {
      top = span.offsetTop;
      lines.push([]);
    }
    lines[lines.length - 1].push(word);
  }

  heading.textContent = "";
  lines.forEach((line, i) => {
    const mask = document.createElement("span");
    mask.className = "site-line-mask";
    mask.setAttribute("aria-hidden", "true");
    const inner = document.createElement("span");
    inner.textContent = line.join(" ");
    inner.style.setProperty("--line", String(i));
    mask.append(inner);
    heading.append(mask);
  });
  // The visible copy is split into fragments; the heading's name stays whole.
  // Decorative headings are already hidden and need no name.
  if (heading.getAttribute("aria-hidden") !== "true")
    heading.setAttribute("aria-label", source.replace(/\n/g, " "));
}

/**
 * Entrance motion for every page, after the reference:
 * - `data-reveal="up"`: below-the-fold items start 48px low and transparent,
 *   then rise over 1.3s as they cross 88% of the viewport; items that cross
 *   together follow each other 90ms apart. Once each.
 * - `data-reveal="lines"`: a heading is split into its rendered lines, which
 *   rise out of their masks 70ms apart as it crosses 85%.
 * Nothing is hidden before this runs or under reduced motion, so the server
 * HTML is always complete.
 */
export function SiteMotion() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const fold = window.innerHeight * UP_AT;
    const ups = [
      ...document.querySelectorAll<HTMLElement>('[data-reveal="up"]'),
    ].filter((el) => el.getBoundingClientRect().top > fold);
    ups.forEach((el) => (el.dataset.revealState = "hidden"));

    const headings = [
      ...document.querySelectorAll<HTMLElement>('[data-reveal="lines"]'),
    ];
    headings.forEach((heading) => {
      splitLines(heading);
      if (heading.getBoundingClientRect().top > window.innerHeight * LINES_AT)
        heading.dataset.revealState = "hidden";
    });

    // One observer per threshold; each callback is one batch, staggered in
    // reading order.
    const reveal = (
      entries: IntersectionObserverEntry[],
      o: IntersectionObserver
    ) => {
      entries
        .filter((entry) => entry.isIntersecting)
        .map((entry) => entry.target as HTMLElement)
        .sort((a, b) => {
          const ra = a.getBoundingClientRect();
          const rb = b.getBoundingClientRect();
          return ra.top - rb.top || ra.left - rb.left;
        })
        .forEach((el, i) => {
          el.style.setProperty("--reveal-delay", `${i * STAGGER_MS}ms`);
          el.dataset.revealState = "shown";
          o.unobserve(el);
        });
    };
    const upObserver = new IntersectionObserver(reveal, {
      rootMargin: `0px 0px -${Math.round((1 - UP_AT) * 100)}% 0px`,
    });
    const lineObserver = new IntersectionObserver(reveal, {
      rootMargin: `0px 0px -${Math.round((1 - LINES_AT) * 100)}% 0px`,
    });
    ups.forEach((el) => upObserver.observe(el));
    headings
      .filter((h) => h.dataset.revealState === "hidden")
      .forEach((h) => lineObserver.observe(h));

    // Line breaks move with the width; re-split, keeping each state.
    let width = window.innerWidth;
    let frame = 0;
    const onResize = () => {
      if (window.innerWidth === width) return;
      width = window.innerWidth;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => headings.forEach(splitLines));
    };
    window.addEventListener("resize", onResize);

    return () => {
      upObserver.disconnect();
      lineObserver.disconnect();
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(frame);
    };
  }, [pathname]);

  return null;
}
