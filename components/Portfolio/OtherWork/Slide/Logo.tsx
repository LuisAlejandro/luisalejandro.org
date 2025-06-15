import cn from "classnames";
import React from "react";

interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Logo = React.forwardRef<HTMLDivElement, LogoProps>(
  ({ children, className, ...props }, ref) => {
    return React.createElement(
      "div",
      {
        ...props,
        ref,
        className: cn(
          "absolute bg-white p-6 -right-8 -bottom-14 w-2/5",
          className
        ),
      },
      children
    );
  }
);

Logo.displayName = "Logo";
