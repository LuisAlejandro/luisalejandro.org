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
          "max-w-[1280px] w-full mx-auto flex flex-col",
          "lg:flex lg:flex-col lg:mx-auto",
          "md:flex md:flex-col md:mx-auto",
          "sm:flex sm:flex-col sm:m-0",
          "xs:flex xs:flex-col xs:m-0",
          className
        ),
      },
      children
    );
  }
);

LeftSection.displayName = "LeftSection";
