"use client";

import { useEffect, useRef } from "react";

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

    let width = (canvas.width = canvas.offsetWidth * window.devicePixelRatio);
    let height = (canvas.height =
      canvas.offsetHeight * window.devicePixelRatio);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      height = canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      if (prefersReducedMotion) {
        drawFrame(0, 0, 0);
      }
    };

    window.addEventListener("resize", handleResize);

    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseX = (e.clientX - rect.left) * window.devicePixelRatio;
      targetMouseY = (e.clientY - rect.top) * window.devicePixelRatio;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const cols = 28;
    const rows = 16;

    const drawFrame = (time: number, mX: number, mY: number) => {
      ctx.clearRect(0, 0, width, height);

      const cellW = width / (cols - 1);
      const horizonY = height * 0.15;
      const groundH = height - horizonY;

      ctx.lineWidth = 1 * window.devicePixelRatio;

      // Draw rows (perspective depth)
      for (let r = 0; r < rows; r++) {
        const progress = r / (rows - 1);
        const yBase = horizonY + groundH * Math.pow(progress, 1.8);

        ctx.beginPath();
        for (let c = 0; c < cols; c++) {
          const x = c * cellW;

          // Distance to mouse
          const dx = x - mX;
          const dy = yBase - mY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const influence = Math.max(0, 1 - dist / (width * 0.35));

          const elevation =
            Math.sin(c * 0.4 + time * 0.0015 + r * 0.3) *
              12 *
              window.devicePixelRatio *
              progress +
            influence * 36 * window.devicePixelRatio;

          const y = yBase - elevation;

          if (c === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        const alpha = 0.03 + 0.12 * Math.pow(progress, 1.2);
        ctx.strokeStyle = `rgba(91, 124, 255, ${alpha})`;
        ctx.stroke();
      }

      // Draw perspective columns
      for (let c = 0; c < cols; c++) {
        const x = c * cellW;
        ctx.beginPath();
        for (let r = 0; r < rows; r++) {
          const progress = r / (rows - 1);
          const yBase = horizonY + groundH * Math.pow(progress, 1.8);

          const dx = x - mX;
          const dy = yBase - mY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const influence = Math.max(0, 1 - dist / (width * 0.35));

          const elevation =
            Math.sin(c * 0.4 + time * 0.0015 + r * 0.3) *
              12 *
              window.devicePixelRatio *
              progress +
            influence * 36 * window.devicePixelRatio;

          const y = yBase - elevation;

          if (r === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.strokeStyle = "rgba(237, 237, 231, 0.04)";
        ctx.stroke();
      }
    };

    if (prefersReducedMotion) {
      drawFrame(0, width / 2, height / 2);
      return () => {
        window.removeEventListener("resize", handleResize);
        window.removeEventListener("mousemove", handleMouseMove);
      };
    }

    let isVisible = true;
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    observer.observe(canvas);

    let rafId: number;
    const render = (time: number) => {
      if (isVisible) {
        mouseX += (targetMouseX - mouseX) * 0.05;
        mouseY += (targetMouseY - mouseY) * 0.05;
        drawFrame(time, mouseX, mouseY);
      }
      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none opacity-60"
    />
  );
}
