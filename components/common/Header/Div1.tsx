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
          "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-2 w-full flex flex-row justify-center items-center lg:justify-start lg:items-center",
          className
        ),
      },
      children
    );
  }
);

Div1.displayName = "Div1";
