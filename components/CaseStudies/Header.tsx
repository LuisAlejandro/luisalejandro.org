import Link from "next/link";
import Image from "next/image";
import {
  AiFillGithub,
  AiFillYoutube,
  AiFillLinkedin,
  AiFillTwitterCircle,
} from "react-icons/ai";

import {
  Container,
  Div1,
  Div2,
  Div3,
  NavLink,
  SocialIcons,
} from "./HeaderStyles";


const Header = (props: any) => <>
  <Container style={{ background: props.bg }}>
    <Div1>
      <Link legacyBehavior passHref href="/">
        
        <a style={{ display: "flex", alignItems: "center", color: "white" }}>
          <Image
            alt=""
            src="/images/logomin-white.svg"
            height={60}
            width={60}
          />
        
        </a>
      </Link>
    </Div1>
    <Div2>
      
      <li>
        <Link legacyBehavior passHref href="/portfolio">
          <NavLink>Portfolio</NavLink>
        </Link>
      
      </li>
      
      <li>
        <Link legacyBehavior passHref href="/blog">
          <NavLink>Blog</NavLink>
        </Link>
      
      </li>
    </Div2>
    <Div3>
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
    </Div3>
  </Container>
  
  <svg viewBox="0 0 1920 100">
    
    <path fill={props.bg} d="M960,50l960-50H0L960,50z" />
  
  </svg>
</>;

export default Header;
