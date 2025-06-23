import cn from "classnames";
import React from "react";

interface ListIconProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

const ListIcon = React.forwardRef<HTMLImageElement, ListIconProps>(
  ({ className, ...props }, ref) => {
    return React.createElement("img", {
      ...props,
      ref,
      className: cn(
        "block w-12 h-12 mb-2.5",
        "md:w-10 md:h-10 md:mb-2",
        "sm:w-8 sm:h-8 sm:mb-0",
        className
      ),
    });
  }
);

ListIcon.displayName = "ListIcon";

export default ListIcon;
