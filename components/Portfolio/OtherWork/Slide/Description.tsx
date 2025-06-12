import cn from "classnames";
import React from "react";

interface DescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children?: React.ReactNode;
}

export const Description = React.forwardRef<
  HTMLParagraphElement,
  DescriptionProps
>(({ children, className, ...props }, ref) => {
  return React.createElement(
    "p",
    {
      ...props,
      ref,
      className: cn(
        "font-main font-extralight text-[2.875rem] text-gray-800 leading-8 mb-6_25rem z-[2] relative",
        "[&>a]:bg-white/60 [&>a]:rounded-2xl [&>a]:py-1 [&>a]:px-4 [&>a:hover]:bg-white",
        className
      ),
    },
    children
  );
});

Description.displayName = "Description";
