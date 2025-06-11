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
      : "max-w-[1040px]";

  return React.createElement(
    "h2",
    {
      ...props,
      ref,
      className: cn(
        "font-black w-full mx-auto bg-gradient-to-br from-gray-900 to-gray-800/60 bg-clip-text text-transparent font-title",
        main ? "text-[28px] leading-[32px]" : "text-[32px] leading-[40px]",
        main ? "pt-4 pb-2" : "p-0",
        "mb-2",
        "lg:mb-4",
        main
          ? "lg:text-[65px] lg:leading-[72px] lg:pt-[58px] lg:pb-4"
          : "lg:text-[56px] lg:leading-[67px]",
        main
          ? "md:text-[56px] md:leading-[56px] md:pt-10 md:pb-3"
          : "md:text-[48px] md:leading-[48px]",
        "md:mb-3",
        main
          ? "sm:text-[28px] sm:leading-[32px] sm:pt-4 sm:pb-2"
          : "sm:text-[32px] sm:leading-[40px]",
        "sm:mb-2",
        maxWidth,
        className
      ),
    },
    children
  );
});

SectionTitle.displayName = "SectionTitle";
