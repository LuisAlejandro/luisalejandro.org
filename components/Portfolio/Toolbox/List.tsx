import cn from "classnames";
import React from "react";

interface ListProps extends React.HTMLAttributes<HTMLUListElement> {
  children: React.ReactNode;
}

const List = React.forwardRef<HTMLUListElement, ListProps>(
  ({ children, className, ...props }, ref) => {
    return React.createElement(
      "ul",
      {
        ...props,
        ref,
        className: cn(
          "list-none flex flex-col lg:grid lg:grid-cols-3 lg:gap-10 mb-40 lg:my-16 md:my-16 md:gap-6 sm:grid sm:grid-cols-2 sm:p-[15px]",
          className
        ),
      },
      children
    );
  }
);

List.displayName = "List";

export default List;
