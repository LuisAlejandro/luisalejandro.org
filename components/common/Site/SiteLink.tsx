"use client";

import type { ReactNode } from "react";
import Link from "next/link";

import type { PixelEvent } from "@constants/siteNavigation";
import { trackPixelEvent } from "@lib/pixel";

type SiteLinkProps = {
  href: string;
  external?: boolean;
  pixelEvent?: PixelEvent;
  /** Surface-specific class (nav row, menu row, footer row). */
  className?: string;
  /** Runs after the click (closing the mobile menu, for example). */
  onNavigate?: () => void;
  children: ReactNode;
};

/**
 * The one place that knows how a site link differs from an external one: an
 * external link opens in a new tab with `rel`, both report their pixel event.
 * Header, mobile menu and footer all render through here so the behaviour
 * cannot drift between them.
 */
export function SiteLink({
  href,
  external,
  pixelEvent,
  className,
  onNavigate,
  children,
}: SiteLinkProps) {
  const handleClick = () => {
    if (pixelEvent) trackPixelEvent(pixelEvent);
    onNavigate?.();
  };

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className={className}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} onClick={handleClick} className={className}>
      {children}
    </Link>
  );
}
