"use client";

import { useEffect, useRef, useState } from "react";

type HeroTypedProps = {
  /** Fixed first line, set at display size. */
  lead: string;
  /** Generated second line, set one type step below the first. */
  typed: string;
};

type Token = { word: string; id: number };

// Reference timeline, in ms from the moment the preloader is half lifted.
const LEAD_AT = 550;
const FILL_AT = 1350;
const TYPE_AT = 1600;
const WORD_MS = 500;
const FADE_MS = 1000;
const FADE_STAGGER = 80;

const EXPO_OUT = "cubic-bezier(0.16, 1, 0.3, 1)";
const EXPO_IN_OUT = "cubic-bezier(0.87, 0, 0.13, 1)";
const POWER2_IN_OUT = "cubic-bezier(0.45, 0, 0.55, 1)";
const SCRAMBLE = "01<>/_#*+=-xyz";

/**
 * Uneven typing rhythm, 30–120ms per word plus a beat after punctuation.
 * Derived from the words rather than Math.random so server and client agree.
 */
const gapAfter = (word: string, index: number) =>
  30 + ((index * 47 + word.length * 29) % 91) + (/[.,:]$/.test(word) ? 220 : 0);

/**
 * Milliseconds until the hero is half uncovered, read from the preloader's own
 * lift animation so both share one clock. Null means play nothing: reduced
 * motion, or the page is already visible, where hiding the copy to replay it
 * would flash.
 */
function introStart(): number | null {
  const lift = document
    .querySelector(".site-preloader")
    ?.getAnimations()
    .find((a) => (a as CSSAnimation).animationName === "site-lift");
  if (!lift || lift.playState === "finished") return null;
  const elapsed = Number(lift.currentTime ?? 0);
  return elapsed > 1350 ? null : 1450 - elapsed;
}

/**
 * The hero's opening, after the reference: accent guides and selection boxes
 * measure the copy, the first line rises out of a mask as an outline and fills
 * in, the second line is typed word by word behind a caret, the rest fades up,
 * and the measuring layer retracts and removes itself.
 */
