"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

import {
  registerSmoothScroller,
  releaseSmoothScroller,
  scrollToSection,
} from "@components/common/Site/overlayLock";

export function SmoothScroll() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({ autoRaf: true, duration: 1.2 });
    registerSmoothScroller(lenis);

    // Let in-page anchors use the smooth scroller, which also clears the
    // sticky header (a plain anchor jump hides the section label behind it).
    const handleAnchorClick = (event: MouseEvent) => {
      // Leave ⌘/Ctrl/Shift/Alt-click to the browser so new tabs and downloads
      // keep working, and never fight another handler that already acted.
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const target = event.target;
      if (!(target instanceof Element)) return;

      const link = target.closest("a");
      const href = link?.getAttribute("href");
      if (!href || !href.startsWith("/#")) return;
      if (window.location.pathname !== "/") return;

      event.preventDefault();
      scrollToSection(href.replace("/#", ""));
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      releaseSmoothScroller(lenis);
      lenis.destroy();
    };
  }, []);

  return null;
}
