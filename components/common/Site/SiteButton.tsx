"use client";

import Link from "next/link";

import type { PixelEvent } from "@constants/siteNavigation";
import { trackPixelEvent } from "@lib/pixel";

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
 * Where a link goes decides how it opens and which arrow it carries, so the
 * same kind of action looks the same everywhere: → stays on the site, ↗ leaves
 * it, ↓ moves down the page or downloads a file.
 */
function kindOf(href: string) {
  if (href.startsWith("#") || href.startsWith("/files/")) return "down";
  if (/^https?:/.test(href)) return "external";
  if (href.startsWith("mailto:")) return "mail";
  return "internal";
}

const GLYPH = { down: "↓", external: "↗", mail: "→", internal: "→" } as const;

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
  const kind = kindOf(href);

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
      {arrow && (
        <span aria-hidden="true" className="site-btn__arrow" data-kind={kind}>
          {GLYPH[kind]}
        </span>
      )}
    </>
  );

  // Off-site, mail and file links are plain anchors: client routing only
  // applies to pages of this site.
  if (kind !== "internal" && !href.startsWith("#")) {
    const external = kind === "external";
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
