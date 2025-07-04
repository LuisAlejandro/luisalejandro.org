import cn from "classnames";
import React from "react";

interface Div2Props extends React.HTMLAttributes<HTMLUListElement> {
  children: React.ReactNode;
}

export const Div2 = React.forwardRef<HTMLUListElement, Div2Props>(
  ({ children, className, ...props }, ref) => {
    return React.createElement(
      "ul",
      {
        ...props,
        ref,
        className: cn(
          "lg:col-start-2 lg:col-end-5 lg:row-start-1 lg:row-end-2 lg:justify-end justify-center items-center flex",
          className
        ),
      },
      children
    );
  }
);

Div2.displayName = "Div2";
