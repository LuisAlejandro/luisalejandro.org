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
          "grid grid-cols-[repeat(3,minmax(85px,220px))] gap-10 py-10 pt-10 pb-7",
          "lg:py-8 lg:pt-8 lg:pb-4",
          "md:w-full md:py-8 md:pt-8 md:pb-4 md:gap-4",
          "sm:w-full sm:py-8 sm:pt-8 sm:pb-4 sm:px-1 sm:gap-1",
          "xs:w-full xs:py-8 xs:pt-8 xs:pb-4 xs:px-4.5 xs:gap-1",
          className
        ),
      },
      children
    );
  }
);

LinkList.displayName = "LinkList";
