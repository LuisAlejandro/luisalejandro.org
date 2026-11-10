"use client";

import {
  useEffect,
  useRef,
  useState,
  type ElementType,
  type ReactNode,
} from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  delayMs?: number;
};

export function Reveal({
  children,
  className = "",
  as: Component = "div",
  delayMs = 0,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [state, setState] = useState<"initial" | "hidden" | "visible">(
    "initial"
  );

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    const element = ref.current;
    if (!element) return;

    // Element is initially hidden on client when motion is allowed
    setState("hidden");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            if (delayMs > 0) {
              setTimeout(() => {
                setState("visible");
              }, delayMs);
            } else {
              setState("visible");
            }
            observer.unobserve(entry.target);
          }
        }
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [delayMs]);

  const dataState = state === "initial" ? undefined : state;
  const style =
    delayMs > 0 && state === "hidden"
      ? { transitionDelay: `${delayMs}ms` }
      : undefined;

  return (
    <Component
      ref={ref}
      data-state={dataState}
      style={style}
      className={`site-reveal ${className}`}
    >
      {children}
    </Component>
  );
}
