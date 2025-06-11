import cn from "classnames";
import React from "react";

interface SectionTextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
  wide?: boolean;
  fullwidth?: boolean;
}

export const SectionText = React.forwardRef<
  HTMLParagraphElement,
  SectionTextProps
>(({ children, className, wide, fullwidth, ...props }, ref) => {
  const maxWidth = wide
    ? "max-w-[80%]"
    : fullwidth
      ? "max-w-full"
      : "max-w-[1040px]";

  return React.createElement(
    "p",
    {
      ...props,
      ref,
      className: cn(
        "text-base leading-6 font-light pb-4 text-gray-800 w-full mx-auto",
        maxWidth,
        "lg:text-[24px] lg:leading-[40px] lg:pb-14",
        "md:text-xl md:leading-8 md:pb-6",
        "sm:text-base sm:leading-6 sm:pb-4",
        className
      ),
    },
    children
  );
});

SectionText.displayName = "SectionText";
