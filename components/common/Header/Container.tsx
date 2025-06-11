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
      : "max-w-[1280px] mt-0 mb-[30px] p-[1rem] pt-[2rem]";
    const darkClass = dark ? "bg-[#303030]" : "";
    return React.createElement(
      "div",
      {
        ...props,
        ref,
        className: cn(
          "w-full mx-auto grid grid-cols-5 grid-rows-1 gap-8",
          wideClass,
          darkClass,
          "xs:grid",
          className
        ),
      },
      children
    );
  }
);

Container.displayName = "Container";
