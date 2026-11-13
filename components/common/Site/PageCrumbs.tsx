import Link from "next/link";
import { Fragment } from "react";

export type Crumb = { label: string; href?: string; lang?: string };

type PageCrumbsProps = {
  /** Trail after Home; the last crumb is the current page. */
  trail: Crumb[];
  /** The page's place in the site, e.g. "[Blog / 02]". */
  index: string;
};

/**
 * The opening of every inner page: the breadcrumb trail, then the index on
 * its own line. One component so the two never drift apart between pages.
 */
export function PageCrumbs({ trail, index }: PageCrumbsProps) {
  const crumbs: Crumb[] = [{ label: "Home", href: "/" }, ...trail];

  return (
    <>
      <nav aria-label="Breadcrumb" className="site-note site-crumbs">
        {crumbs.map((crumb, i) => {
          const current = i === crumbs.length - 1;
          return (
            <Fragment key={`${crumb.label}-${i}`}>
              {i > 0 && <span aria-hidden="true">/</span>}
              {current || !crumb.href ? (
                <span
                  className="text-ink"
                  aria-current={current ? "page" : undefined}
                  lang={crumb.lang}
                >
                  {crumb.label}
                </span>
              ) : (
                <Link href={crumb.href} className="site-link" lang={crumb.lang}>
                  {crumb.label}
                </Link>
              )}
            </Fragment>
          );
        })}
      </nav>
      <p className="site-note site-page-index">{index}</p>
    </>
  );
}
