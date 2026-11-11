"use client";

import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
} from "react";
import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@components/common/Site/Reveal";
import { SectionHeader } from "@components/common/Site/SectionHeader";
import { SiteButton } from "@components/common/Site/SiteButton";
import { WorkArtwork, hasArtwork } from "@components/Home/WorkArtwork";
import { ProjectList } from "@constants/constants";
import {
  sectionNotes,
  sectionTitles,
  workIntro,
} from "@constants/homepageContent";

const projects = ProjectList;
const COUNT = projects.length;
const pad = (value: number) => String(value).padStart(2, "0");

function subscribe(onChange: () => void) {
  const wide = window.matchMedia("(min-width: 768px)");
  const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
  wide.addEventListener("change", onChange);
  calm.addEventListener("change", onChange);
  return () => {
    wide.removeEventListener("change", onChange);
    calm.removeEventListener("change", onChange);
  };
}

/**
 * The stage is only pinned when there is room and motion is allowed. Outside
 * that it degrades to the same markup as a plain stacked list.
 */
function pinnedSnapshot() {
  return (
    window.matchMedia("(min-width: 768px)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * 02 — the signature piece: one stage held in place while the five projects
 * advance through it, with a running counter and a segment rail.
 */
export function WorkSection() {
  const pinned = useSyncExternalStore(subscribe, pinnedSnapshot, () => false);
  const rootRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!pinned) return;
    const root = rootRef.current;
    if (!root) return;

    let frame = 0;

    const read = () => {
      frame = 0;
      const rect = root.getBoundingClientRect();
      const span = rect.height - window.innerHeight;
      if (span <= 0) return;
      const progress = Math.min(1, Math.max(0, -rect.top / span));
      const scaled = progress * COUNT;
      const index = Math.min(COUNT - 1, Math.floor(scaled));
      // Each project's own story runs over the first 70% of its slot, then
      // holds its finished state while the next one crossfades in.
      const local = Math.min(1, Math.max(0, (scaled - index) / 0.7));
      root.style.setProperty("--art-progress", local.toFixed(3));
      setCurrent(index);
    };

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(read);
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      root.style.removeProperty("--art-progress");
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [pinned]);

  return (
    <section className="site-section site-wrap">
      <SectionHeader
        num="02"
        label={sectionTitles.work}
        note={sectionNotes.work}
        id="work"
      />

      <Reveal>
        <p className="site-lead-type text-ink mb-10 max-w-[46ch]">
          {workIntro}
        </p>
      </Reveal>

      <div
        ref={rootRef}
        className="site-ws"
        data-pinned={pinned}
        style={{ "--site-ws-count": COUNT } as CSSProperties}
      >
        <div className="site-ws__stage">
          <div className="site-ws__count" aria-hidden="true">
            <span>{pad(current + 1)}</span>
            <span className="site-ws__of">/{pad(COUNT)}</span>
          </div>

          <div className="site-ws__stages site-note" aria-hidden="true">
            <ol>
              {projects.map((project, index) => (
                <li key={project.visit} data-on={index === current}>
                  <span>{pad(index + 1)}</span>
                  <i />
                </li>
              ))}
            </ol>
          </div>

          {projects.map((project, index) => {
            const hidden = pinned && index !== current;
            return (
              <div
                key={project.visit}
                className="site-ws__item"
                data-current={index === current}
                inert={hidden}
              >
                <div className="site-ws__art">
                  <Link
                    href={project.visit}
                    className="absolute inset-0 block"
                    tabIndex={-1}
                    aria-hidden="true"
                  >
                    {hasArtwork(project.visit) ? (
                      <WorkArtwork slug={project.visit} />
                    ) : (
                      <Image
                        src={project.image}
                        alt=""
                        fill
                        sizes="(max-width: 1024px) 100vw, 62vw"
                        className="object-cover"
                      />
                    )}
                  </Link>
                </div>

                <h3 className="site-ws__title">
                  <Link href={project.visit} className="site-link">
                    {project.title}
                  </Link>
                </h3>

                <div className="site-ws__info">
                  <div className="site-ws__meta site-note">
                    <span>
                      {pad(index + 1)} / {pad(COUNT)}
                    </span>
                    <span>Case study</span>
                  </div>
                  <p className="site-ws__summary">{project.description}</p>
                  <p className="site-ws__client site-note">
                    {project.tags.join(" · ")}
                  </p>
                </div>

                <div className="site-ws__actions">
                  <SiteButton href={project.visit} variant="ghost">
                    Read the case study
                  </SiteButton>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
