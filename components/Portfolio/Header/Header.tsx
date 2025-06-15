import cn from "classnames";
import Image from "next/image";
import Link from "next/link";
import {
  AiFillGithub,
  AiFillLinkedin,
  AiFillYoutube,
  AiOutlineX,
} from "react-icons/ai";

import { Container } from "@components/common/Header/Container";
import { Div1 } from "@components/common/Header/Div1";
import { Div2 } from "@components/common/Header/Div2";
import { Div3 } from "@components/common/Header/Div3";
import { SocialIcons } from "@components/common/Header/SocialIcons";

const Header = ({ variant }: { variant?: string }) => {
  const isCaseStudies = variant === "case-studies";
  return (
    <>
      <Container wide={isCaseStudies} dark={isCaseStudies}>
        <Div1>
          <Link href="/" className="flex items-center text-white">
            <Image
              alt=""
              src={
                isCaseStudies
                  ? "/images/logomin-white.svg"
                  : "/images/logomin.svg"
              }
              height={60}
              width={60}
            />
          </Link>
        </Div1>
        <Div2>
          <li className="mx-5 leading-15">
            <Link
              href="/portfolio"
              className={cn(
                "text-lg p-1 font-light transition-all duration-400 ease-in-out hover:cursor-pointer",
                isCaseStudies
                  ? "text-gray-400 hover:text-white"
                  : "text-black/75 hover:text-black",
                "lg:p-0 lg:text-xl"
              )}
            >
              Portfolio
            </Link>
          </li>
          <li className="mx-5 leading-15">
            <Link
              href="/blog"
              className={cn(
                "text-lg p-1 font-light transition-all duration-400 ease-in-out hover:cursor-pointer",
                isCaseStudies
                  ? "text-gray-400 hover:text-white"
                  : "text-black/75 hover:text-black",
                "lg:p-0 lg:text-xl"
              )}
            >
              Blog
            </Link>
          </li>
          <li className="mx-5 leading-15">
            <Link
              href="https://store.luisalejandro.org/"
              target="_blank"
              rel="nofollow noreferrer"
              className={cn(
                "text-lg p-1 font-light transition-all duration-400 ease-in-out hover:cursor-pointer",
                isCaseStudies
                  ? "text-gray-400 hover:text-white"
                  : "text-black/75 hover:text-black",
                "lg:p-0 lg:text-xl"
              )}
            >
              Store
            </Link>
          </li>
          <li className="mx-5 leading-15">
            <Link
              href="/contact"
              className={cn(
                "text-lg p-1 font-light transition-all duration-400 ease-in-out hover:cursor-pointer",
                isCaseStudies
                  ? "text-gray-400 hover:text-white"
                  : "text-black/75 hover:text-black",
                "lg:p-0 lg:text-xl"
              )}
            >
              Contact
            </Link>
          </li>
        </Div2>
        <Div3>
          <SocialIcons
            dark={isCaseStudies}
            href="https://github.com/LuisAlejandro"
            target="_blank"
            rel="nofollow noreferrer"
          >
            <AiFillGithub size="30px" />
          </SocialIcons>
          <SocialIcons
            dark={isCaseStudies}
            href="https://www.linkedin.com/in/martinezfaneyth"
            target="_blank"
            rel="nofollow noreferrer"
          >
            <AiFillLinkedin size="30px" />
          </SocialIcons>
          <SocialIcons
            dark={isCaseStudies}
            href="https://www.youtube.com/@LuisDevelops"
            target="_blank"
            rel="nofollow noreferrer"
          >
            <AiFillYoutube size="30px" />
          </SocialIcons>
          <SocialIcons
            dark={isCaseStudies}
            href="https://x.com/LuisAlejandro"
            target="_blank"
            rel="nofollow noreferrer"
          >
            <AiOutlineX size="30px" />
          </SocialIcons>
        </Div3>
      </Container>
      {isCaseStudies && (
        <svg viewBox="0 0 1920 100">
          <path fill="#303030" d="M960,50l960-50H0L960,50z" />
        </svg>
      )}
    </>
  );
};

export default Header;
