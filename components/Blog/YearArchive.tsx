import Link from "next/link";

import {
  entryNumber,
  formatPostDate,
  groupByYear,
  type BlogRow,
} from "@lib/blogArchive";

/** imgix renders on demand; ask for the size actually drawn. */
export const coverVariant = (url: string | undefined, width: number) =>
  !url
    ? ""
    : url.includes("imgix.cosmicjs.com")
      ? `${url.split("?")[0]}?w=${width}&auto=format,compress&q=70`
      : url;

/**
 * The archive: one outlined year per group, then dated rows on the 12-column
 * grid. The cover follows the pointer on devices that can hover; touch screens
 * never load it.
 */
export function YearArchive({ rows }: { rows: BlogRow[] }) {
  if (rows.length === 0) {
    return <p className="site-note">No published posts yet.</p>;
  }

  return (
    <div className="site-years">
      {groupByYear(rows).map((group) => (
        <div key={group.year} className="site-year">
          <h3 className="site-year__head">
            <span className="site-year__n site-outline">{group.year}</span>
            <span className="site-note">
              {group.rows.length}{" "}
              {group.rows.length === 1 ? "entry" : "entries"}
            </span>
          </h3>
          <ol className="site-entries">
            {group.rows.map((row) => (
              <li key={row.slug} data-reveal="up">
                <Link href={`/blog/posts/${row.slug}`} className="site-entry">
                  <span className="site-entry__n site-note">
                    {entryNumber(row.number)}
                  </span>
                  <time
                    dateTime={row.date}
                    className="site-entry__date site-note"
                  >
                    {formatPostDate(row.date)}
                  </time>
                  <span className="site-entry__main" lang="es">
                    <span className="site-entry__title">{row.title}</span>
                    {row.teaser && (
                      <span className="site-entry__desc">{row.teaser}</span>
                    )}
                  </span>
                  <span className="site-entry__meta site-note">
                    {row.category && (
                      <span lang="es">{row.category.title}</span>
                    )}
                    <span>{row.minutes} min</span>
                  </span>
                  <span className="site-entry__arrow" aria-hidden="true">
                    →
                  </span>
                  {row.cover && (
                    <span className="site-entry__thumb" aria-hidden="true">
                      <img
                        src={row.cover}
                        alt=""
                        loading="lazy"
                        decoding="async"
                      />
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ol>
        </div>
      ))}
    </div>
  );
}
