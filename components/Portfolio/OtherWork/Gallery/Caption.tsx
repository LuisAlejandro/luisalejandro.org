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
          "text-white absolute bottom-0 p-8 text-left w-full rounded-lg bg-gradient-to-t from-black/85 to-transparent",
          className
        ),
      },
      children as any
    );
  }
);

Caption.displayName = "Caption";
