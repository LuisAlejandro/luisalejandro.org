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
        "font-main font-extralight text-3xl text-gray-800 leading-14 mb-16 z-2 relative",
        "[&>p>a]:bg-white/60 [&>p>a]:rounded-md [&>p>a]:py-1 [&>p>a]:px-2 [&>p>a:hover]:bg-white",
        className
      ),
    },
    children
  );
});

Description.displayName = "Description";
