interface SocialIconLabelProps {
  children: React.ReactNode;
}

export default function SocialIconLabel({ children }: SocialIconLabelProps) {
  return (
    <span className="hidden sm:inline-block align-text-top leading-[24px] ml-[5px] text-[15px] font-light">
      {children}
    </span>
  );
}
