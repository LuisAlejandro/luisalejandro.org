import cn from "classnames";
import React from "react";

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Header = React.forwardRef<HTMLDivElement, HeaderProps>(
  ({ children, className, ...props }, ref) => {
    return React.createElement(
      "div",
      {
        ...props,
        ref,
        className: cn("hidden w-1/2", "lg:flex", className),
      },
      children
    );
  }
);

Header.displayName = "Header";
