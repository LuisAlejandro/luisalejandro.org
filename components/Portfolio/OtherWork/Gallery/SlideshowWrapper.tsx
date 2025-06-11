import cn from "classnames";
import { motion } from "framer-motion";
import React from "react";

interface SlideshowWrapperProps
  extends React.ComponentProps<typeof motion.div> {}

export const SlideshowWrapper = React.forwardRef<
  HTMLDivElement,
  SlideshowWrapperProps
>(({ children, className, ...props }, ref) => {
  const MotionDiv = motion.div;
  return React.createElement(
    MotionDiv,
    {
      ...props,
      ref,
      className: cn(
        "flex flex-col py-6 pb-60 mx-auto w-full relative",
        "xl:pt-16",
        "md:pt-10",
        className
      ),
    },
    children as any
  );
});

SlideshowWrapper.displayName = "SlideshowWrapper";
