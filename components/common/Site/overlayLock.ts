"use client";

// Shared overlay/scroll coordination for the site shell.
//
// Three separate parts of the shell need the same two behaviours, and doing
// them independently produced real bugs: the palette cleared the body scroll
// lock the mobile menu still needed, and Lenis kept scrolling the page behind
// an open dialog. One owner fixes both.

type SmoothScroller = {
  stop: () => void;
  start: () => void;
  scrollTo: (target: Element, options?: { offset?: number }) => void;
};

let scroller: SmoothScroller | null = null;
let lockCount = 0;
let savedOverflow = "";

export function registerSmoothScroller(instance: SmoothScroller) {
  scroller = instance;
}

export function releaseSmoothScroller(instance: SmoothScroller) {
  if (scroller === instance) {
    scroller = null;
  }
}

/**
 * Locks page scrolling for an overlay. Returns the matching release.
 * Reference-counted so stacked overlays cannot clear each other's lock, and
 * only the outermost transition touches <body>.
 */
export function lockPageScroll(): () => void {
  if (lockCount === 0) {
    savedOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    scroller?.stop();
  }
  lockCount += 1;

  let released = false;
  return () => {
    if (released) return;
    released = true;
    lockCount = Math.max(0, lockCount - 1);
    if (lockCount === 0) {
      document.body.style.overflow = savedOverflow;
      scroller?.start();
    }
  };
}

/** Scrolls to an in-page section, clearing the sticky header, and updates the hash. */
export function scrollToSection(id: string): boolean {
  const element = document.getElementById(id);
  if (!element) return false;

  if (scroller) {
    // Callers can reach this while an overlay still holds the scroll lock, and
    // Lenis ignores scrollTo while stopped: start it so the jump always runs.
    scroller.start();
    scroller.scrollTo(element, { offset: -80 });
  } else {
    element.scrollIntoView();
  }
  window.history.pushState(null, "", `#${id}`);
  return true;
}

/** Opens the site command palette; the event name stays in one place. */
export const openPalette = () =>
  window.dispatchEvent(new CustomEvent("site:open-palette"));
