// Tailwind CSS classes for Post Layout components

import cn from "classnames";
import React from "react";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ children, className, ...props }, ref) => {
    return React.createElement(
      "div",
      {
        ...props,
        ref,
        className: cn("w-full mx-auto", className),
      },
      children
    );
  }
);

Container.displayName = "Container";
