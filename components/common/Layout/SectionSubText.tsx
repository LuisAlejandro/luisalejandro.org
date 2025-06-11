import cn from "classnames";
import React from "react";

interface SectionSubTextProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

export const SectionSubText = React.forwardRef<
  HTMLParagraphElement,
  SectionSubTextProps
>(({ children, className, ...props }, ref) => {
  return React.createElement(
    "p",
    {
      ...props,
      ref,
      className: cn(
        "max-w-[800px] font-light text-lg leading-8 text-white/75",
        "md:max-w-[672px] md:text-base md:leading-[25px]",
        "sm:text-sm sm:leading-[22px]",
        className
      ),
    },
    children
  );
});

SectionSubText.displayName = "SectionSubText";
