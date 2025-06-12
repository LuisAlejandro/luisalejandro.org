import cn from "classnames";
import React from "react";

interface CarouselItemTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

export const CarouselItemTitle = React.forwardRef<
  HTMLHeadingElement,
  CarouselItemTitleProps
>(({ children, className, ...props }, ref) => {
  return React.createElement(
    "h4",
    {
      ...props,
      ref,
      className: cn(
        "font-black font-title text-xl leading-7 tracking-0_02em flex bg-gradient-to-br from-gray-800/80 to-gray-800/60 bg-clip-text text-transparent",
        "lg:text-4_5xl lg:leading-10_5 lg:mb-2",
        "md:mb-1",
        className
      ),
    },
    children
  );
});

CarouselItemTitle.displayName = "CarouselItemTitle";
