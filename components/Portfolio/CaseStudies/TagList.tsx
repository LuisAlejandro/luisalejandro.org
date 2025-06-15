import cn from "classnames";
import React from "react";

interface TagListProps extends React.HTMLAttributes<HTMLUListElement> {
  children: React.ReactNode;
}

export const TagList = React.forwardRef<HTMLUListElement, TagListProps>(
  ({ children, className, ...props }, ref) => {
    return React.createElement(
      "ul",
      {
        ...props,
        ref,
        className: cn("py-8 flex justify-center", className),
      },
      children
    );
  }
);

TagList.displayName = "TagList";
