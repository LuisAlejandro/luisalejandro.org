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
          "normal font-semibold uppercase text-white/40",
          "text-base leading-3 mb-2",
          "lg:leading-6 lg:mb-4",
          className
        ),
      },
      children
    );
  }
);

LinkTitle.displayName = "LinkTitle";
