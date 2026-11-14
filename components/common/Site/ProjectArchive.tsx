import Image from "next/image";

import markdownToHtml from "@lib/markdownToHtml";
import type { PortfolioProject } from "@lib/portfolio";
import { Arrow } from "@components/common/Site/Arrow";

const pad = (value: number) => String(value).padStart(2, "0");

/** Projects grouped by year, newest first; order within a year is kept. */
function byYear(projects: PortfolioProject[]) {
  const groups = new Map<number, PortfolioProject[]>();
  for (const project of projects) {
    groups.set(project.year, [...(groups.get(project.year) ?? []), project]);
  }
  return [...groups.entries()].map(([year, rows]) => ({ year, rows }));
}

/**
 * The project archive, set like the blog's: an outlined year, then dated
 * rows. Each row opens in place, as the FAQs do, to the whole project: what
 * was built, the stack, the sources and the screenshots. Small projects get a
 * row, not a page; each row has its own anchor so it can be linked to.
 */
export async function ProjectArchive({
  projects,
}: {
  projects: PortfolioProject[];
}) {
  const bodies = await Promise.all(
    projects.map((project) => markdownToHtml(project.description))
  );
  const html = new Map(projects.map((p, i) => [p.slug, bodies[i]]));
  // Numbered in archive order, newest first, across the year groups.
  const number = new Map(projects.map((p, i) => [p.slug, pad(i + 1)]));

  return (
    <div className="site-years">
      {byYear(projects).map((group) => (
        <div key={group.year} className="site-year">
          <h3 className="site-year__head">
            <span className="site-year__n site-outline">{group.year}</span>
            <span className="site-note">
              {group.rows.length}{" "}
              {group.rows.length === 1 ? "project" : "projects"}
            </span>
          </h3>
          <ol className="site-entries">
            {group.rows.map((project) => {
              return (
                <li key={project.slug} data-reveal="up">
                  <details
                    id={project.slug}
                    className="site-pentry"
                    data-smooth
                  >
                    <summary className="site-entry">
                      <span className="site-entry__n site-note">
                        /{number.get(project.slug)}
                      </span>
                      <span className="site-entry__date site-note">
                        {project.year}
                      </span>
                      <span className="site-entry__main">
                        <span className="site-entry__title">
                          {project.name}
                        </span>
                        <span className="site-entry__desc">
                          {project.shortDescription}
                        </span>
                      </span>
                      <span className="site-entry__meta site-note">
                        {project.tags.slice(0, 3).map((tag) => (
                          <span key={tag}>{tag}</span>
                        ))}
                      </span>
                      <span
                        aria-hidden="true"
                        className="site-entry__arrow site-faq-list__icon"
                      />
                    </summary>

                    <div className="site-pentry__body">
                      <div className="site-pentry__text">
                        <div
                          className="site-prose"
                          dangerouslySetInnerHTML={{
                            __html: html.get(project.slug) ?? "",
                          }}
                        />
                        <ul
                          className="site-project-tags"
                          aria-label="Technologies"
                          role="list"
                        >
                          {project.tags.map((tag) => (
                            <li key={tag} className="site-pill">
                              {tag}
                            </li>
                          ))}
                        </ul>
                        {project.sources.length > 0 && (
                          <ul className="site-pentry__sources" role="list">
                            {project.sources.map((source) => (
                              <li key={source.url}>
                                <a
                                  href={source.url}
                                  className="site-link"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {source.name}
                                  <span className="site-note">
                                    {source.url.includes("web.archive.org")
                                      ? "Archived"
                                      : "External"}{" "}
                                    <Arrow kind="external" size="sm" />
                                    <span className="sr-only">
                                      {" "}
                                      (opens in a new tab)
                                    </span>
                                  </span>
                                </a>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                      <div className="site-pentry__shots">
                        {project.images.hero.map((src, index) => (
                          <figure key={src} className="site-project-shot">
                            <Image
                              src={src}
                              alt={`${project.name}: screenshot ${index + 1}`}
                              fill
                              sizes="(max-width: 1023px) 90vw, 40vw"
                              loading="lazy"
                            />
                          </figure>
                        ))}
                      </div>
                    </div>
                  </details>
                </li>
              );
            })}
          </ol>
        </div>
      ))}
    </div>
  );
}
