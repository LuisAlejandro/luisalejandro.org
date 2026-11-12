import Link from "next/link";
import type { ReactNode } from "react";

import { HeroTyped } from "@components/Home/HeroTyped";
import { HeroVortex } from "@components/Home/HeroVortex";

type PageHeroProps = {
  /** Breadcrumb label for this page. */
  crumb: string;
  /** Right-hand index note, e.g. "[About / 03]". */
  index: string;
  /** The display line, typed in place on first load. */
  lead: string;
  /** The generated line beneath it. */
  typed: string;
  /** The spec strip and calls to action that close the hero. */
  children: ReactNode;
};

/**
 * The inner-page hero: crumbs, index, a display line with its generated
 * second line, a token note, then the page's own strip. The home page's
 * vortex sits behind it, held inside the hero rather than pinned.
 */
export function PageHero({
  crumb,
  index,
  lead,
  typed,
  children,
}: PageHeroProps) {
  return (
    <section className="site-hero site-hero--page site-wrap">
      <HeroVortex />

      <nav aria-label="Breadcrumb" className="site-note site-contact-crumbs">
        <Link href="/" className="site-link">
          Home
        </Link>
        <span aria-hidden="true">/</span>
        <span className="text-ink" aria-current="page">
          {crumb}
        </span>
      </nav>

      <p className="site-note site-contact-index">{index}</p>

      <HeroTyped lead={lead} typed={typed} />

      <div className="site-hero__notes site-note">
        <p className="flex items-center gap-1.5">
          <span className="site-accent">◆</span>
          <span>Machine · generated · {typed.split(" ").length} tokens</span>
        </p>
      </div>

      {children}
    </section>
  );
}
