"use client";

import { useEffect, useId, useRef, useState } from "react";

import { ProjectList, RecentProjectList } from "@constants/constants";
import { flatLay } from "@lib/flatLay";

import { BlogSystemArt } from "./work-art/blogsystem";
import { BotanasArt } from "./work-art/botanas";
import { CanaimaArt } from "./work-art/canaima";
import { CicdArt } from "./work-art/cicd";
import { DockershelfArt } from "./work-art/dockershelf";
import { ExpediaArt } from "./work-art/expedia";
import { MashArt } from "./work-art/mash";
import { ShokyArt } from "./work-art/shoky";
import { SoleitArt } from "./work-art/soleit";
import { TetraArt } from "./work-art/tetra";
import { WholmasterArt } from "./work-art/wholmaster";
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
type Slug = (typeof ProjectList | typeof RecentProjectList)[number]["visit"];

const WIDE = "0 0 1600 900";

/** Every drawing shares the wide sheet and the stage's scroll progress. */
const ART: Partial<Record<Slug, Entry>> = {
  "/case-studies/mash": { Art: MashArt, view: WIDE },
  "/case-studies/wholmaster": { Art: WholmasterArt, view: WIDE },
  "/case-studies/shoky": { Art: ShokyArt, view: WIDE },
  "/case-studies/tetra": { Art: TetraArt, view: WIDE },
  "/case-studies/blog-system": { Art: BlogSystemArt, view: WIDE },
  "/case-studies/botanas": { Art: BotanasArt, view: WIDE },
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
  play = "scroll",
}: {
  slug: string;
  layer?: Layer;
  /**
   * `scroll` draws in once in view and follows the stage's progress; `hover`
   * rests finished and replays the story while its card is hovered.
   */
  play?: "scroll" | "hover";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [drawn, setDrawn] = useState(false);
  const entry = ART[slug as Slug];
  const Art = entry?.Art;

  useEffect(() => {
    const host = ref.current;
    if (!host || !Art || play === "hover") return;
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
  }, [Art, play]);

  // In the grid the drawing is a flat lay: every object goes square to the
  // cell at one shared scale, in two rows (see flatLay). Placement is in
  // sheet units and the cell is always 16:10, so it runs once.
  useEffect(() => {
    const svg = svgRef.current;
    if (play !== "hover" || !svg) return;
    const objects = [
      ...svg.querySelectorAll<SVGGElement>(
        ":scope > g[transform]:not(.site-art__figure), :scope > .site-art__lift > g"
      ),
    ];
    const lift = objects.findIndex((g) =>
      g.parentElement?.classList.contains("site-art__lift")
    );
    const { width, height } = svg.getBoundingClientRect();
    if (!width || lift < 0) return;
    const sheet = svg.viewBox.baseVal;
    const visible = (sheet.width * height) / width;
    const { scale, place } = flatLay(
      objects.map((g) => g.getBBox()),
      lift,
      {
        x: sheet.x,
        y: sheet.y + (sheet.height - visible) / 2,
        width: sheet.width,
        height: visible,
      }
    );
    objects.forEach((g, i) => {
      const [x, y] = place[i];
      g.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) scale(${scale.toFixed(3)})`;
    });
    return () => objects.forEach((g) => g.style.removeProperty("transform"));
  }, [play]);

  if (!Art) return null;

  return (
    <div ref={ref} className="site-art" data-drawn={drawn} data-play={play}>
      <svg
        ref={svgRef}
        viewBox={entry.view}
        role="presentation"
        focusable="false"
      >
        <Art layer={layer} />
      </svg>
    </div>
  );
}

/** True when an artwork exists for this project; the caller falls back to the shot. */
export const hasArtwork = (slug: string) => Boolean(ART[slug as Slug]);

/** Every drawing crosses the title, so the front layer follows the same test. */
export const hasFrontLayer = hasArtwork;
