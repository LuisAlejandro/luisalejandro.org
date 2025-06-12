import cn from "classnames";
import React from "react";

interface Button1Props extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const Button1 = React.forwardRef<HTMLButtonElement, Button1Props>(
  ({ children, className, ...props }, ref) => {
    return React.createElement(
      "span",
      {
        ...props,
        ref,
        className: cn(
          "inline-block align-top w-full my-1.5 mx-0",
          "lg:m-1.5 lg:mx-[1%] lg:w-[200px]",
          className
        ),
      },
      children
    );
  }
);

Button1.displayName = "Button1";
