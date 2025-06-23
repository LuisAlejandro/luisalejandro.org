import cn from "classnames";
import React from "react";

interface FigureProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

export const Figure = React.forwardRef<HTMLElement, FigureProps>(
  ({ children, className, ...props }, ref) => {
    return React.createElement(
      "figure",
      {
        ...props,
        ref,
        className: cn(
          "relative opacity-100 transition-opacity duration-500 linear hover:opacity-80 hover:cursor-pointer",
          className
        ),
      },
      children
    );
  }
);

Figure.displayName = "Figure";
