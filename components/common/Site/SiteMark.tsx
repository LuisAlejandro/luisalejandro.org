"use client";

import { useEffect, useRef } from "react";

import {
  BROW_LEFT,
  BROW_RIGHT,
  GLASSES,
  HAIR,
} from "@components/common/Site/siteMarkPaths";

type SiteMarkProps = {
  className?: string;
  /** Replay the plot when the pointer enters the closest link or button. */
  replayOnHover?: boolean;
};

/**
 * The face mark, plotted the way the reference plots its monogram: each shape
 * is traced as an outline, then filled; the brows drop in and the right one
 * lifts once at the end. CSS only, so it also plays without JavaScript.
 */
export function SiteMark({
  className = "",
  replayOnHover = false,
}: SiteMarkProps) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = ref.current;
    const host = svg?.closest("a, button");
    if (!svg || !host || !replayOnHover) return;

    // Restart the CSS animation: drop the class, force a reflow, add it back.
    const replay = () => {
      svg.classList.remove("is-plotting");
      void svg.getBoundingClientRect();
      svg.classList.add("is-plotting");
    };

    host.addEventListener("pointerenter", replay);
    return () => host.removeEventListener("pointerenter", replay);
  }, [replayOnHover]);

  return (
    <svg
      ref={ref}
      aria-hidden="true"
      viewBox="0 0 100 100"
      className={`site-mark is-plotting ${className}`}
    >
      <path className="site-mark__hair" d={HAIR} pathLength={1} />
      <path className="site-mark__brow" d={BROW_LEFT} pathLength={1} />
      <path
        className="site-mark__brow site-mark__brow--right"
        d={BROW_RIGHT}
        pathLength={1}
      />
      <path className="site-mark__glasses" d={GLASSES} pathLength={1} />
    </svg>
  );
}
