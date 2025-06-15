import cn from "classnames";
import React from "react";

interface CaptionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

export const Caption = React.forwardRef<HTMLElement, CaptionProps>(
  ({ children, className, ...props }, ref) => {
    return React.createElement(
      "figcaption",
      {
        ...props,
        ref,
        className: cn("absolute bg-white p-4 -left-6 -top-14 w-3/4", className),
      },
      children
    );
  }
);

Caption.displayName = "Caption";
