"use client";

import { useEffect, useRef } from "react";

/** Set around the rings, outermost first. Written for this site. */
const GO_SOURCE = `package main

import (
	"context"
	"log"
	"net/http"
	"time"
)

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/prompt", handlePrompt)
	log.Fatal(http.ListenAndServe(":8080", mux))
}

func handlePrompt(w http.ResponseWriter, r *http.Request) {
	ctx, cancel := context.WithTimeout(r.Context(), 30*time.Second)
	defer cancel()

	plan, err := agent.Plan(ctx, r.FormValue("prompt"))
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadGateway)
		return
	}

	build(ctx, plan)
	test(ctx, plan)
	deploy(ctx, plan)
}`;

const TEXT = GO_SOURCE.replace(/\s+/g, " ") + "  ";
const INK = "#0e0e0d";
const BASE_GLYPH = 15; // CSS px, outermost ring
const FRAME_MS = 1000 / 30; // the drift is slow; 30fps is plenty

type Ring = {
  radius: number;
  scale: number;
  phase: number;
  speed: number;
  glyphs: Uint16Array;
  noise: Float32Array;
  rate: Float32Array;
};

const hash = (a: number, b: number) => {
  const x = Math.sin(a * 127.1 + b * 311.7) * 43758.5453;
  return x - Math.floor(x);
};

/**
 * Hero background: a vortex of Go source set in mono along concentric rings,
 * ink on paper. Rings turn faster toward the centre, letters drop out and
 * scramble back, the centre leans toward the pointer, and the field zooms in
 * as the hero scrolls away.
 */
