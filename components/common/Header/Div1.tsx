import cn from "classnames";
import React from "react";

interface Div1Props extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Div1 = React.forwardRef<HTMLDivElement, Div1Props>(
  ({ children, className, ...props }, ref) => {
    return React.createElement(
      "div",
      {
        ...props,
        ref,
        className: cn(
          "col-start-1 col-end-2 row-start-1 row-end-2 flex flex-row content-center",
          className
        ),
      },
      children
    );
  }
);

Div1.displayName = "Div1";
