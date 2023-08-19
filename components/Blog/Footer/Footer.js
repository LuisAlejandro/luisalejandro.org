import {
  AiFillGithub,
  AiFillYoutube,
  AiFillLinkedin,
  AiFillTwitterCircle,
} from "react-icons/ai";

import {
  CompanyContainer,
  FooterWrapper,
  LinkColumn,
  LinkItem,
  LinkList,
  LinkTitle,
  Slogan,
  SocialIcons,
  SocialContainer,
  SocialIconsContainer,
} from "./FooterStyles";

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
              href="https://www.youtube.com/@TecnologiaEnElDivan"
              target="_blank"
              rel="nofollow noreferrer"
            >
              <AiFillYoutube size="3rem" />
            </SocialIcons>
            <SocialIcons
              href="https://twitter.com/LuisAlejandro"
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
