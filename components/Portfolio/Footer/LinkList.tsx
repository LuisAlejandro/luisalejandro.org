import cn from "classnames";
import React from "react";

interface LinkListProps extends React.HTMLAttributes<HTMLUListElement> {
  children: React.ReactNode;
}

export const LinkList = React.forwardRef<HTMLUListElement, LinkListProps>(
  ({ children, className, ...props }, ref) => {
    return React.createElement(
      "ul",
      {
        ...props,
        ref,
        className: cn(
          "w-full grid grid-cols-4 pt-10 pb-7 gap-1 px-4.5",
          "lg:pt-8 lg:pb-4 lg:gap-4 lg:px-0",
          className
        ),
      },
      children
    );
  }
);

LinkList.displayName = "LinkList";
