import cn from "classnames";
import React from "react";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  wide?: boolean;
  dark?: boolean;
}

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ children, className, wide, dark, ...props }, ref) => {
    const wideClass = wide
      ? "px-[calc((100%-1280px)/2)] py-8"
      : "max-w-7xl mt-0 mb-7.5 p-4 pt-8";
    const darkClass = dark ? "bg-gray-4" : "";
    return React.createElement(
      "div",
      {
        ...props,
        ref,
        className: cn(
          "w-full mx-auto flex flex-col lg:grid lg:grid-cols-5 lg:grid-rows-1 gap-8",
          wideClass,
          darkClass,
          className
        ),
      },
      children
    );
  }
);

Container.displayName = "Container";
