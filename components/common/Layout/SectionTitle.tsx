import cn from "classnames";
import React from "react";

interface SectionTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  main?: boolean;
  wide?: boolean;
  fullwidth?: boolean;
}

export const SectionTitle = React.forwardRef<
  HTMLHeadingElement,
  SectionTitleProps
>(({ children, className, main, wide, fullwidth, ...props }, ref) => {
  const maxWidth = wide
    ? "max-w-[80%] mx-8"
    : fullwidth
      ? "max-w-full"
      : "max-w-260 mx-0";

  return React.createElement(
    "h2",
    {
      ...props,
      ref,
      className: cn(
        "font-black w-full bg-gradient-to-br from-gray-900 to-gray-800/60 bg-clip-text text-transparent font-title",
        main ? "text-5xl leading-12" : "text-4xl leading-10",
        "pt-4 pb-2 mb-2",
        "lg:mb-4 lg:mx-auto",
        main
          ? "lg:text-7xl lg:leading-18 lg:pt-14.5 lg:pb-4"
          : "lg:text-6xl lg:leading-17",
        main
          ? "md:text-6xl md:leading-14 md:pt-10 md:pb-3"
          : "md:text-5xl md:leading-12",
        "md:mb-3",
        maxWidth,
        className
      ),
    },
    children
  );
});

SectionTitle.displayName = "SectionTitle";
