"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/** How far a button follows the pointer, as a share of its offset. */
const PULL_X = 0.25;
const PULL_Y = 0.35;
const OPEN_MS = 700;
const CLOSE_MS = 500;

/** expo.out and power3.inOut, as the reference eases them. */
const EASE_OPEN = "cubic-bezier(0.16, 1, 0.3, 1)";
const EASE_CLOSE = "cubic-bezier(0.65, 0, 0.35, 1)";

/**
 * Buttons lean toward a fine pointer: 25% of its horizontal and 35% of its
 * vertical offset from the button's centre, and spring back when it leaves.
 * The pull uses the `translate` property, so the buttons' own hover
 * transforms are untouched.
 */
function magnetic() {
  let current: HTMLElement | null = null;

  const release = (el: HTMLElement) => {
    el.dataset.magnet = "release";
    el.style.translate = "";
  };

  const onMove = (event: PointerEvent) => {
    if (event.pointerType !== "mouse") return;
    const target = (event.target as Element | null)?.closest<HTMLElement>(
      ".site-btn, .site-tool"
    );
    if (target !== current) {
      if (current) release(current);
      current = target ?? null;
    }
    if (!current) return;
    const rect = current.getBoundingClientRect();
    const x = (event.clientX - (rect.left + rect.width / 2)) * PULL_X;
    const y = (event.clientY - (rect.top + rect.height / 2)) * PULL_Y;
    current.dataset.magnet = "pull";
    current.style.translate = `${x.toFixed(1)}px ${y.toFixed(1)}px`;
  };

  const onLeaveWindow = () => {
    if (current) release(current);
    current = null;
  };

  window.addEventListener("pointermove", onMove, { passive: true });
  document.documentElement.addEventListener("pointerleave", onLeaveWindow);
  return () => {
    window.removeEventListener("pointermove", onMove);
    document.documentElement.removeEventListener("pointerleave", onLeaveWindow);
    if (current) release(current);
  };
}

/**
 * Disclosure rows (FAQs, the project archive) open and close by animating
 * their height, the content fading in from 10px above. The native <details> element stays in charge of state,
 * so keyboard and assistive technology behave exactly as before.
 */
function smoothDetails() {
  const running = new WeakMap<HTMLDetailsElement, Animation[]>();

  const onClick = (event: MouseEvent) => {
    const summary = (event.target as Element | null)?.closest("summary");
    const details = summary?.parentElement;
    if (
      !summary ||
      !(details instanceof HTMLDetailsElement) ||
      !details.hasAttribute("data-smooth")
    )
      return;
    const answer = summary.nextElementSibling as HTMLElement | null;
    if (!answer) return;

    event.preventDefault();
    running.get(details)?.forEach((a) => a.cancel());
    const from = details.offsetHeight;
    const closing = details.open && !details.hasAttribute("data-closing");

    let animations: Animation[];
    if (!closing) {
      details.removeAttribute("data-closing");
      details.open = true;
      const to = details.offsetHeight;
      animations = [
        details.animate([{ height: `${from}px` }, { height: `${to}px` }], {
          duration: OPEN_MS,
          easing: EASE_OPEN,
        }),
        answer.animate(
          [
            { opacity: 0, transform: "translateY(-10px)" },
            { opacity: 1, transform: "none" },
          ],
          { duration: 600, delay: 80, easing: EASE_OPEN, fill: "backwards" }
        ),
      ];
    } else {
      details.setAttribute("data-closing", "");
      const to =
        summary.offsetHeight + details.offsetHeight - details.clientHeight;
      animations = [
        details.animate([{ height: `${from}px` }, { height: `${to}px` }], {
          duration: CLOSE_MS,
          easing: EASE_CLOSE,
        }),
        answer.animate(
          [
            { opacity: 1, transform: "none" },
            { opacity: 0, transform: "translateY(-6px)" },
          ],
          {
            duration: 300,
            easing: "cubic-bezier(0.55, 0, 1, 0.45)",
            fill: "forwards",
          }
        ),
      ];
    }
    running.set(details, animations);
    details.style.overflow = "hidden";

    animations[0].finished
      .then(() => {
        if (closing) {
          details.open = false;
          details.removeAttribute("data-closing");
        }
        details.style.overflow = "";
        animations.forEach((a) => a.cancel());
        running.delete(details);
      })
      .catch(() => {
        // Cancelled by a newer click; that click owns the row now.
      });
  };

  document.addEventListener("click", onClick);
  return () => document.removeEventListener("click", onClick);
}

/**
 * A link to a row's anchor (`/portfolio#leadbox-build-queue`, which is where
 * the old project pages now redirect) opens that row, then brings it into
 * view. Runs on load and whenever the hash changes.
 */
function openFromHash() {
  const open = () => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;
    const target = document.getElementById(id);
    if (!(target instanceof HTMLDetailsElement)) return;
    target.open = true;
    requestAnimationFrame(() =>
      target.scrollIntoView({ block: "start", behavior: "auto" })
    );
    target.querySelector("summary")?.focus({ preventScroll: true });
  };
  open();
  window.addEventListener("hashchange", open);
  return () => window.removeEventListener("hashchange", open);
}

/**
 * Pointer and disclosure interactions taken from the reference: magnetic
 * buttons for a mouse, and FAQ rows that open smoothly. Both are skipped
 * entirely under reduced motion; the FAQ keeps its native instant toggle.
 */
export function SiteInteractions() {
  const pathname = usePathname();

  useEffect(() => openFromHash(), [pathname]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const cleanups = [smoothDetails()];
    if (window.matchMedia("(pointer: fine)").matches) cleanups.push(magnetic());
    return () => cleanups.forEach((cleanup) => cleanup());
  }, [pathname]);

  return null;
}
