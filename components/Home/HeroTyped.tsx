"use client";

import { useEffect, useRef, useState } from "react";

type HeroTypedProps = {
  /** Fixed first line, set at display size. */
  lead: string;
  /** Generated second line, set one type step below the first. */
  typed: string;
};

type Token = { word: string; id: number };

const WORD_MS = 130;

/**
 * Reference behaviour: the second line is generated word by word, each token
 * blurring in, with a caret that blinks four times and then rests.
 */
export function HeroTyped({ lead, typed }: HeroTypedProps) {
  const words = typed.split(" ");
  const [shown, setShown] = useState(0);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    // Reduced motion is handled in CSS: the sizer swaps in for the generated
    // line, so this effect never has to set state up front.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let index = 0;
    const tick = () => {
      index += 1;
      setShown(index);
      if (index < words.length) {
        timerRef.current = window.setTimeout(tick, WORD_MS);
      }
    };

    timerRef.current = window.setTimeout(tick, 420);

    return () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, [words.length]);

  const tokens: Token[] = words
    .slice(0, shown)
    .map((word, index) => ({ word, id: index }));
  const done = shown >= words.length;

  return (
    <h1 className="site-hero__title">
      <span className="sr-only">
        {lead} {typed}
      </span>
      <span aria-hidden="true" className="site-display site-hero__human">
        {lead}
      </span>

      {/* The invisible sizer holds the full sentence from first paint, so the
          generated line never collapses the hero or shifts layout. */}
      <span aria-hidden="true" className="site-h2 site-hero__machine grid">
        <span className="invisible col-start-1 row-start-1 motion-reduce:visible">
          {typed}
        </span>
        <span className="col-start-1 row-start-1 motion-reduce:hidden">
          {tokens.map((token) => (
            <span key={token.id} className="site-gen-word">
              {token.word}
              {token.id < words.length - 1 ? " " : ""}
            </span>
          ))}
          <span className="site-gen-caret" data-idle={done} />
        </span>
      </span>
    </h1>
  );
}
