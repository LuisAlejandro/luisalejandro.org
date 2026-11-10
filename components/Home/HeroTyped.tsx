"use client";

import { useEffect, useState } from "react";

type HeroTypedProps = {
  lead: string;
  typed: string;
};

export function HeroTyped({ lead, typed }: HeroTypedProps) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    // Reduced motion is handled in CSS (`motion-reduce:` swaps the sizer in for
    // the typed line), so this effect never has to set state up front.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let index = 0;
    const interval = setInterval(() => {
      index += 1;
      setDisplayed(typed.slice(0, index));
      if (index >= typed.length) {
        clearInterval(interval);
      }
    }, 32);

    return () => {
      clearInterval(interval);
    };
  }, [typed]);

  return (
    <h1 className="max-w-[18ch] text-step-4 font-medium leading-[1.02] tracking-tight text-ink sm:max-w-[20ch] sm:text-step-5">
      <span className="sr-only">
        {lead} {typed}
      </span>
      <span aria-hidden="true" className="block text-ink">
        {lead}
      </span>
      {/* The invisible sizer holds the full sentence's height from first paint,
          so typing never collapses the hero (and never shifts layout). */}
      <span aria-hidden="true" className="mt-2 grid">
        <span className="invisible col-start-1 row-start-1 text-ink-muted motion-reduce:visible">
          {typed}
        </span>
        <span className="col-start-1 row-start-1 text-ink-muted motion-reduce:hidden">
          {displayed}
          <span className="ml-1.5 inline-block h-[0.85em] w-[3px] translate-y-[0.1em] animate-pulse bg-signal" />
        </span>
      </span>
    </h1>
  );
}
