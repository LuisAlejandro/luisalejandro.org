import Link from 'next/link';
import Image from 'next/image';
import {
  AiFillGithub,
  AiFillYoutube,
  AiFillLinkedin,
  AiFillTwitterCircle
} from 'react-icons/ai';

import { Container, Div1, Div2, Div3, NavLink, SocialIcons } from './HeaderStyles';


const Header = () => (
  <>
    <Container>
      <Div1>
        <Link href="/">
          <a style={{ display: 'flex', alignItems: 'center', color: "white" }}>
            <Image alt="" src="/images/logomin-white.svg" height={60} width={60} />
          </a>
        </Link>
      </Div1>
      <Div2>
      </Div2>
      <Div3>
        <SocialIcons href="https://github.com/LuisAlejandro" target="_blank" rel="noopener noreferrer">
          <AiFillGithub size="3rem" />
        </SocialIcons>
        <SocialIcons href="https://www.linkedin.com/in/martinezfaneyth" target="_blank" rel="noopener noreferrer">
          <AiFillLinkedin size="3rem" />
        </SocialIcons>
        <SocialIcons href="https://www.youtube.com/channel/UCI5aR8hs1CaHQWm5DVozFwg" target="_blank" rel="noopener noreferrer">
          <AiFillYoutube size="3rem" />
        </SocialIcons>
        <SocialIcons href="https://twitter.com/LuisAlejandro" target="_blank" rel="noopener noreferrer">
          <AiFillTwitterCircle size="3rem" />
        </SocialIcons>
      </Div3>
    </Container>
    <svg viewBox="0 0 1920 100">
      <path fill="#292929" d="M960,50l960-50H0L960,50z" />
    </svg>
  </>
);

export default Header;
