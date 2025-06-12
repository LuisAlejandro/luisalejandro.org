import cn from "classnames";
import React from "react";

interface TagProps extends React.HTMLAttributes<HTMLLIElement> {
  children: React.ReactNode;
}

export const Tag = React.forwardRef<HTMLLIElement, TagProps>(
  ({ children, className, ...props }, ref) => {
    return React.createElement(
      "li",
      {
        ...props,
        ref,
        className: cn(
          "text-gray-800 bg-white/30 rounded-3xl px-2.5 py-1.5 mx-0.5 text-2xl",
          className
        ),
      },
      children
    );
  }
);

Tag.displayName = "Tag";
