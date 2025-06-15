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
          "w-full grid gap-4 mx-auto my-8",
          "lg:grid-cols-4",
          "md:grid-cols-2",
          "grid-cols-1",
          className
        ),
      },
      children
    );
  }
);

Boxes.displayName = "Boxes";
