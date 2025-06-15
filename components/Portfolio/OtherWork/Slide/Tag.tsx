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
          "text-black/60 bg-white/30 py-1 px-2.5 mx-1 text-base",
          className
        ),
      },
      children
    );
  }
);

Tag.displayName = "Tag";
