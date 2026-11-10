"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

import { siteNavItems, siteSocialLinks } from "@constants/siteNavigation";
import { trackPixelEvent } from "@lib/pixel";

type MobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    // Lock body scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Focus close button on open
    closeBtnRef.current?.focus();

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Site Navigation"
      ref={dialogRef}
      className="fixed inset-0 z-50 flex flex-col bg-paper px-gutter py-4 text-ink overflow-y-auto"
    >
      <div className="flex items-center justify-between pb-4 border-b border-rule">
        <span className="site-note">Navigation</span>
        <button
          ref={closeBtnRef}
          type="button"
          onClick={onClose}
          className="site-note px-3 py-1.5 rounded border border-rule hover:border-rule-strong hover:text-ink transition-colors cursor-pointer"
          aria-label="Close menu"
        >
          Close [ESC]
        </button>
      </div>

      <nav className="flex flex-col py-8 gap-6" aria-label="Mobile Menu">
        {siteNavItems.map((item) => {
          const handleClick = () => {
            if (item.pixelEvent) {
              trackPixelEvent(item.pixelEvent);
            }
            onClose();
          };

          if (item.external) {
            return (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleClick}
                className="group flex items-baseline justify-between text-step-2 font-medium border-b border-rule pb-3 hover:text-signal transition-colors"
              >
                <span>{item.label}</span>
                <span className="site-note text-step-n1 group-hover:text-signal">
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
              className="group flex items-baseline justify-between text-step-2 font-medium border-b border-rule pb-3 hover:text-signal transition-colors"
            >
              <span>{item.label}</span>
              <span className="site-note text-step-n1 group-hover:text-signal">
                {item.num}
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-6 border-t border-rule flex flex-col gap-4">
        <Link
          href="/contact"
          onClick={() => {
            trackPixelEvent("ClickHeaderContact");
            onClose();
          }}
          className="inline-flex items-center justify-center rounded-full bg-ink px-6 py-3 text-step-0 font-medium text-paper hover:bg-white transition-colors"
        >
          Let&apos;s talk
        </Link>

        <div className="flex flex-wrap gap-x-6 gap-y-2 pt-2">
          {siteSocialLinks.map((social) => (
            <a
              key={social.href}
              href={social.href}
              target={social.external ? "_blank" : undefined}
              rel={social.external ? "noopener noreferrer" : undefined}
              className="site-note hover:text-ink transition-colors"
            >
              {social.label} {social.external ? "↗" : ""}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
