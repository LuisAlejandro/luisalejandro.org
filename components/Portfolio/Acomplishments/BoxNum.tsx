import cn from "classnames";
import React from "react";

interface BoxNumProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

export const BoxNum = React.forwardRef<HTMLHeadingElement, BoxNumProps>(
  ({ children, className, ...props }, ref) => {
    return React.createElement(
      "h5",
      {
        ...props,
        ref,
        className: cn(
          "font-black text-gray-800 mb-2 font-title",
          "lg:text-4xl",
          "text-3xl",
          className
        ),
      },
      children
    );
  }
);

BoxNum.displayName = "BoxNum";
