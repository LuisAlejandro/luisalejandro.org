import cn from "classnames";
import { motion } from "framer-motion";
import React from "react";

interface FigureProps extends React.ComponentProps<typeof motion.figure> {}

export const Figure = React.forwardRef<HTMLElement, FigureProps>(
  ({ children, className, ...props }, ref) => {
    const MotionFigure = motion.figure;
    return React.createElement(
      MotionFigure,
      {
        ...props,
        ref,
        className: cn("relative mb-4", className),
      } as any,
      children as any
    );
  }
);

Figure.displayName = "Figure";
