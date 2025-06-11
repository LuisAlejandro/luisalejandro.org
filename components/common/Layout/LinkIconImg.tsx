import cn from "classnames";
import React from "react";

interface LinkIconImgProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  large?: boolean;
  nav?: boolean;
}

export const LinkIconImg = React.forwardRef<HTMLDivElement, LinkIconImgProps>(
  ({ children, className, large, nav, ...props }, ref) => {
    return React.createElement(
      "div",
      {
        ...props,
        ref,
        className: cn(
          "flex",
          large ? "h-8" : nav ? "h-6" : "h-6",
          large ? "sm:h-8" : nav ? "md:h-4" : "sm:h-4",
          className
        ),
      },
      children
    );
  }
);

LinkIconImg.displayName = "LinkIconImg";
