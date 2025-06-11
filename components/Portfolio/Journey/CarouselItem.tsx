import cn from "classnames";
import React from "react";

interface CarouselItemProps extends React.HTMLAttributes<HTMLLIElement> {
  children: React.ReactNode;
}

export const CarouselItem = React.forwardRef<HTMLLIElement, CarouselItemProps>(
  ({ children, className, ...props }, ref) => {
    return React.createElement(
      "li",
      {
        ...props,
        ref,
        className: cn("my-2.5 w-full", className),
      },
      children
    );
  }
);

CarouselItem.displayName = "CarouselItem";
