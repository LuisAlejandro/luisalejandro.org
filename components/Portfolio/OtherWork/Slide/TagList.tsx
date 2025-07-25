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
        className: cn("flex justify-end pt-10 pb-5", className),
      },
      children
    );
  }
);

TagList.displayName = "TagList";