export function HeroVortex() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // The atlas is built from the unique characters, once per resize.
    const chars = Array.from(new Set(TEXT.split("")));
    const indexOf = new Map(chars.map((c, i) => [c, i]));
    const atlas = document.createElement("canvas");
    const dots = document.createElement("canvas");
    let cellW = 0;
    let cellH = 0;

    let rings: Ring[] = [];
    let width = 0;
    let height = 0;
    let dpr = 1;
    let baseX = 0;
    let baseY = 0;
    let centreX = 0;
    let centreY = 0;
    let targetX = 0;
    let targetY = 0;
    let zoom = 1;
    let frame = 0;
    let last = 0;
    let visible = true;
    let cancelled = false;

    const buildAtlas = () => {
      const family = getComputedStyle(canvas).fontFamily;
      const size = BASE_GLYPH * dpr;
      const font = `400 ${size}px ${family}`;
      const a = atlas.getContext("2d");
      if (!a) return;
      a.font = font;
      cellW = Math.ceil(a.measureText("M").width) + 2;
      cellH = Math.ceil(size * 1.3);
      atlas.width = cellW * chars.length;
      atlas.height = cellH;
      a.font = font;
      a.fillStyle = INK;
      a.textAlign = "center";
      a.textBaseline = "middle";
      chars.forEach((c, i) => a.fillText(c, i * cellW + cellW / 2, cellH / 2));
    };

    const buildRings = () => {
      rings = [];
      const reach = Math.hypot(
        Math.max(baseX, width - baseX),
        Math.max(baseY, height - baseY)
      );
      let radius = 46 * dpr;
      let cursor = 0;
      let k = 0;
      while (radius < reach + 40 * dpr) {
        // Glyphs grow outward, from about 7px at the eye to 15px at the rim.
        const scale = 0.55 + 0.45 * Math.min(1, radius / (520 * dpr));
        const advance = (cellW - 2) * scale * 1.05;
        const count = Math.max(6, Math.floor((Math.PI * 2 * radius) / advance));
        const glyphs = new Uint16Array(count);
        const noise = new Float32Array(count);
        const rate = new Float32Array(count);
        for (let i = 0; i < count; i += 1) {
          glyphs[i] = indexOf.get(TEXT[(cursor + i) % TEXT.length]) ?? 0;
          noise[i] = hash(k, i);
          rate[i] = 0.00002 + hash(i, k) * 0.00005;
        }
        cursor = (cursor + count) % TEXT.length;
        rings.push({
          radius,
          scale,
          phase: hash(k, 7) * Math.PI * 2,
          // Inner rings turn faster, which is what reads as a vortex.
          speed: 0.00018 * Math.min(1, (90 * dpr) / radius + 0.12),
          glyphs,
          noise,
          rate,
        });
        radius += cellH * scale * 2.3;
        k += 1;
      }

      // Dotted guide rings between the text rings, drawn once with margin so
      // the pointer lean never exposes an edge.
      const pad = 0.2;
      dots.width = Math.round(width * (1 + pad * 2));
      dots.height = Math.round(height * (1 + pad * 2));
      const d = dots.getContext("2d");
      if (!d) return;
      d.fillStyle = INK;
      const ox = width * pad;
      const oy = height * pad;
      for (let i = 0; i < rings.length - 1; i += 1) {
        const r = (rings[i].radius + rings[i + 1].radius) / 2;
        const step = 9 * dpr;
        const n = Math.floor((Math.PI * 2 * r) / step);
        d.globalAlpha = 0.14;
        for (let j = 0; j < n; j += 1) {
          const a = (j / n) * Math.PI * 2;
          d.fillRect(
            ox + baseX + Math.cos(a) * r,
            oy + baseY + Math.sin(a) * r,
            dpr,
            dpr
          );
        }
      }
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = Math.round(rect.width * dpr);
      height = Math.round(rect.height * dpr);
      if (!width || !height) return;
      canvas.width = width;
      canvas.height = height;
      // The eye sits right of centre, clear of the headline's first words.
      baseX = width * 0.7;
      baseY = height * 0.46;
      centreX = targetX = baseX;
      centreY = targetY = baseY;
      buildAtlas();
      buildRings();
    };

    const draw = (time: number) => {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, width, height);

      // Guide dots, scaled with the zoom around the moving centre.
      const pad = 0.2;
      ctx.globalAlpha = 1;
      ctx.setTransform(
        zoom,
        0,
        0,
        zoom,
        centreX - (baseX + width * pad) * zoom,
        centreY - (baseY + height * pad) * zoom
      );
      ctx.drawImage(dots, 0, 0);

      const cw = cellW;
      const ch = cellH;
      for (let k = 0; k < rings.length; k += 1) {
        const ring = rings[k];
        const r = ring.radius * zoom;
        const s = ring.scale * zoom;
        const count = ring.glyphs.length;
        const turn = ring.phase + time * ring.speed;
        // The eye fades out so the centre reads as depth, not a smudge.
        const ringAlpha = 0.24 * Math.min(1, ring.radius / (140 * dpr));
        for (let i = 0; i < count; i += 1) {
          const a = turn + (i / count) * Math.PI * 2;
          const x = centreX + Math.cos(a) * r;
          const y = centreY + Math.sin(a) * r;
          if (x < -ch || y < -ch || x > width + ch || y > height + ch) continue;

          // Each letter spends a slice of its cycle gone, and a shorter slice
          // scrambled, before it settles back.
          const u = (ring.noise[i] + time * ring.rate[i]) % 1;
          if (u < 0.08) continue;
          let glyph = ring.glyphs[i];
          let alpha = ringAlpha;
          if (u < 0.12) {
            glyph = Math.floor(hash(i, Math.floor(time / 90)) * chars.length);
            alpha *= 0.6;
          }

          const rot = a + Math.PI / 2;
          const cos = Math.cos(rot) * s;
          const sin = Math.sin(rot) * s;
          ctx.globalAlpha = alpha;
          ctx.setTransform(cos, sin, -sin, cos, x, y);
          ctx.drawImage(atlas, glyph * cw, 0, cw, ch, -cw / 2, -ch / 2, cw, ch);
        }
      }
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.globalAlpha = 1;
    };

    const loop = (time: number) => {
      frame = 0;
      if (time - last >= FRAME_MS) {
        last = time;
        centreX += (targetX - centreX) * 0.08;
        centreY += (targetY - centreY) * 0.08;
        draw(time);
      }
      if (visible && !reduced) frame = window.requestAnimationFrame(loop);
    };

    const start = () => {
      if (!frame) frame = window.requestAnimationFrame(loop);
    };

    const host = canvas.parentElement;
    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const px = (event.clientX - rect.left) * dpr;
      const py = (event.clientY - rect.top) * dpr;
      // Lean, do not follow: the eye moves a tenth of the way to the pointer.
      targetX = baseX + (px - baseX) * 0.1;
      targetY = baseY + (py - baseY) * 0.1;
    };
    const onPointerLeave = () => {
      targetX = baseX;
      targetY = baseY;
    };
    const onScroll = () => {
      const rect = canvas.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, -rect.top / rect.height));
      zoom = 1 + progress * 0.6;
      if (reduced) draw(performance.now());
    };

    const resizeObserver = new ResizeObserver(() => {
      resize();
      draw(performance.now());
    });
    const intersection = new IntersectionObserver((entries) => {
      visible = entries.some((entry) => entry.isIntersecting);
      if (visible && !reduced) start();
    });

    // Glyph metrics need the real mono face, not its fallback.
    document.fonts.ready.then(() => {
      if (cancelled) return;
      resize();
      draw(performance.now());
      canvas.dataset.on = "true";
      resizeObserver.observe(canvas);
      intersection.observe(canvas);
      host?.addEventListener("pointermove", onPointerMove);
      host?.addEventListener("pointerleave", onPointerLeave);
      window.addEventListener("scroll", onScroll, { passive: true });
      if (!reduced) start();
    });

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersection.disconnect();
      host?.removeEventListener("pointermove", onPointerMove);
      host?.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="site-vortex font-site-mono"
    />
  );
}
