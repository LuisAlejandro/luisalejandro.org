import cn from "classnames";
import {
  AiFillGithub,
  AiFillLinkedin,
  AiFillYoutube,
  AiOutlineX,
} from "react-icons/ai";

import { SocialIcons } from "@components/common/Header/SocialIcons";

import { FooterWrapper } from "./FooterWrapper";
import { LinkColumn } from "./LinkColumn";
import { LinkItem } from "./LinkItem";
import { LinkList } from "./LinkList";
import { LinkTitle } from "./LinkTitle";

const Footer = () => {
  return (
    <FooterWrapper>
      <LinkList>
        <LinkColumn>
          <LinkTitle>Email</LinkTitle>
          <LinkItem href="mailto:luis@luisalejandro.org">
            luis@luisalejandro.org
          </LinkItem>
        </LinkColumn>
      </LinkList>
      <div
        className={cn(
          "flex flex-col justify-between w-full",
          "lg:flex-row",
          "sm:flex-col"
        )}
      >
        <div
          className={cn(
            "flex items-center m-0 flex-wrap pt-4",
            "lg:items-baseline lg:mr-auto"
          )}
        >
          <p
            className={cn(
              "text-white/50 text-center w-full min-w-70 tracking-wide leading-5.5 text-base",
              "lg:text-lg lg:leading-7.5"
            )}
          >
            &copy; {new Date().getFullYear()} Luis Martínez. All rights
            reserved.
          </p>
        </div>
        <div
          className={cn(
            "flex items-center pt-4",
            "justify-center",
            "lg:justify-start"
          )}
        >
          <SocialIcons
            dark
            href="https://github.com/LuisAlejandro"
            target="_blank"
            rel="nofollow noreferrer"
            className="m-4"
          >
            <AiFillGithub size="30px" />
          </SocialIcons>
          <SocialIcons
            dark
            href="https://www.linkedin.com/in/martinezfaneyth"
            target="_blank"
            rel="nofollow noreferrer"
            className="m-4"
          >
            <AiFillLinkedin size="30px" />
          </SocialIcons>
          <SocialIcons
            dark
            href="https://www.youtube.com/@LuisDevelops"
            target="_blank"
            rel="nofollow noreferrer"
            className="m-4"
          >
            <AiFillYoutube size="30px" />
          </SocialIcons>
          <SocialIcons
            dark
            href="https://x.com/LuisAlejandro"
            target="_blank"
            rel="nofollow noreferrer"
            className="m-4"
          >
            <AiOutlineX size="30px" />
          </SocialIcons>
        </div>
      </div>
    </FooterWrapper>
  );
};

export default Footer;
