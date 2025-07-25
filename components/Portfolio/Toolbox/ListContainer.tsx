import cn from "classnames";
import React from "react";

interface ListContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const ListContainer = React.forwardRef<HTMLDivElement, ListContainerProps>(
  ({ children, className, ...props }, ref) => {
    return React.createElement(
      "div",
      {
        ...props,
        ref,
        className: cn("flex flex-col ml-4.5", "sm:flex sm:ml-4.5", className),
      },
      children
    );
  }
);

ListContainer.displayName = "ListContainer";

export default ListContainer;
