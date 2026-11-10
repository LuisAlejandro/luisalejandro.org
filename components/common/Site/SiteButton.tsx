"use client";

import Link from "next/link";

import type { PixelEvent } from "@constants/siteNavigation";
import { trackPixelEvent } from "@lib/pixel";

type SiteButtonProps = {
  href: string;
  children: React.ReactNode;
  /** `sm` is the 36px header pill; `md` is the 52px page pill. */
  size?: "sm" | "md";
  variant?: "solid" | "ghost";
  tracking?: PixelEvent;
  arrow?: boolean;
  className?: string;
};

/**
 * The pill used for every call to action. Geometry, tracking and the rising
 * accent hover come from the reference; one definition keeps the call sites
 * from drifting apart.
 */
export function SiteButton({
  href,
  children,
  size = "md",
  variant = "solid",
  tracking,
  arrow = false,
  className = "",
}: SiteButtonProps) {
  const external = href.startsWith("http");

  const classes = [
    "site-btn",
    size === "sm" ? "site-btn--sm" : "",
    variant === "ghost" ? "site-btn--ghost" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      <span>{children}</span>
      {arrow && (
        <span aria-hidden="true" className="site-btn__arrow">
          →
        </span>
      )}
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={tracking ? () => trackPixelEvent(tracking) : undefined}
        className={classes}
      >
        {content}
      </a>
    );
  }

  return (
    <Link
      href={href}
      onClick={tracking ? () => trackPixelEvent(tracking) : undefined}
      className={classes}
    >
      {content}
    </Link>
  );
}
