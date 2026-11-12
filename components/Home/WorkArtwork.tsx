"use client";

import { useEffect, useId, useRef, useState } from "react";

import { ProjectList } from "@constants/constants";

import { CanaimaArt } from "./work-art/canaima";
import { CicdArt } from "./work-art/cicd";
import { DockershelfArt } from "./work-art/dockershelf";
import { ExpediaArt } from "./work-art/expedia";
import { SoleitArt } from "./work-art/soleit";
import type { Layer } from "./work-art/shared";

/**
 * Project artwork drawn as a technical collage: outlined UI fragments with
 * micro labels, dimension and leader lines with arrowheads, elements that
 * overlap and run past the sheet edge, with accent reserved for verified
 * figures. Objects are illustrative, not screenshots or operational records.
 * Each scene lives in `work-art/`.
 */

type Entry = {
  Art: (props: { layer?: Layer }) => React.JSX.Element | null;
  /** Sheet the scene is drawn on; the stage renders it full-bleed. */
  view: string;
};

/** Project slugs that have a drawing; anything else falls back to the shot. */
type Slug = (typeof ProjectList)[number]["visit"];

/** All five drawings share the wide sheet and the stage's scroll progress. */
const ART: Partial<Record<Slug, Entry>> = {
  "/case-studies/expedia": {
    Art: ExpediaArt,
    view: "0 0 1600 900",
  },
  "/case-studies/wheeltheworld": {
    Art: CicdArt,
    view: "0 0 1600 900",
  },
  "/case-studies/soleit": {
    Art: SoleitArt,
    view: "0 0 1600 900",
  },
  "/case-studies/dockershelf": {
    Art: DockershelfArt,
    view: "0 0 1600 900",
  },
  "/case-studies/canaima": {
    Art: CanaimaArt,
    view: "0 0 1600 900",
  },
};

export function WorkArtwork({
  slug,
  layer = "back",
}: {
  slug: string;
  layer?: Layer;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [drawn, setDrawn] = useState(false);
  const entry = ART[slug as Slug];
  const Art = entry?.Art;

  useEffect(() => {
    const host = ref.current;
    if (!host || !Art) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      window.requestAnimationFrame(() => setDrawn(true));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setDrawn(true);
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(host);
    return () => observer.disconnect();
  }, [Art]);

  if (!Art) return null;

  return (
    <div ref={ref} className="site-art" data-drawn={drawn}>
      <svg viewBox={entry.view} role="presentation" focusable="false">
        <Art layer={layer} />
      </svg>
    </div>
  );
}

/** True when an artwork exists for this project; the caller falls back to the shot. */
export const hasArtwork = (slug: string) => Boolean(ART[slug as Slug]);

/** Every drawing crosses the title, so the front layer follows the same test. */
export const hasFrontLayer = hasArtwork;
