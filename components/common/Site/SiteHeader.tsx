"use client";

import { useState } from "react";
import Link from "next/link";

import { SkipToContentLink } from "@components/common/Layout/SkipToContentLink";
import { MobileMenu } from "@components/common/Site/MobileMenu";
import { siteNavItems } from "@constants/siteNavigation";
import { trackPixelEvent } from "@lib/pixel";

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handlePaletteClick = () => {
    window.dispatchEvent(new CustomEvent("site:open-palette"));
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-rule bg-paper/90 backdrop-blur-md">
      <SkipToContentLink />
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-gutter py-3.5">
        {/* Site mark */}
        <Link
          href="/"
          className="group flex items-baseline gap-2 font-site-mono text-step-n1 tracking-wider text-ink transition-colors hover:text-signal"
        >
          <span className="font-semibold text-ink group-hover:text-signal">
            LUIS ALEJANDRO
          </span>
          <span className="text-ink-muted">/</span>
          <span className="text-ink-muted hidden sm:inline">
            SOFTWARE ENGINEER
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav
          aria-label="Main Navigation"
          className="hidden md:flex items-center gap-6"
        >
          {siteNavItems.map((item) => {
            const handleClick = () => {
              if (item.pixelEvent) {
                trackPixelEvent(item.pixelEvent);
              }
            };

            if (item.external) {
              return (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleClick}
                  className="group flex items-baseline gap-1.5 text-step-n1 font-medium text-ink-muted hover:text-ink transition-colors"
                >
                  <span className="site-note text-[0.7rem] text-ink-muted group-hover:text-signal">
                    {item.num}
                  </span>
                  <span>{item.label}</span>
                  <span className="site-note text-[0.7rem] text-ink-muted group-hover:text-signal">
                    ↗
                  </span>
                </a>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={handleClick}
                className="group flex items-baseline gap-1.5 text-step-n1 font-medium text-ink-muted hover:text-ink transition-colors"
              >
                <span className="site-note text-[0.7rem] text-ink-muted group-hover:text-signal">
                  {item.num}
                </span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right side utilities: Palette trigger, Mobile trigger, CTA */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handlePaletteClick}
            aria-label="Open command palette (⌘K)"
            className="site-note flex items-center justify-center rounded border border-rule px-2 py-1 text-[0.75rem] text-ink-muted hover:border-rule-strong hover:text-ink transition-colors cursor-pointer"
          >
            ⌘K
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
            className="site-note md:hidden flex items-center justify-center rounded border border-rule px-2.5 py-1 text-[0.75rem] text-ink-muted hover:border-rule-strong hover:text-ink transition-colors cursor-pointer"
          >
            Menu
          </button>

          <Link
            href="/contact"
            onClick={() => trackPixelEvent("ClickHeaderContact")}
            className="inline-flex items-center justify-center rounded-full bg-ink px-4 py-1.5 text-step-n1 font-medium text-paper hover:bg-white transition-colors"
          >
            Let&apos;s talk
          </Link>
        </div>
      </div>

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </header>
  );
}
