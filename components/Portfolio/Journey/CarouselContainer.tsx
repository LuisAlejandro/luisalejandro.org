import cn from "classnames";
import React from "react";

interface CarouselContainerProps
  extends React.HTMLAttributes<HTMLUListElement> {
  children: React.ReactNode;
}

export const CarouselContainer = React.forwardRef<
  HTMLUListElement,
  CarouselContainerProps
>(({ children, className, ...props }, ref) => {
  return React.createElement(
    "ul",
    {
      ...props,
      ref,
      className: cn(
        "flex flex-col lg:flex-row list-none p-0 w-full justify-between",
        className
      ),
    },
    children
  );
});

CarouselContainer.displayName = "CarouselContainer";
