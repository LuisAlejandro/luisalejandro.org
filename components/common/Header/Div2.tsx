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
          "col-start-2 col-end-5 row-start-1 row-end-2 justify-end hidden",
          "lg:flex",
          className
        ),
      },
      children
    );
  }
);

Div2.displayName = "Div2";
