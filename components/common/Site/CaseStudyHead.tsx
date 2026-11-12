import type { ReactNode } from "react";
import Link from "next/link";

type CaseStudyHeadProps = {
  year: number;
  subtitle: string;
  title: string;
  description: ReactNode;
  team: string[];
  deliverables: string[];
  links: { text: string; url: string }[];
};

/** The dossier opening: breadcrumb, client, headline, lead, and project facts. */
export function CaseStudyHead({
  year,
  subtitle,
  title,
  description,
  team,
  deliverables,
  links,
}: CaseStudyHeadProps) {
  return (
    <section className="site-case-head site-wrap">
      <div className="site-kicker site-note">
        <nav aria-label="Breadcrumb">
          <Link href="/" className="site-link">
            Home
          </Link>{" "}
          /{" "}
          <Link href="/portfolio" className="site-link">
            Portfolio
          </Link>{" "}
          /{" "}
          <span className="text-ink" aria-current="page">
            Case study
          </span>
        </nav>
        <span>[{year}]</span>
      </div>

      <p className="site-case-eyebrow site-note">{subtitle}</p>
      <h1 className="site-case-title">{title}</h1>

      <div className="site-case-head__foot">
        <p className="site-lead-type site-case-lead">{description}</p>

        <dl className="site-case-facts">
          <div>
            <dt className="site-note">Year</dt>
            <dd>{year}</dd>
          </div>
          <div>
            <dt className="site-note">Team</dt>
            <dd>{team.join(", ")}</dd>
          </div>
          <div>
            <dt className="site-note">Deliverables</dt>
            <dd>{deliverables.join(", ")}</dd>
          </div>
          {links.length > 0 && (
            <div>
              <dt className="site-note">Links</dt>
              <dd>
                <span className="site-case-facts__links">
                  {links.map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      className="site-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.text}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  ))}
                </span>
              </dd>
            </div>
          )}
        </dl>
      </div>
    </section>
  );
}
