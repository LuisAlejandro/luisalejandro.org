"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { Arrow } from "@components/common/Site/Arrow";
import { pad } from "@lib/format";

// 8x8 Bayer matrix for ordered dithering.
const BAYER = [
  0, 32, 8, 40, 2, 34, 10, 42, 48, 16, 56, 24, 50, 18, 58, 26, 12, 44, 4, 36,
  14, 46, 6, 38, 60, 28, 52, 20, 62, 30, 54, 22, 3, 35, 11, 43, 1, 33, 9, 41,
  51, 19, 59, 27, 49, 17, 57, 25, 15, 47, 7, 39, 13, 45, 5, 37, 63, 31, 55, 23,
  61, 29, 53, 21,
];
// Ghosted white: a lifted, flattened tone curve dithered to two near-whites.
const DARK = [198, 198, 189];
const LIGHT = [250, 250, 247];
/** CSS px per dither dot: finer where the frame is small. */
const dotSize = (width: number) => (width < 1024 ? 1.5 : 2);

/** Paints `img` (as object-fit: cover, top) into `canvas` as a two-tone dither. */
function dither(canvas: HTMLCanvasElement, img: HTMLImageElement) {
  const dot = dotSize(canvas.clientWidth);
  const w = Math.round(canvas.clientWidth / dot);
  const h = Math.round(canvas.clientHeight / dot);
  if (!w || !h || !img.naturalWidth) return;
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return;
  const scale = Math.max(w / img.naturalWidth, h / img.naturalHeight);
  const dw = img.naturalWidth * scale;
  ctx.drawImage(img, (w - dw) / 2, 0, dw, img.naturalHeight * scale);
  const data = ctx.getImageData(0, 0, w, h);
  const px = data.data;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4;
      const l =
        (0.2126 * px[i] + 0.7152 * px[i + 1] + 0.0722 * px[i + 2]) / 255;
      const tone = Math.pow(l, 0.6) * 0.65 + 0.35;
      const c = tone > (BAYER[(y & 7) * 8 + (x & 7)] + 0.5) / 64 ? LIGHT : DARK;
      px[i] = c[0];
      px[i + 1] = c[1];
      px[i + 2] = c[2];
      px[i + 3] = 255;
    }
  }
  ctx.putImageData(data, 0, 0);
  canvas.dataset.ready = "";
}

function Shot({ src, alt }: { src: string; alt: string }) {
  const figure = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  // Re-dither whenever the frame gets a size: first open, resize, image load.
  useEffect(() => {
    const el = figure.current;
    if (!el) return;
    const paint = () => {
      const img = el.querySelector("img");
      if (img?.complete && canvas.current) dither(canvas.current, img);
    };
    const observer = new ResizeObserver(paint);
    observer.observe(el);
    el.addEventListener("load", paint, true);
    return () => {
      observer.disconnect();
      el.removeEventListener("load", paint, true);
    };
  }, []);

  return (
    <figure ref={figure} className="site-project-shot">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 1023px) 90vw, 40vw"
        loading="lazy"
      />
      <canvas ref={canvas} aria-hidden="true" />
    </figure>
  );
}

/**
 * A project's screenshots as one fixed 16:10 frame: a scroll-snap filmstrip,
 * so the row's height no longer grows with the number of images. Frames are
 * ghosted to a white dither and wipe back to the real image on hover.
 */
export function ProjectShots({
  name,
  images,
}: {
  name: string;
  images: string[];
}) {
  const track = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const count = images.length;

  const go = (step: number) => {
    const el = track.current;
    if (!el) return;
    const next = (current + step + count) % count;
    el.scrollTo({ left: next * el.clientWidth, behavior: "smooth" });
  };

  return (
    <div className="site-pentry__shots">
      <div
        ref={track}
        className="site-pentry__track"
        tabIndex={count > 1 ? 0 : undefined}
        aria-label={count > 1 ? `${name} screenshots` : undefined}
        onScroll={(e) =>
          setCurrent(
            Math.round(e.currentTarget.scrollLeft / e.currentTarget.clientWidth)
          )
        }
      >
        {images.map((src, index) => (
          <Shot key={src} src={src} alt={`${name}: screenshot ${index + 1}`} />
        ))}
      </div>
      {count > 1 && (
        <div className="site-pentry__controls">
          <span className="site-note" aria-live="polite">
            {pad(current + 1)} / {pad(count)}
          </span>
          <span className="site-pentry__ticks" aria-hidden="true">
            {images.map((src, index) => (
              <span key={src} data-on={index === current || undefined} />
            ))}
          </span>
          <span className="site-pentry__nav">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous screenshot"
            >
              <Arrow kind="internal" size="sm" className="site-pentry__prev" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next screenshot"
            >
              <Arrow kind="internal" size="sm" />
            </button>
          </span>
        </div>
      )}
    </div>
  );
}
