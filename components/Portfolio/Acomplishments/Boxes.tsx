import cn from "classnames";
import React from "react";

interface BoxesProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Boxes = React.forwardRef<HTMLDivElement, BoxesProps>(
  ({ children, className, ...props }, ref) => {
    return React.createElement(
      "div",
      {
        ...props,
        ref,
        className: cn(
          "w-full grid grid-cols-1 gap-0 mx-auto my-6",
          "lg:grid lg:grid-cols-4 lg:max-w-full lg:gap-6 lg:my-6 lg:mb-40",
          "md:grid md:grid-cols-[repeat(auto-fit,minmax(140px,1fr))] md:gap-4 md:my-5 md:mb-8",
          "sm:grid sm:grid-cols-2 sm:gap-2.5 sm:max-w-[500px] sm:mx-auto sm:my-6",
          className
        ),
      },
      children
    );
  }
);

Boxes.displayName = "Boxes";
