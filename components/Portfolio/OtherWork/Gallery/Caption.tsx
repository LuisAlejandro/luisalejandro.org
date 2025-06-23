import cn from "classnames";
import { motion } from "framer-motion";
import React from "react";

interface CaptionProps extends React.ComponentProps<typeof motion.figcaption> {}

export const Caption = React.forwardRef<HTMLElement, CaptionProps>(
  ({ children, className, ...props }, ref) => {
    const MotionFigcaption = motion.figcaption;
    return React.createElement(
      MotionFigcaption,
      {
        ...props,
        ref,
        className: cn(
          "text-white absolute bottom-0 p-5 text-left w-full h-full rounded-lg bg-gradient-to-t from-black/85 via-black/50 via-60% to-black/10",
          className
        ),
      },
      children as any
    );
  }
);

Caption.displayName = "Caption";
