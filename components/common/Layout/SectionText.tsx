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
    ? "max-w-[80%] mx-8"
    : fullwidth
      ? "max-w-full"
      : "max-w-260 mx-0";

  return React.createElement(
    "p",
    {
      ...props,
      ref,
      className: cn(
        "text-md font-normal leading-8 pb-4 text-gray-800 w-full",
        maxWidth,
        "lg:text-2xl lg:leading-10 lg:font-light lg:pb-14 lg:mx-auto",
        "md:text-xl md:leading-8 md:pb-6",
        className
      ),
    },
    children
  );
});

SectionText.displayName = "SectionText";
