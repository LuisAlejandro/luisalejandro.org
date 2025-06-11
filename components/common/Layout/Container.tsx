import cn from "classnames";

export function Container({ children, className }: any) {
  return (
    <div
      className={cn(
        "w-11/12 mx-auto px-0",
        "lg:px-64",
        "md:px-32",
        "xs:container xs:px-16",
        className
      )}
    >
      {children}
    </div>
  );
}
