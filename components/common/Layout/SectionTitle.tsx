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
    ? "max-w-[80%]"
    : fullwidth
      ? "max-w-full"
      : "max-w-260";

  return React.createElement(
    "h2",
    {
      ...props,
      ref,
      className: cn(
        "font-black w-full mx-auto bg-gradient-to-br from-gray-900 to-gray-800/60 bg-clip-text text-transparent font-title",
        main ? "text-2_5xl leading-8" : "text-custom-32px leading-10",
        main ? "pt-4 pb-2" : "p-0",
        "mb-2",
        "lg:mb-4",
        main
          ? "lg:text-7_5xl lg:leading-18 lg:pt-14.5 lg:pb-4"
          : "lg:text-6_5xl lg:leading-[67px]",
        main
          ? "md:text-6_5xl md:leading-14 md:pt-10 md:pb-3"
          : "md:text-5xl md:leading-12",
        "md:mb-3",
        main
          ? "sm:text-2_5xl sm:leading-8 sm:pt-4 sm:pb-2"
          : "sm:text-custom-32px sm:leading-10",
        "sm:mb-2",
        maxWidth,
        className
      ),
    },
    children
  );
});

SectionTitle.displayName = "SectionTitle";
