import cn from "classnames";
import React from "react";

interface LinkItemProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
}

export const LinkItem = React.forwardRef<HTMLAnchorElement, LinkItemProps>(
  ({ children, className, ...props }, ref) => {
    return React.createElement(
      "a",
      {
        ...props,
        ref,
        className: cn(
          "text-base leading-3.5 flex items-center mb-2 text-white/60 transition-all duration-300 ease-in-out relative left-0 hover:text-white hover:left-1.5",
          "lg:text-lg lg:leading-7.5 lg:mb-4",
          className
        ),
      },
      children
    );
  }
);

LinkItem.displayName = "LinkItem";
