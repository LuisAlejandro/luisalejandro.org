import cn from "classnames";

interface SocialIconLabelProps {
  children: React.ReactNode;
  className?: string;
}

export default function SocialIconLabel({
  children,
  className,
}: SocialIconLabelProps) {
  return (
    <span
      className={cn(
        "hidden lg:inline-block align-text-top leading-6 ml-1.5 text-sm-plus font-light",
        className
      )}
    >
      {children}
    </span>
  );
}
