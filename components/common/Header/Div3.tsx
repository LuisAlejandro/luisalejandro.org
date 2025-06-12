import cn from "classnames";
import React from "react";

interface Div3Props extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Div3 = React.forwardRef<HTMLDivElement, Div3Props>(
  ({ children, className, ...props }, ref) => {
    return React.createElement(
      "div",
      {
        ...props,
        ref,
        className: cn(
          "col-start-5 col-end-6 row-start-1 row-end-2 flex justify-between items-center hidden",
          "lg:flex",
          className
        ),
      },
      children
    );
  }
);

Div3.displayName = "Div3";
