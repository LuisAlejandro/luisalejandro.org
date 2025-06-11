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
          "text-[3rem] font-medium tracking-[2px] text-gray-800 py-[0.5rem] mt-[1rem]",
          className
        ),
      },
      children
    );
  }
);

CardTitle.displayName = "CardTitle";
