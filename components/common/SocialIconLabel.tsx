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
        "hidden align-text-top leading-6 ml-1.5 text-xs font-light",
        "lg:text-lg lg:leading-7.5 lg:inline-block",
        className
      )}
    >
      {children}
    </span>
  );
}
