"use client";

import { useEffect, useState } from "react";

type HeroTypedProps = {
  lead: string;
  typed: string;
};

export function HeroTyped({ lead, typed }: HeroTypedProps) {
  const [displayed, setDisplayed] = useState(typed);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    let index = 0;
    const interval = setInterval(() => {
      index += 1;
      setDisplayed(typed.slice(0, index));
      if (index >= typed.length) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 32);

    return () => {
      clearInterval(interval);
    };
  }, [typed]);

  return (
    <h1 className="text-step-4 sm:text-step-5 font-medium tracking-tight text-ink leading-[1.02] max-w-[18ch] sm:max-w-[20ch]">
      <span className="sr-only">
        {lead} {typed}
      </span>
      <span aria-hidden="true" className="block text-ink">
        {lead}
      </span>
      <span aria-hidden="true" className="block text-ink-muted mt-2">
        {displayed}
        <span
          className={`inline-block w-[3px] h-[0.85em] ml-1.5 align-baseline bg-signal ${
            isTyping ? "opacity-100" : "animate-pulse"
          }`}
        />
      </span>
    </h1>
  );
}
