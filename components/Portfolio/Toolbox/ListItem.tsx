import cn from "classnames";
import React from "react";

interface ListItemProps extends React.HTMLAttributes<HTMLLIElement> {
  children: React.ReactNode;
}

const ListItem = React.forwardRef<HTMLLIElement, ListItemProps>(
  ({ children, className, ...props }, ref) => {
    return React.createElement(
      "li",
      {
        ...props,
        ref,
        className: cn("max-w-80 flex flex-row mb-3.5", className),
      },
      children
    );
  }
);

ListItem.displayName = "ListItem";

export default ListItem;
