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
      <svg viewBox="0 0 1920 37">
        <path
          fill="#333"
          fillOpacity="0.5"
          d="M0,5.1l210,10.1l473.3-8.6l511.4,7.4L1710,0l210,5.1v32.4H0V5.1z"
        />
        <path
          fill="#333"
          d="M0,37.5V20.6l255,16.9l939.7-33.9L1665,6.4l255,14.2v16.9H0z"
        />
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
            <Slogan>&copy; {new Date().getFullYear()} Luis Martínez. All rights reserved.</Slogan>
          </CompanyContainer>
          <SocialContainer>
            <SocialIcons
              href="https://github.com/LuisAlejandro"
              target="_blank"
              rel="noopener noreferrer"
            >
              <AiFillGithub size="3rem" />
            </SocialIcons>
            <SocialIcons
              href="https://www.linkedin.com/in/martinezfaneyth"
              target="_blank"
              rel="noopener noreferrer"
            >
              <AiFillLinkedin size="3rem" />
            </SocialIcons>
            <SocialIcons
              href="https://www.youtube.com/@TecnologiaEnElDivan"
              target="_blank"
              rel="noopener noreferrer"
            >
              <AiFillYoutube size="3rem" />
            </SocialIcons>
            <SocialIcons
              href="https://twitter.com/LuisAlejandro"
              target="_blank"
              rel="noopener noreferrer"
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
