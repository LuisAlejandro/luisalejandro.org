import cn from "classnames";
import { motion } from "framer-motion";
import React from "react";

interface GalleryCardItemProps extends React.ComponentProps<typeof motion.li> {}

export const GalleryCardItem = React.forwardRef<
  HTMLLIElement,
  GalleryCardItemProps
>(({ children, className, ...props }, ref) => {
  const MotionLi = motion.li;
  return React.createElement(
    MotionLi,
    {
      ...props,
      ref,
      className: cn(
        "py-[5px] px-[0.5%] w-1/2 opacity-0",
        "lg:w-full",
        "md:w-1/2",
        className
      ),
    },
    children as any
  );
});

GalleryCardItem.displayName = "GalleryCardItem";
