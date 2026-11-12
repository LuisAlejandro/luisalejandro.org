"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

import { SiteButton } from "@components/common/Site/SiteButton";
import { SiteLink } from "@components/common/Site/SiteLink";
import { lockPageScroll } from "@components/common/Site/overlayLock";
import {
  contactAction,
  siteNavItems,
  siteSocialLinks,
} from "@constants/siteNavigation";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
};

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      // showModal gives focus trapping and Escape for free, and keeps the
      // overlay out of the fixed header's containing block.
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    return lockPageScroll();
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      aria-label="Site Navigation"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClose={onClose}
      className="site-menu"
    >
      <div data-lenis-prevent className="flex h-full flex-col">
        <div className="flex items-center justify-between border-b border-rule-strong pb-3">
          <span className="site-note text-ink">Navigation</span>
          <button
            type="button"
            onClick={onClose}
            className="site-tool site-tool--wide site-note"
            aria-label="Close menu"
          >
            Close
          </button>
        </div>

        <nav aria-label="Mobile Menu" className="flex flex-col py-8">
          <ul className="site-menu__list">
            {siteNavItems.map((item) => (
              <li key={item.href}>
                <SiteLink
                  href={item.href}
                  external={item.external}
                  pixelEvent={item.pixelEvent}
                  className="site-menu__link"
                  onNavigate={onClose}
                >
                  <span className="site-note">{item.num}</span>
                  <span>{item.label}</span>
                  {item.external && (
                    <span className="site-note ml-auto">↗</span>
                  )}
                </SiteLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-auto flex flex-col gap-4 border-t border-rule pt-6">
          <SiteButton
            href={contactAction.href}
            tracking={contactAction.pixelEvent}
            className="w-full"
          >
            {contactAction.label}
          </SiteButton>

          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {siteSocialLinks.map((social) => (
              <a
                key={social.href}
                href={social.href}
                target={social.external ? "_blank" : undefined}
                rel={social.external ? "noopener noreferrer" : undefined}
                className="site-note site-link"
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
