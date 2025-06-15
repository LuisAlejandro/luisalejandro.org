import cn from "classnames";
import React from "react";

interface BoxTextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

export const BoxText = React.forwardRef<HTMLParagraphElement, BoxTextProps>(
  ({ children, className, ...props }, ref) => {
    return React.createElement(
      "p",
      {
        ...props,
        ref,
        className: cn(
          "font-normal text-gray-800/75",
          "lg:text-lg",
          "text-base",
          className
        ),
      },
      children
    );
  }
);

BoxText.displayName = "BoxText";
