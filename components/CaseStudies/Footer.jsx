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
