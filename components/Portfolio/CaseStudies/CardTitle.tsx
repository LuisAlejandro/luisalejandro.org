import cn from "classnames";
import React from "react";

interface CardTitleProps
  extends Omit<React.HTMLAttributes<HTMLHeadingElement>, "title"> {
  children: React.ReactNode;
}

export const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ children, className, ...props }, ref) => {
    return React.createElement(
      "h3",
      {
        ...props,
        ref,
        className: cn(
          "text-5xl font-medium tracking-[2px] text-gray-800 py-2 mt-4",
          className
        ),
      },
      children
    );
  }
);

CardTitle.displayName = "CardTitle";
