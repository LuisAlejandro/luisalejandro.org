import cn from "classnames";
import React from "react";

interface LeftSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const LeftSection = React.forwardRef<HTMLDivElement, LeftSectionProps>(
  ({ children, className, ...props }, ref) => {
    return React.createElement(
      "div",
      {
        ...props,
        ref,
        className: cn(
          "max-w-7xl w-full mx-0 flex flex-col",
          "lg:mx-auto",
          className
        ),
      },
      children
    );
  }
);

LeftSection.displayName = "LeftSection";
