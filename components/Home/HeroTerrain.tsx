"use client";

import { useEffect, useRef } from "react";

const COLS = 28;
const ROWS = 16;

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
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

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
      // Resizing resets the backing store; re-seed the pointer so the mesh is
      // not shaped by a stale coordinate.
      mouseX = targetMouseX = width / 2;
      mouseY = targetMouseY = height / 2;
    };

    const elevationAt = (
      col: number,
      depth: number,
      time: number,
      mX: number,
      mY: number,
      yBase: number
    ) => {
      const x = col * (width / (COLS - 1));
      const dx = x - mX;
      const dy = yBase - mY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const influence = Math.max(0, 1 - distance / (width * 0.35));

      return (
        Math.sin(col * 0.4 + time * 0.0015 + depth * 0.3) * 12 * dpr * depth +
        influence * 36 * dpr
      );
    };

    const drawFrame = (time: number, mX: number, mY: number) => {
      if (width === 0 || height === 0) return;
      ctx.clearRect(0, 0, width, height);
      ctx.lineWidth = Math.max(1, dpr);

      const cellWidth = width / (COLS - 1);
      const horizonY = height * 0.15;
      const groundHeight = height - horizonY;

      const yBaseAt = (depth: number) =>
        horizonY + groundHeight * Math.pow(depth, 1.8);

      for (let row = 0; row < ROWS; row += 1) {
        const depth = row / (ROWS - 1);
        const yBase = yBaseAt(depth);

        ctx.beginPath();
        for (let col = 0; col < COLS; col += 1) {
          const x = col * cellWidth;
          const y = yBase - elevationAt(col, depth, time, mX, mY, yBase);
          if (col === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(91, 124, 255, ${0.03 + 0.12 * Math.pow(depth, 1.2)})`;
        ctx.stroke();
      }

      for (let col = 0; col < COLS; col += 1) {
        const x = col * cellWidth;

        ctx.beginPath();
        for (let row = 0; row < ROWS; row += 1) {
          const depth = row / (ROWS - 1);
          const yBase = yBaseAt(depth);
          const y = yBase - elevationAt(col, depth, time, mX, mY, yBase);
          if (row === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = "rgba(237, 237, 231, 0.04)";
        ctx.stroke();
      }
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseX = (event.clientX - rect.left) * dpr;
      targetMouseY = (event.clientY - rect.top) * dpr;
    };

    if (prefersReducedMotion) {
      drawFrame(0, width / 2, height / 2);
      return () => {
        resizeObserver.disconnect();
      };
    }

    window.addEventListener("mousemove", handleMouseMove);

    // Run the animation only while the hero is on screen: an off-screen canvas
    // scheduling frames forever is pure battery cost.
    let frameId = 0;
    const render = (time: number) => {
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;
      drawFrame(time, mouseX, mouseY);
      frameId = requestAnimationFrame(render);
    };

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (frameId === 0) frameId = requestAnimationFrame(render);
      } else if (frameId !== 0) {
        cancelAnimationFrame(frameId);
        frameId = 0;
      }
    });
    intersectionObserver.observe(canvas);

    return () => {
      if (frameId !== 0) cancelAnimationFrame(frameId);
      intersectionObserver.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-60"
    />
  );
}
