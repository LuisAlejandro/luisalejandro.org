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
          "lg:text-[12px] lg:leading-[24px] lg:mb-[16px]",
          "md:text-[10px] md:leading-3 md:mb-2",
          "sm:text-[10px] sm:leading-3 sm:mb-2",
          "xs:text-[10px] xs:leading-3 xs:mb-2",
          className
        ),
      },
      children
    );
  }
);

LinkTitle.displayName = "LinkTitle";
