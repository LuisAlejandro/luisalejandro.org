import cn from "classnames";
import React from "react";

interface CarouselItemTextProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

export const CarouselItemText = React.forwardRef<
  HTMLParagraphElement,
  CarouselItemTextProps
>(({ children, className, ...props }, ref) => {
  return React.createElement(
    "p",
    {
      ...props,
      ref,
      className: cn(
        "text-2xs leading-4_5 pr-0 tracking-0_02em",
        "lg:text-sm lg:leading-5_5 lg:pr-4",
        "md:text-xs md:leading-4_5 md:pr-8",
        className
      ),
    },
    children
  );
});

CarouselItemText.displayName = "CarouselItemText";
