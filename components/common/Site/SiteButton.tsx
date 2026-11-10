"use client";

import Link from "next/link";

import type { PixelEvent } from "@constants/siteNavigation";
import { trackPixelEvent } from "@lib/pixel";

type SiteButtonProps = {
  href: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
  tracking?: PixelEvent;
  arrow?: boolean;
  className?: string;
};

const sizes = {
  sm: "px-4 py-1.5 text-step-n1",
  md: "px-6 py-2.5 text-step-0",
  lg: "px-8 py-3.5 text-step-0",
};

/**
 * The filled pill used for every primary call to action. One definition keeps
 * the five call sites from drifting apart in size and tracking.
 */
export function SiteButton({
  href,
  children,
  size = "md",
  tracking,
  arrow = false,
  className = "",
}: SiteButtonProps) {
  return (
    <Link
      href={href}
      onClick={tracking ? () => trackPixelEvent(tracking) : undefined}
      className={`group inline-flex items-center justify-center gap-2 rounded-full bg-ink font-medium text-paper hover:bg-ink-strong ${sizes[size]} ${className}`}
    >
      <span>{children}</span>
      {arrow && (
        <span className="transition-transform group-hover:translate-x-1">
          →
        </span>
      )}
    </Link>
  );
}
