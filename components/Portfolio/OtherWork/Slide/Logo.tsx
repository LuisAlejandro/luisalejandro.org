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
          "absolute bg-white p-6 -right-14 -bottom-14 w-2/5",
          "md:px-16 md:pt-0 md:pb-4_125rem md:top-0 md:left-60 md:bottom-auto md:w-full",
          "xl:left-[26rem]",
          className
        ),
      },
      children
    );
  }
);

Logo.displayName = "Logo";
