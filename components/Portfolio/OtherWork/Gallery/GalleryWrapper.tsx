import cn from "classnames";
import { motion } from "framer-motion";
import React from "react";

interface GalleryWrapperProps extends React.ComponentProps<typeof motion.div> {}

export const GalleryWrapper = React.forwardRef<
  HTMLDivElement,
  GalleryWrapperProps
>(({ children, className, ...props }, ref) => {
  const MotionDiv = motion.div;
  return React.createElement(
    MotionDiv,
    {
      ...props,
      ref,
      className: cn("pt-[1.5rem] pb-[15rem] mx-auto w-full", className),
    },
    children as any
  );
});

GalleryWrapper.displayName = "GalleryWrapper";
