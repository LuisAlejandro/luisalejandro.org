import cn from "classnames";
import React from "react";

interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Box = React.forwardRef<HTMLDivElement, BoxProps>(
  ({ children, className, ...props }, ref) => {
    return React.createElement(
      "div",
      {
        ...props,
        ref,
        className: cn(
          "bg-white/20 text-gray-800 rounded-xl p-6 min-h-32",
          className
        ),
      },
      children
    );
  }
);

Box.displayName = "Box";
