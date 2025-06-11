import cn from "classnames";
import React from "react";

interface HrProps extends React.HTMLAttributes<HTMLHRElement> {}

export const Hr = React.forwardRef<HTMLHRElement, HrProps>(
  ({ className, ...props }, ref) => {
    return React.createElement("hr", {
      ...props,
      ref,
      className: cn(
        "w-[50px] h-[3px] my-2 mx-auto border-0 bg-[#d0bb57]",
        className
      ),
    });
  }
);

Hr.displayName = "Hr";
