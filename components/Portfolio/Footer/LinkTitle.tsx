import cn from "classnames";
import React from "react";

interface LinkTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

export const LinkTitle = React.forwardRef<HTMLHeadingElement, LinkTitleProps>(
  ({ children, className, ...props }, ref) => {
    return React.createElement(
      "h4",
      {
        ...props,
        ref,
        className: cn(
          "normal font-semibold text-xs leading-6 uppercase text-white/40 mb-4",
          "lg:text-xs lg:leading-6 lg:mb-4",
          "md:text-3xs md:leading-3 md:mb-2",
          "sm:text-3xs sm:leading-3 sm:mb-2",
          "xs:text-3xs xs:leading-3 xs:mb-2",
          className
        ),
      },
      children
    );
  }
);

LinkTitle.displayName = "LinkTitle";
