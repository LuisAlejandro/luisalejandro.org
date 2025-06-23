import {
  AiOutlineGithub,
  AiOutlineLinkedin,
  AiOutlineMessage,
  AiOutlinePushpin,
  AiOutlineRead,
  AiOutlineShoppingCart,
  AiOutlineYoutube,
} from "react-icons/ai";

import { ButtonBarContainer } from "@components/common/Layout/ButtonBarContainer";
import { SocialIcons } from "@components/common/Layout/SocialIcons";

export default function ButtonBar() {
  return (
    <ButtonBarContainer>
      <SocialIcons
        href="/portfolio"
        icon={AiOutlinePushpin}
        text="Portfolio"
        className="!rounded-l-[5px]"
      />
      <SocialIcons href="/blog" icon={AiOutlineRead} text="Blog" />
      <SocialIcons
        href="https://store.luisalejandro.org/"
        icon={AiOutlineShoppingCart}
        text="Store"
      />
      <SocialIcons href="/contact" icon={AiOutlineMessage} text="Contact" />
      <SocialIcons
        href="https://github.com/LuisAlejandro"
        target="_blank"
        rel="nofollow noreferrer"
        icon={AiOutlineGithub}
      />
      <SocialIcons
        href="https://www.linkedin.com/in/martinezfaneyth"
        target="_blank"
        rel="nofollow noreferrer"
        icon={AiOutlineLinkedin}
      />
      <SocialIcons
        href="https://www.youtube.com/@LuisDevelops"
        target="_blank"
        rel="nofollow noreferrer"
        icon={AiOutlineYoutube}
        className="!rounded-r-[5px]"
      />
    </ButtonBarContainer>
  );
}
