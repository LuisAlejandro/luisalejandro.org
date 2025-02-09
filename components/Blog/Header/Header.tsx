import Link from "next/link";
import Image from "next/image";
import {
  AiFillGithub,
  AiFillYoutube,
  AiFillLinkedin,
  AiFillTwitterCircle,
} from "react-icons/ai";

// import {
//   Container,
//   Div1,
//   Div2,
//   Div3,
//   NavLink,
//   SocialIcons,
// } from "./HeaderStyles";
import styled from "styled-components";

const Container = styled.div`
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;
  margin-bottom: 30px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: 1fr;
  grid-column-gap: 2rem;
  padding: 1rem;
  padding-top: 2rem;

  @media only screen and (min-width: 0px) and (max-width: 450px) {
    display: flex;
  }
`;

const Div1 = styled.div`
  grid-area: 1 / 1 / 2 / 2;
  display: flex;
  flex-direction: row;
  align-content: center;
`;

const Div2 = styled.ul`
  grid-area: 1 / 2 / 2 / 5;
  display: flex;
  justify-content: end;

  li {
    margin: 0 20px;
    line-height: 60px;
  }
`;

const Div3 = styled.div`
  grid-area: 1 / 5 / 2 / 6;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media only screen and (min-width: 0px) and (max-width: 450px) {
    display: none;
  }
`;

// Navigation Links
const NavLink = styled.a`
  font-size: 2rem;
  font-weight: 300;
  color: rgba(0,0,0,0.75);
  transition: 0.4s ease;
  &:hover {
    color: rgba(0,0,0,1);
    cursor: pointer;
  }

  @media only screen and (min-width: 0px) and (max-width: 450px) {
    padding: 0.5rem;
    font-size: 1.7rem;
  }
`;

// Social Icons
const SocialIcons = styled.a`
  transition: 0.3s ease;
  color: rgba(0,0,0,0.75);
  border-radius: 50px;
  padding: 8px;
  &:hover {
    color: rgba(0,0,0,1);
    background-color: #aaa;
    transform: scale(1.2);
    cursor: pointer;
  }
`;

const Header = () => (
  
  <Container>
    <Div1>
      <Link legacyBehavior passHref href="/">
        
        <a style={{ display: "flex", alignItems: "center", color: "white" }}>
          <Image alt="" src="/images/logomin.svg" height={60} width={60} />
        
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
        <AiFillGithub size="30px" />
      </SocialIcons>
      <SocialIcons
        href="https://www.linkedin.com/in/martinezfaneyth"
        target="_blank"
        rel="nofollow noreferrer"
      >
        <AiFillLinkedin size="30px" />
      </SocialIcons>
      <SocialIcons
        href="https://www.youtube.com/@LuisDevelops"
        target="_blank"
        rel="nofollow noreferrer"
      >
        <AiFillYoutube size="30px" />
      </SocialIcons>
      <SocialIcons
        href="https://x.com/LuisAlejandro"
        target="_blank"
        rel="nofollow noreferrer"
      >
        <AiFillTwitterCircle size="30px" />
      </SocialIcons>
    </Div3>
  </Container>
);

export default Header;
