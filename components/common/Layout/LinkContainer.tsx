import cn from "classnames";
import React from "react";

interface LinkContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  large?: boolean;
}

export const LinkContainer = React.forwardRef<
  HTMLDivElement,
  LinkContainerProps
>(({ children, className, large, ...props }, ref) => {
  return React.createElement(
    "div",
    {
      ...props,
      ref,
      className: cn(
        "transition-all duration-300 ease-in-out justify-center rounded-full p-2 hover:bg-gray-800 hover:scale-110 hover:cursor-pointer",
        large ? "ml-6" : "ml-4",
        large ? "md:ml-4" : "md:ml-2",
        large ? "sm:ml-0" : "sm:ml-2",
        className
      ),
    },
    children
  );
});

LinkContainer.displayName = "LinkContainer";
