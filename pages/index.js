import Link from "next/link";
import Image from "next/image";
import Masonry from "react-masonry-component";
import {
  AiOutlineGithub,
  AiOutlineYoutube,
  AiOutlineBulb,
  AiOutlineRead,
  AiOutlineLinkedin,
} from "react-icons/ai";
import { useState } from "react";

import { experience } from "@constants/constants";
import Container from "@components/Home/container";
import Layout from "@components/Home/layout";
import Footer from "@components/Home/footer";
import {
  SocialIcons,
  Div3,
  Heading1,
  Div1,
  Div2,
} from "@components/Home/styles";
import generateFeed from "@lib/generateFeed";
import generateSitemap from "@lib/generateSitemap";
import { HomeStyles } from "@styles/globals";

export default function Index() {
  const [imagesVisible, setImagesVisible] = useState(false);

  const frontList = [
    "/images/home/front-1.png",
    "/images/home/front-2.png",
    "/images/home/front-4.png",
    "/images/home/front-5.png",
    "/images/home/front-6.png",
    "/images/home/front-7.png",
  ];
  return (
    <>
      <Layout>
        <HomeStyles />
        <Container>
          <div id="app">
            <div className="home">
              <Link passHref href="/">
                <a
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Image
                    alt=""
                    src="/images/logomin.svg"
                    height={200}
                    width={200}
                  />
                </a>
              </Link>
              <Heading1>
                Hi, I&apos;m <span>Luis Alejandro</span>. I&apos;m a{" "}
                <span>software engineer</span> from Venezuela, working remotely
                since the invention of the phone.{" "}
              </Heading1>
              <Div1>
                I have more than <span>{experience} years of experience</span>{" "}
                as a full stack developer. I&apos;m an active{" "}
                <a
                  target="_blank"
                  href="https://github.com/LuisAlejandro"
                  rel="nofollow noreferrer"
                >
                  open source contributor
                </a>{" "}
                and like to{" "}
                <Link passHref href="/blog">
                  <a>write</a>
                </Link>{" "}
                about my discoveries. You can check out the projects I&apos;ve
                been a part of in my{" "}
                <Link passHref href="/portfolio">
                  <a>portfolio</a>
                </Link>{" "}
                .
              </Div1>
              <Div2>
                <Masonry
                  elementType={"ul"}
                  options={{
                    gutter: 20,
                    fitWidth: true,
                    transitionDuration: 0.8,
                  }}
                  onImagesLoaded={() => {
                    setImagesVisible(true);
                  }}
                >
                  {frontList.map((imgUrl, index) => (
                    <li key={index}>
                      <img
                        src={imgUrl}
                        alt=""
                        style={{
                          display: imagesVisible ? "block" : "none",
                        }}
                      />
                    </li>
                  ))}
                </Masonry>
              </Div2>
              <Div3>
                <SocialIcons
                  href="/blog"
                  style={{
                    borderTopLeftRadius: "5px",
                    borderBottomLeftRadius: "5px",
                  }}
                >
                  <AiOutlineRead />
                  <span>Blog</span>
                </SocialIcons>
                <SocialIcons href="/portfolio">
                  <AiOutlineBulb />
                  <span>Portfolio</span>
                </SocialIcons>
                <SocialIcons
                  href="https://github.com/LuisAlejandro"
                  target="_blank"
                  rel="nofollow noreferrer"
                >
                  <AiOutlineGithub />
                </SocialIcons>
                <SocialIcons
                  href="https://www.linkedin.com/in/martinezfaneyth"
                  target="_blank"
                  rel="nofollow noreferrer"
                >
                  <AiOutlineLinkedin />
                </SocialIcons>
                <SocialIcons
                  href="https://www.youtube.com/@LuisDevelops"
                  target="_blank"
                  rel="nofollow noreferrer"
                  style={{
                    borderTopRightRadius: "5px",
                    borderBottomRightRadius: "5px",
                  }}
                >
                  <AiOutlineYoutube />
                </SocialIcons>
              </Div3>
              <Div3>
                <Footer />
              </Div3>
            </div>
          </div>
        </Container>
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  await generateFeed();
  await generateSitemap();
  return {
    props: {},
  };
}
