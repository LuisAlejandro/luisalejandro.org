import { ReactNode } from "react";
import {
  AiFillGithub,
  AiFillLinkedin,
  AiFillTwitterCircle,
  AiFillYoutube,
} from "react-icons/ai";

// Reusable components with Tailwind classes
const FooterWrapper = ({ children }: { children: ReactNode }) => (
  <section className="w-full max-w-260 px-[calc((100%-1040px)/2)] pt-80 pb-10 mx-0 box-content bg-gray-800 lg:px-0 lg:pt-40 md:px-0 md:pt-40 sm:px-0 sm:pt-40 min-[0px]:max-[450px]:px-0 min-[0px]:max-[450px]:pt-40">
    {children}
  </section>
);

const LinkList = ({ children }: { children: ReactNode }) => (
  <ul className="grid grid-cols-3 gap-10 py-10 pb-7 lg:py-8 lg:pb-4 md:w-full md:py-8 md:pb-4 md:gap-4 sm:w-full sm:py-8 sm:pb-4 sm:gap-1.5 sm:px-1 min-[0px]:max-[450px]:w-full min-[0px]:max-[450px]:py-8 min-[0px]:max-[450px]:pb-4 min-[0px]:max-[450px]:gap-1.5 min-[0px]:max-[450px]:px-4.5">
    {children}
  </ul>
);

const LinkColumn = ({ children }: { children: ReactNode }) => (
  <li className="flex flex-col max-w-55 w-full">{children}</li>
);

const LinkTitle = ({ children }: { children: ReactNode }) => (
  <h4 className="font-semibold text-xs leading-6 uppercase text-white/40 mb-4 sm:text-3xs sm:leading-3 sm:mb-2">
    {children}
  </h4>
);

interface LinkItemProps {
  href: string;
  children: ReactNode;
}

const LinkItem = ({ href, children }: LinkItemProps) => (
  <a
    href={href}
    className="text-lg leading-7.5 text-white/66 mb-4 transition-all duration-300 relative left-0 hover:text-white hover:left-[6px] md:text-lg-minus md:leading-7 md:flex sm:text-sm-plus sm:leading-3.5 sm:mb-2 sm:flex sm:items-center"
  >
    {children}
  </a>
);

const SocialIconsContainer = ({ children }: { children: ReactNode }) => (
  <div className="flex flex-row justify-between w-full min-[0px]:max-[450px]:flex-col sm:flex-col">
    {children}
  </div>
);

const CompanyContainer = ({ children }: { children: ReactNode }) => (
  <div className="flex items-baseline flex-wrap mr-auto min-[0px]:max-[450px]:flex min-[0px]:max-[450px]:items-center min-[0px]:max-[450px]:m-0 sm:flex sm:items-center sm:m-0">
    {children}
  </div>
);

const Slogan = ({ children }: { children: ReactNode }) => (
  <p className="text-white/50 min-w-70 tracking-0_02em text-lg leading-7.5 pt-4 min-[0px]:max-[450px]:leading-5.5 min-[0px]:max-[450px]:text-sm-plus min-[0px]:max-[450px]:text-center min-[0px]:max-[450px]:w-full sm:leading-5.5 sm:text-sm-plus sm:text-center sm:w-full">
    {children}
  </p>
);

const SocialContainer = ({ children }: { children: ReactNode }) => (
  <div className="flex items-center min-[0px]:max-[450px]:justify-center sm:justify-center">
    {children}
  </div>
);

interface SocialIconsProps {
  href: string;
  target?: string;
  rel?: string;
  children: ReactNode;
}

const SocialIcons = ({ href, target, rel, children }: SocialIconsProps) => (
  <a
    href={href}
    target={target}
    rel={rel}
    className="transition-all duration-300 text-gray-400 rounded-[50px] p-2 mx-2 hover:text-white hover:bg-gray-600 hover:scale-110 hover:cursor-pointer"
  >
    {children}
  </a>
);

const Footer = () => {
  return (
    <>
      <svg viewBox="0 0 1920 50">
        <path fill="#fff" d="M960,50l960-50H0L960,50z" />
      </svg>
      <svg viewBox="0 0 1920 50">
        <path fill="#333" d="M1920,0v100H0V0l960,50L1920,0z" />
      </svg>
      <FooterWrapper>
        <LinkList>
          <LinkColumn>
            <LinkTitle>Email</LinkTitle>
            <LinkItem href="mailto:luis@luisalejandro.org">
              luis@luisalejandro.org
            </LinkItem>
          </LinkColumn>
        </LinkList>
        <SocialIconsContainer>
          <CompanyContainer>
            <Slogan>
              &copy; {new Date().getFullYear()} Luis Martínez. All rights
              reserved.
            </Slogan>
          </CompanyContainer>
          <SocialContainer>
            <SocialIcons
              href="https://github.com/LuisAlejandro"
              target="_blank"
              rel="nofollow noreferrer"
            >
              <AiFillGithub size="3rem" />
            </SocialIcons>
            <SocialIcons
              href="https://www.linkedin.com/in/martinezfaneyth"
              target="_blank"
              rel="nofollow noreferrer"
            >
              <AiFillLinkedin size="3rem" />
            </SocialIcons>
            <SocialIcons
              href="https://www.youtube.com/@LuisDevelops"
              target="_blank"
              rel="nofollow noreferrer"
            >
              <AiFillYoutube size="3rem" />
            </SocialIcons>
            <SocialIcons
              href="https://x.com/LuisAlejandro"
              target="_blank"
              rel="nofollow noreferrer"
            >
              <AiFillTwitterCircle size="3rem" />
            </SocialIcons>
          </SocialContainer>
        </SocialIconsContainer>
      </FooterWrapper>
    </>
  );
};

export default Footer;

// Export the reusable components for use in other files
export {
  CompanyContainer,
  FooterWrapper,
  LinkColumn,
  LinkItem,
  LinkList,
  LinkTitle,
  Slogan,
  SocialContainer,
  SocialIcons,
  SocialIconsContainer,
};
