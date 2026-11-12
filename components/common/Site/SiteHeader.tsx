"use client";

import { openPalette } from "@components/common/Site/overlayLock";
import { useState } from "react";
import Link from "next/link";

import { SkipToContentLink } from "@components/common/Layout/SkipToContentLink";
import { MobileMenu } from "@components/common/Site/MobileMenu";
import { SiteButton } from "@components/common/Site/SiteButton";
import { SiteMark } from "@components/common/Site/SiteMark";
import { contactAction, siteNavItems } from "@constants/siteNavigation";
import { trackPixelEvent } from "@lib/pixel";

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handlePaletteClick = () => {
    openPalette();
  };

  return (
    <>
      <header className="site-header site-wrap">
        <SkipToContentLink />

        <Link
          href="/"
          className="site-brand"
          aria-label="Luis Alejandro — home"
        >
          <SiteMark replayOnHover />
          <span className="site-note text-ink">Luis Alejandro</span>
          <span className="site-note site-brand__role">
            / fullstack AI engineer
          </span>
        </Link>

        <nav aria-label="Main Navigation" className="site-nav">
          {siteNavItems.map((item) => {
            const handleClick = () => {
              if (item.pixelEvent) {
                trackPixelEvent(item.pixelEvent);
              }
            };

            const label = (
              <>
                <span className="site-note">{item.num}</span>
                <span className="site-nav__label" data-label={item.label}>
                  {item.label}
                </span>
              </>
            );

            if (item.external) {
              return (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleClick}
                  className="site-nav__link"
                >
                  {label}
                  <span className="site-note">↗</span>
                </a>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={handleClick}
                className="site-nav__link"
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="site-tools">
          <button
            type="button"
            onClick={handlePaletteClick}
            aria-label="Open command palette (⌘K)"
            className="site-tool site-tool--wide site-note"
          >
            ⌘K
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={mobileMenuOpen}
            className="site-tool site-tool--menu site-note"
          >
            Menu
          </button>

          <SiteButton
            href={contactAction.href}
            size="sm"
            tracking={contactAction.pixelEvent}
          >
            {contactAction.label}
          </SiteButton>
        </div>

        {/* Ruler + scroll progress: drawn by CSS scroll timelines, so the header
            needs no scroll listener and no client re-render. */}
        <div aria-hidden="true" className="site-header__rule">
          <span className="site-header__fill">
            <span className="site-header__tag" />
          </span>
        </div>
      </header>

      {/* Rendered outside <header>: a fixed-position overlay inside it would be
          clipped by the header's own stacking context. */}
      <MobileMenu
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
}
