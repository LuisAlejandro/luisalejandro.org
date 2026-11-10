"use client";

import { useEffect, useRef } from "react";

const BANDS = 18;
const SAMPLES = 160;

/**
 * The hero background: a topographic contour map that rises under the pointer.
 * Hand-drawn on a 2D canvas — the reference uses WebGL for the same effect.
 */
export function HeroTerrain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let centreX = 0;
    let centreY = 0;
    let pointX = -1e4;
    let pointY = -1e4;
    let targetX = -1e4;
    let targetY = -1e4;
    let frame = 0;
    let visible = true;
    let start = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      // Cap DPR: beyond 2 the extra pixels are invisible and cost fill rate.
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.round(rect.width * dpr);
      height = Math.round(rect.height * dpr);
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
      // The peak sits off-centre, behind the headline, not on the grid axis.
      centreX = width * 0.6;
      centreY = height * 0.56;
      pointX = targetX;
      pointY = targetY;
    };

    /** Radius of band `k` at angle `a`, with the pointer raising the ground. */
    const radiusAt = (k: number, a: number, time: number) => {
      const base = height * 0.024 + k * height * 0.033;
      const wobble =
        1 +
        0.13 * Math.sin(a * 3 + time * 0.00016 + k * 0.15) +
        0.07 * Math.sin(a * 5 - time * 0.00011) +
        0.035 * Math.sin(a * 8 + k * 0.4);

      // Distance from this sample to the pointer, in device pixels.
      const x = centreX + Math.cos(a) * base * wobble;
      const y = centreY + Math.sin(a) * base * wobble * 0.48;
      const dx = x - pointX;
      const dy = y - pointY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const lift = Math.exp(-((distance / (height * 0.34)) ** 2));

      return base * wobble + lift * height * 0.06;
    };

    const draw = (time: number) => {
      if (!width || !height) return;
      ctx.clearRect(0, 0, width, height);

      const age = start === 0 ? 1 : Math.min(1, (time - start) / 1600);

      for (let k = 0; k < BANDS; k += 1) {
        const depth = k / (BANDS - 1);
        ctx.beginPath();
        for (let s = 0; s <= SAMPLES; s += 1) {
          const a = (s / SAMPLES) * Math.PI * 2;
          const r = radiusAt(k, a, time);
          const x = centreX + Math.cos(a) * r;
          const y = centreY + Math.sin(a) * r * 0.48;
          if (s === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        // Bands near the peak read brighter; the whole map fades in over 2s.
        ctx.strokeStyle = `rgba(237, 237, 231, ${(0.05 + depth * 0.22) * age})`;
        ctx.lineWidth = Math.max(1, dpr * (depth > 0.75 ? 1.15 : 1));
        ctx.stroke();
      }

      // One accent ring marks the raised ground under the pointer.
      if (pointX > -1000) {
        const near = Math.round(BANDS * 0.55);
        ctx.beginPath();
        for (let s = 0; s <= SAMPLES; s += 1) {
          const a = (s / SAMPLES) * Math.PI * 2;
          const r = radiusAt(near, a, time);
          const x = centreX + Math.cos(a) * r;
          const y = centreY + Math.sin(a) * r * 0.48;
          if (s === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(91, 124, 255, ${0.28 * age})`;
        ctx.stroke();
      }
    };

    const loop = (time: number) => {
      if (start === 0) start = time;
      pointX += (targetX - pointX) * 0.08;
      pointY += (targetY - pointY) * 0.08;
      draw(time);
      if (!prefersReducedMotion && visible) {
        frame = window.requestAnimationFrame(loop);
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetX = (event.clientX - rect.left) * dpr;
      targetY = (event.clientY - rect.top) * dpr;
    };

    const handlePointerLeave = () => {
      targetX = -1e4;
      targetY = -1e4;
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    canvas.parentElement?.addEventListener("pointermove", handlePointerMove);
    canvas.parentElement?.addEventListener("pointerleave", handlePointerLeave);

    const intersection = new IntersectionObserver(
      (entries) => {
        visible = entries.some((entry) => entry.isIntersecting);
        if (visible && !prefersReducedMotion) {
          window.cancelAnimationFrame(frame);
          start = 0;
          frame = window.requestAnimationFrame(loop);
        }
      },
      { threshold: 0 }
    );
    intersection.observe(canvas);

    // Paint-in is a CSS transition on the data attribute, so no state is needed.
    canvas.dataset.on = "true";
    frame = window.requestAnimationFrame(loop);

    return () => {
      window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersection.disconnect();
      canvas.parentElement?.removeEventListener(
        "pointermove",
        handlePointerMove
      );
      canvas.parentElement?.removeEventListener(
        "pointerleave",
        handlePointerLeave
      );
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="site-terrain" />;
}
