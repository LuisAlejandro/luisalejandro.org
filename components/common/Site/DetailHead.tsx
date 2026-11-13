import type { ReactNode } from "react";

import { type Crumb, PageCrumbs } from "@components/common/Site/PageCrumbs";

type DetailHeadProps = {
  trail: Crumb[];
  index: string;
  /** A short muted note above the title. */
  eyebrow?: ReactNode;
  title: ReactNode;
  /** Long Spanish article titles take the smaller article size. */
  size?: "detail" | "article";
  lang?: string;
  lead?: ReactNode;
  /** The spec strip under the lead. */
  children?: ReactNode;
};

/**
 * The opening of a single entry (a post, a project, a case study, a topic):
 * the same crumbs and index as the index pages, then a title sized for the
 * entry, a muted lead and the spec strip. Rendered as the article's header.
 */
export function DetailHead({
  trail,
  index,
  eyebrow,
  title,
  size = "detail",
  lang,
  lead,
  children,
}: DetailHeadProps) {
  return (
    <header className="site-detail-head">
      <PageCrumbs trail={trail} index={index} />
      {eyebrow && (
        <p className="site-note site-detail-head__eyebrow" lang={lang}>
          {eyebrow}
        </p>
      )}
      <h1
        className={
          size === "article" ? "site-article__title" : "site-detail-title"
        }
        lang={lang}
      >
        {title}
      </h1>
      {lead && (
        <p className="site-lead-type site-detail-head__lead" lang={lang}>
          {lead}
        </p>
      )}
      {children}
    </header>
  );
}
