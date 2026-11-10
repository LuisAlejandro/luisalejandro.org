"use client";

import Link from "next/link";

import { siteNavItems, siteSocialLinks } from "@constants/siteNavigation";
import { trackPixelEvent } from "@lib/pixel";

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  const handlePaletteClick = () => {
    window.dispatchEvent(new CustomEvent("site:open-palette"));
  };

  return (
    <footer className="w-full border-t border-rule bg-paper text-ink">
      <div className="mx-auto max-w-[1440px] px-gutter py-16 lg:py-24">
        {/* Top callout */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8 pb-12 border-b border-rule">
          <div className="max-w-xl">
            <span className="site-note mb-2 block">Next steps</span>
            <h2 className="text-step-3 font-medium tracking-tight text-ink">
              Got a system to build or scale?
            </h2>
          </div>
          <Link
            href="/contact"
            onClick={() => trackPixelEvent("ClickHeaderContact")}
            className="inline-flex items-center gap-2 text-step-1 font-medium text-ink hover:text-signal transition-colors group"
          >
            <span>Let&apos;s talk</span>
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>

        {/* Links grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {/* Site column */}
          <div>
            <h3 className="site-note mb-4 block">Site</h3>
            <ul className="flex flex-col gap-2.5">
              {siteNavItems.map((item) => {
                const handleClick = () => {
                  if (item.pixelEvent) {
                    trackPixelEvent(item.pixelEvent);
                  }
                };

                if (item.external) {
                  return (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={handleClick}
                        className="text-step-n1 text-ink-muted hover:text-ink transition-colors inline-flex items-center gap-1"
                      >
                        <span>{item.label}</span>
                        <span className="site-note text-[0.65rem]">↗</span>
                      </a>
                    </li>
                  );
                }

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={handleClick}
                      className="text-step-n1 text-ink-muted hover:text-ink transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Elsewhere column */}
          <div>
            <h3 className="site-note mb-4 block">Elsewhere</h3>
            <ul className="flex flex-col gap-2.5">
              {siteSocialLinks.map((social) => (
                <li key={social.href}>
                  <a
                    href={social.href}
                    target={social.external ? "_blank" : undefined}
                    rel={social.external ? "noopener noreferrer" : undefined}
                    className="text-step-n1 text-ink-muted hover:text-ink transition-colors inline-flex items-center gap-1"
                  >
                    <span>{social.label}</span>
                    {social.external && (
                      <span className="site-note text-[0.65rem]">↗</span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom meta row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-8 border-t border-rule font-site-mono text-step-n1 text-ink-muted">
          <div>
            <span>© {currentYear} LUIS ALEJANDRO</span>
            <span className="mx-2">·</span>
            <span>DESIGNED AND BUILT IN MARACAY</span>
          </div>
          <div>
            <button
              type="button"
              onClick={handlePaletteClick}
              className="site-note hover:text-ink transition-colors cursor-pointer text-left"
            >
              PRESS ⌘K FOR PALETTE
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
