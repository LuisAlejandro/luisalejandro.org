import markdownToHtml from "@lib/markdownToHtml";
import type { PortfolioProject } from "@lib/portfolio";
import { Arrow } from "@components/common/Site/Arrow";
import { ProjectShots } from "@components/common/Site/ProjectShots";

const pad = (value: number) => String(value).padStart(2, "0");

/**
 * The project archive: dated rows, newest first, each row labelled with its
 * year. Each row opens in place, as the FAQs do, to the whole project: what
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
  // Numbered in archive order, newest first.
  const number = new Map(projects.map((p, i) => [p.slug, pad(i + 1)]));

  return (
    <ol className="site-entries">
      {projects.map((project) => {
        return (
          <li key={project.slug} data-reveal="up">
            <details id={project.slug} className="site-pentry" data-smooth>
              <summary className="site-entry">
                <span className="site-entry__n site-note">
                  /{number.get(project.slug)}
                </span>
                <span className="site-entry__date site-note">
                  {project.year}
                </span>
                <span className="site-entry__main">
                  <span className="site-entry__title">{project.name}</span>
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
                <ProjectShots
                  name={project.name}
                  images={project.images.hero}
                />
              </div>
            </details>
          </li>
        );
      })}
    </ol>
  );
}
