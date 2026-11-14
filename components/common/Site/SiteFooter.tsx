"use client";

import Link from "next/link";

import { openPalette } from "@components/common/Site/overlayLock";
import { SiteLink } from "@components/common/Site/SiteLink";
import { config } from "@constants/constants";
import { footerContent } from "@constants/homepageContent";
import { siteNavItems, siteSocialLinks } from "@constants/siteNavigation";
import { trackPixelEvent } from "@lib/pixel";

/**
 * Footer: a claim with an inline accent link, three link columns, the wordmark
 * set as large as the viewport allows, then the colophon row.
 */
export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  const handlePaletteClick = () => {
    openPalette();
  };

  return (
    <footer className="site-footer site-wrap">
      <div className="site-grid site-footer__top">
        <p className="site-footer__claim text-ink">
          {footerContent.claim}{" "}
          <Link
            href={footerContent.claimLink.href}
            onClick={() => trackPixelEvent("ClickHeaderContact")}
            className="site-link site-link--inline site-accent"
          >
            {footerContent.claimLink.label}
          </Link>
        </p>

        <div className="site-footer__col">
          <p className="site-note">Site</p>
          <ul>
            {siteNavItems.map((item) => (
              <li key={item.href}>
                <SiteLink
                  href={item.href}
                  external={item.external}
                  pixelEvent={item.pixelEvent}
                  className="site-link text-step-0 text-ink"
                  arrow={item.external}
                >
                  {item.label}
                </SiteLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="site-footer__col">
          <p className="site-note">Elsewhere</p>
          <ul>
            {siteSocialLinks.map((social) => (
              <li key={social.href}>
                <SiteLink
                  href={social.href}
                  external={social.external}
                  className="site-link text-step-0 text-ink"
                  arrow={social.external}
                >
                  {social.label}
                </SiteLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="site-footer__col">
          <p className="site-note">Contact</p>
          <ul>
            {footerContent.contactLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => trackPixelEvent("ClickHeaderContact")}
                  className="site-link text-step-0 text-ink"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={`mailto:${config.author.email}`}
                className="site-link text-step-0 text-ink"
              >
                Email
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="site-footer__sign relative">
        <p aria-hidden="true" className="site-footer__mark">
          {footerContent.wordmark}
        </p>
      </div>

      <div className="site-footer__bottom site-note">
        <p className="flex flex-wrap gap-x-4">
          <span>© {currentYear} Luis Alejandro</span>
          <span>Designed and built in Maracay</span>
        </p>

        <button
          type="button"
          onClick={handlePaletteClick}
          className="site-note cursor-pointer text-left hover:text-ink"
        >
          Press ⌘K for everything else
        </button>

        <nav aria-label="Document links" className="flex gap-4">
          <Link
            href={footerContent.markdownTwin.href}
            className="site-link hover:text-ink"
          >
            {footerContent.markdownTwin.label}
          </Link>
          <Link
            href="/blog/posts/feed.xml"
            className="site-link hover:text-ink"
          >
            RSS
          </Link>
        </nav>
      </div>
    </footer>
  );
}
