"use client";

import Link from "next/link";

import type { PixelEvent } from "@constants/siteNavigation";
import { trackPixelEvent } from "@lib/pixel";

import { Arrow, arrowKind } from "./Arrow";

type SiteButtonProps = {
  href: string;
  children: React.ReactNode;
  /** `sm` is the 36px header pill; `md` is the 52px page pill. */
  size?: "sm" | "md";
  /** `paper` is the light pill used on dark panels. */
  variant?: "solid" | "ghost" | "paper";
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
  const kind = arrowKind(href);
  const mail = href.startsWith("mailto:");
  // R5: a solid button always points; a ghost one only when it leaves the
  // page (↗) or goes down it (↓), so the solid button beside it stays the one
  // that points.
  const showArrow = arrow && (variant !== "ghost" || kind !== "internal");

  const classes = [
    "site-btn",
    size === "sm" ? "site-btn--sm" : "",
    variant === "solid" ? "" : `site-btn--${variant}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const onClick = tracking ? () => trackPixelEvent(tracking) : undefined;

  const content = (
    <>
      <span>{children}</span>
      {showArrow && <Arrow kind={kind} className="site-btn__arrow" />}
    </>
  );

  // Off-site, mail and file links are plain anchors: client routing only
  // applies to pages of this site. Mail opens an app, not a tab.
  if (kind !== "internal" && !href.startsWith("#")) {
    const external = kind === "external" && !mail;
    return (
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        onClick={onClick}
        className={classes}
      >
        {content}
        {external && <span className="sr-only"> (opens in a new tab)</span>}
      </a>
    );
  }

  return (
    <Link href={href} onClick={onClick} className={classes}>
      {content}
    </Link>
  );
}