export function HeroTyped({ lead, typed }: HeroTypedProps) {
  const words = typed.split(" ");
  const leadWords = lead.split(" ");
  const [shown, setShown] = useState(0);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // Reduced motion is handled in CSS: the sizer swaps in for the generated
    // line, so this effect never has to set state up front.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const title = titleRef.current;
    const hero = title?.closest<HTMLElement>(".site-hero");
    if (!title || !hero) return;

    let cancelled = false;
    let frame = 0;
    const timers: number[] = [];
    const animations: Animation[] = [];
    let layer: HTMLDivElement | null = null;

    const play = (
      target: Element,
      keyframes: Keyframe[],
      delay: number,
      duration: number,
      easing: string
    ) => {
      animations.push(
        target.animate(keyframes, { delay, duration, easing, fill: "both" })
      );
    };

    const typeFrom = (at: number) => {
      let time = at;
      words.forEach((word, index) => {
        timers.push(window.setTimeout(() => setShown(index + 1), time));
        time += gapAfter(word, index);
      });
    };

    document.fonts.ready.then(() => {
      if (cancelled) return;
      const start = introStart();
      if (start === null) {
        typeFrom(0);
        return;
      }

      // Lay one measuring box over each marked element, with guides along its
      // top, bottom and right edges.
      layer = document.createElement("div");
      layer.className = "site-bp";
      layer.setAttribute("aria-hidden", "true");
      const frameRect = hero.getBoundingClientRect();
      const rows = new Set<number>();
      const columns = new Set<number>();
      const boxes: HTMLElement[] = [];
      const labels: { el: HTMLElement; text: string }[] = [];

      hero.querySelectorAll<HTMLElement>("[data-bp]").forEach((el) => {
        const r = el.getBoundingClientRect();
        const box = document.createElement("div");
        box.className = "site-bp__box";
        box.style.cssText = `left:${r.left - frameRect.left}px;top:${r.top - frameRect.top}px;width:${r.width}px;height:${r.height}px`;
        const label = document.createElement("span");
        label.className = "site-bp__label site-note";
        box.append(label);
        layer!.append(box);
        boxes.push(box);
        labels.push({
          el: label,
          text: `${el.dataset.bp} · ${Math.round(r.width)}×${Math.round(r.height)}`,
        });
        rows.add(Math.round(r.top - frameRect.top));
        rows.add(Math.round(r.bottom - frameRect.top));
        columns.add(Math.round(r.right - frameRect.left));
      });

      const guide = (axis: "h" | "v", at: number) => {
        const line = document.createElement("span");
        line.className = `site-bp__guide site-bp__guide--${axis}`;
        line.style[axis === "h" ? "top" : "left"] = `${at}px`;
        layer!.append(line);
        return line;
      };
      const guidesH = [...rows].map((y) => guide("h", y));
      const guidesV = [...columns].map((x) => guide("v", x));
      hero.append(layer);

      // Lead words rise line by line: group them by their rendered row.
      const masks = [
        ...title.querySelectorAll<HTMLElement>(".site-intro-word"),
      ];
      const tops = [...new Set(masks.map((m) => m.offsetTop))];

      guidesH.forEach((g, i) =>
        play(
          g,
          [{ transform: "scaleX(0)" }, { transform: "scaleX(1)" }],
          start + i * 40,
          1000,
          EXPO_IN_OUT
        )
      );
      guidesV.forEach((g, i) =>
        play(
          g,
          [{ transform: "scaleY(0)" }, { transform: "scaleY(1)" }],
          start + 100 + i * 60,
          1000,
          EXPO_IN_OUT
        )
      );
      boxes.forEach((b, i) =>
        play(
          b,
          [{ opacity: 0 }, { opacity: 1 }],
          start + 350 + i * 70,
          300,
          "linear"
        )
      );
      masks.forEach((m) =>
        play(
          m.firstElementChild!,
          [{ transform: "translateY(110%)" }, { transform: "translateY(0)" }],
          start + LEAD_AT + tops.indexOf(m.offsetTop) * 80,
          1100,
          EXPO_OUT
        )
      );
      const human = title.querySelector(".site-hero__human")!;
      play(
        human,
        [{ "--site-fill": 0 }, { "--site-fill": 1 }],
        start + FILL_AT,
        700,
        POWER2_IN_OUT
      );

      // Typing, then the supporting copy fades up as the line settles.
      typeFrom(start + TYPE_AT);
      const typedFor =
        words.slice(0, -1).reduce((sum, w, i) => sum + gapAfter(w, i), 0) +
        WORD_MS;
      const fadeAt = start + TYPE_AT + typedFor - 600;
      // Everything that supports the title rises once the line is typed: the
      // notes, the intro, the spec strip, the actions and the topic pills.
      const fades = hero.querySelectorAll(
        ".site-hero__notes > p, .site-hero__intro, .site-page-intro, .site-spec, .site-hero__ctas, .site-pills"
      );
      fades.forEach((f, i) =>
        play(
          f,
          [
            { opacity: 0, transform: "translateY(16px)" },
            { opacity: 1, transform: "none" },
          ],
          fadeAt + i * FADE_STAGGER,
          FADE_MS,
          EXPO_OUT
        )
      );

      // Then the measuring layer retracts and goes.
      const exitAt = fadeAt + FADE_MS + (fades.length - 1) * FADE_STAGGER + 200;
      labels.forEach(({ el }, i) =>
        play(
          el,
          [{ opacity: 1 }, { opacity: 0 }],
          exitAt + i * 30,
          400,
          "linear"
        )
      );
      boxes.forEach((b, i) =>
        play(
          b,
          [{ opacity: 1 }, { opacity: 0 }],
          exitAt + 100 + i * 40,
          600,
          "linear"
        )
      );
      guidesH.forEach((g, i) =>
        play(
          g,
          [
            { transform: "scaleX(1)", transformOrigin: "right" },
            { transform: "scaleX(0)", transformOrigin: "right" },
          ],
          exitAt + 100 + i * 30,
          900,
          EXPO_IN_OUT
        )
      );
      guidesV.forEach((g) =>
        play(
          g,
          [
            { transform: "scaleY(1)", transformOrigin: "bottom" },
            { transform: "scaleY(0)", transformOrigin: "bottom" },
          ],
          exitAt + 100,
          900,
          EXPO_IN_OUT
        )
      );
      const lastGuide =
        exitAt + 100 + Math.max(0, guidesH.length - 1) * 30 + 900;
      timers.push(window.setTimeout(() => layer?.remove(), lastGuide + 50));

      // Labels decode: the real text advances behind four scrambled glyphs.
      const origin = performance.now();
      const decode = (now: number) => {
        let pending = false;
        labels.forEach(({ el, text }, i) => {
          const p = (now - origin - start - 400 - i * 70) / 500;
          if (p >= 1) {
            el.textContent = text;
            return;
          }
          pending = true;
          if (p < 0) return;
          const at = Math.floor(p * text.length);
          const noise = Array.from(
            { length: Math.min(4, text.length - at) },
            () => SCRAMBLE[(Math.random() * SCRAMBLE.length) | 0]
          ).join("");
          el.textContent = text.slice(0, at) + noise;
        });
        if (pending) frame = requestAnimationFrame(decode);
      };
      frame = requestAnimationFrame(decode);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      timers.forEach((t) => window.clearTimeout(t));
      animations.forEach((a) => a.cancel());
      layer?.remove();
    };
    // The copy is static per page; the intro runs once per mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const tokens: Token[] = words
    .slice(0, shown)
    .map((word, index) => ({ word, id: index }));
  const done = shown >= words.length;

  return (
    <h1 ref={titleRef} className="site-hero__title">
      <span className="sr-only">
        {lead} {typed}
      </span>
      <span
        aria-hidden="true"
        data-bp="h1.lead"
        className="site-display site-hero__human"
      >
        {leadWords.map((word, index) => (
          <span key={index}>
            <span className="site-intro-word">
              <span>{word}</span>
            </span>
            {index < leadWords.length - 1 ? " " : ""}
          </span>
        ))}
      </span>

      {/* The invisible sizer holds the full sentence from first paint, so the
          generated line never collapses the hero or shifts layout. */}
      <span
        aria-hidden="true"
        data-bp="h1.generated"
        className="site-h2 site-hero__machine grid"
      >
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
