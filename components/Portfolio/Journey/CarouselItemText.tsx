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
        "text-[11px] leading-[18px] pr-0 tracking-[0.02em]",
        "lg:text-[14px] lg:leading-[22px] lg:pr-[16px]",
        "md:text-xs md:leading-[18px] md:pr-8",
        className
      ),
    },
    children
  );
});

CarouselItemText.displayName = "CarouselItemText";
