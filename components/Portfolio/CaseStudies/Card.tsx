import cn from "classnames";
import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, className, ...props }, ref) => {
    return React.createElement(
      "div",
      {
        ...props,
        ref,
        className: cn("rounded-lg bg-white/20 text-center w-full", className),
      },
      children
    );
  }
);

Card.displayName = "Card";
