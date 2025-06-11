import React from "react";

interface StyledLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const StyledLink: React.FC<StyledLinkProps> = ({
  href,
  children,
  className = "",
  ...props
}) => {
  return (
    <a
      href={href}
      className={`px-1 transition-colors duration-200 ease-in hover:bg-white hover:text-black bg-custom-beige rounded-lg ${className}`}
      {...props}
    >
      {children}
    </a>
  );
};

export default StyledLink;
