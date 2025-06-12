interface SocialIconLabelProps {
  children: React.ReactNode;
}

export default function SocialIconLabel({ children }: SocialIconLabelProps) {
  return (
    <span className="hidden sm:inline-block align-text-top leading-6 ml-1.5 text-sm-plus font-light">
      {children}
    </span>
  );
}
