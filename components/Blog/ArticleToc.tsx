"use client";

import { useEffect, useState } from "react";

import { scrollToSection } from "@components/common/Site/overlayLock";
import type { TocEntry } from "@lib/markdownToHtml";

/**
 * The article's contents list. It marks the section being read and routes
 * clicks through the shared scroller so jumps clear the fixed header.
 */
export function ArticleToc({ toc }: { toc: TocEntry[] }) {
  const [active, setActive] = useState(toc[0]?.id);
  const top = Math.min(...toc.map((entry) => entry.depth));

  useEffect(() => {
    const headings = toc
      .map((entry) => document.getElementById(entry.id))
      .filter((el): el is HTMLElement => el !== null);
    if (headings.length === 0) return;

    // The active section is the last heading that has passed the reading line,
    // a little below the header. Reading positions avoids the gaps an
    // intersection ratio leaves inside long sections.
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = 120;
      let current = headings[0].id;
      for (const heading of headings) {
        if (heading.getBoundingClientRect().top <= line) current = heading.id;
        else break;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [toc]);

  // Only the top level is numbered; deeper headings sit indented under it.
  const numbers = toc.map(
    (entry, index) =>
      entry.depth === top &&
      toc.slice(0, index + 1).filter((e) => e.depth === top).length
  );

  return (
    <aside className="site-toc">
      <p className="site-note text-ink">Contents</p>
      <ol>
        {toc.map((entry, index) => {
          const numbered = numbers[index];
          return (
            <li key={entry.id} data-depth={numbered ? "top" : "sub"}>
              <a
                href={`#${entry.id}`}
                className="site-toc__link"
                aria-current={active === entry.id ? "true" : undefined}
                onClick={(event) => {
                  if (scrollToSection(entry.id)) event.preventDefault();
                }}
              >
                {numbered && (
                  <span className="site-note" aria-hidden="true">
                    {String(numbered).padStart(2, "0")}
                  </span>
                )}
                {/* Authors often number headings themselves; the list already does. */}
                <span lang="es">{entry.text.replace(/^\d+[.)]\s+/, "")}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </aside>
  );
}
