"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

import { SiteButton } from "@components/common/Site/SiteButton";
import { lockPageScroll } from "@components/common/Site/overlayLock";
import {
  contactAction,
  siteNavItems,
  siteSocialLinks,
} from "@constants/siteNavigation";
import { trackPixelEvent } from "@lib/pixel";

type MobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      // showModal gives focus trapping and Escape for free, and keeps the
      // overlay out of the sticky header's backdrop-filter containing block.
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    return lockPageScroll();
  }, [isOpen]);

  return (
    <dialog
      ref={dialogRef}
      aria-label="Site Navigation"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClose={onClose}
      className="m-0 h-full max-h-none w-full max-w-none bg-paper p-0 text-ink backdrop:bg-black/70"
    >
      <div
        data-lenis-prevent
        className="flex h-full flex-col overflow-y-auto px-gutter py-4"
      >
        <div className="flex items-center justify-between border-b border-rule pb-4">
          <span className="site-note">Navigation</span>
          <button
            type="button"
            onClick={onClose}
            className="site-note cursor-pointer rounded border border-rule px-3 py-1.5 hover:border-rule-strong hover:text-ink"
            aria-label="Close menu"
          >
            Close [ESC]
          </button>
        </div>

        <nav aria-label="Mobile Menu" className="flex flex-col gap-6 py-8">
          {siteNavItems.map((item) => {
            const handleClick = () => {
              if (item.pixelEvent) trackPixelEvent(item.pixelEvent);
              onClose();
            };

            const className =
              "group flex items-baseline justify-between border-b border-rule pb-3 text-step-2 font-medium hover:text-signal";

            if (item.external) {
              return (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleClick}
                  className={className}
                >
                  <span>{item.label}</span>
                  <span className="site-note group-hover:text-signal">
                    {item.num} ↗
                  </span>
                </a>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={handleClick}
                className={className}
              >
                <span>{item.label}</span>
                <span className="site-note group-hover:text-signal">
                  {item.num}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto flex flex-col gap-4 border-t border-rule pt-6">
          <SiteButton
            href={contactAction.href}
            size="lg"
            tracking={contactAction.pixelEvent}
            className="w-full"
          >
            {contactAction.label}
          </SiteButton>

          <div className="flex flex-wrap gap-x-6 gap-y-2 pt-2">
            {siteSocialLinks.map((social) => (
              <a
                key={social.href}
                href={social.href}
                target={social.external ? "_blank" : undefined}
                rel={social.external ? "noopener noreferrer" : undefined}
                className="site-note hover:text-ink"
              >
                {social.label} {social.external ? "↗" : ""}
              </a>
            ))}
          </div>
        </div>
      </div>
    </dialog>
  );
}
