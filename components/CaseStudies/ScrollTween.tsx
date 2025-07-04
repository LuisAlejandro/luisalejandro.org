"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ReactNode, useEffect, useRef } from "react";

interface ScrollTweenProps {
  children: ReactNode;
  to: gsap.TweenVars;
  from?: gsap.TweenVars;
  ease?: string;
  duration?: number;
  totalProgress: number;
  paused?: boolean;
  className?: string;
}

const ScrollTween = ({
  children,
  to,
  from,
  ease = "none",
  duration = 1,
  totalProgress,
  paused = true,
  className = "",
}: ScrollTweenProps) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useGSAP(() => {
    if (elementRef.current) {
      if (from) {
        // Use fromTo when both from and to are provided
        tweenRef.current = gsap.fromTo(
          elementRef.current,
          {
            ...from,
          },
          {
            ...to,
            ease,
            duration,
            paused,
          }
        );
      } else {
        // Use to when only to is provided
        tweenRef.current = gsap.to(elementRef.current, {
          ...to,
          ease,
          duration,
          paused,
        });
      }
    }
  }, [to, from, ease, duration, paused]);

  useEffect(() => {
    if (tweenRef.current) {
      tweenRef.current.progress(totalProgress);
    }
  }, [totalProgress]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
};

export default ScrollTween;
