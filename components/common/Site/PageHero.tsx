import type { ReactNode } from "react";

import { HeroTyped } from "@components/Home/HeroTyped";
import { HeroVortex } from "@components/Home/HeroVortex";
import { type Crumb, PageCrumbs } from "@components/common/Site/PageCrumbs";

type PageHeroProps = {
  /** Trail after Home; the last crumb is this page. */
  trail: Crumb[];
  /** Right-hand index note, e.g. "[About / 03]". */
  index: string;
  /** The display line. */
  lead: string;
  /** The line beneath it, typed in place unless the hero is still. */
  typed: string;
  /** One sentence of supporting copy under the title. */
  intro?: ReactNode;
  /**
   * A quiet hero for pages that are read, not browsed (privacy): the same
   * layout with no vortex and no typing.
   */
  still?: boolean;
  /** The spec strip and calls to action that close the hero. */
  children?: ReactNode;
};

/**
 * The hero every index page shares: crumbs and index, a display line with its
 * generated second line, a token note, an optional sentence, then the page's
 * own strip. The home page's vortex sits behind it, held inside the hero.
 */
export function PageHero({
  trail,
  index,
  lead,
  typed,
  intro,
  still = false,
  children,
}: PageHeroProps) {
  return (
    <section className="site-hero site-hero--page site-wrap">
      {!still && <HeroVortex />}

      <PageCrumbs trail={trail} index={index} />

      {still ? (
        <h1 className="site-hero__title">
          <span className="site-display site-hero__human">{lead}</span>{" "}
          <span className="site-h2 site-hero__machine">{typed}</span>
        </h1>
      ) : (
        <>
          <HeroTyped lead={lead} typed={typed} />
          <div className="site-hero__notes site-note">
            <p className="flex items-center gap-1.5">
              <span className="site-accent">◆</span>
              <span>
                Machine · generated · {typed.split(" ").length} tokens
              </span>
            </p>
          </div>
        </>
      )}

      {intro && <p className="site-lead-type site-page-intro">{intro}</p>}

      {children}
    </section>
  );
}
