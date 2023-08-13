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
import { HomeStyles } from "@styles/globals";

export default function Index() {
  const frontList = [
    "/images/home/front-1.png",
    "/images/home/front-2.png",
    "/images/home/front-4.jpg",
    "/images/home/front-5.jpg",
    "/images/home/front-6.jpg",
    "/images/home/front-7.jpg",
  ];
  const experience = new Date().getFullYear() - 2009;
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
                  rel="noopener noreferrer"
                >
                  open source contributor
                </a>{" "}
                and like to{" "}
                <a target="_blank" href="/blog">
                  write
                </a>{" "}
                about my discoveries. You can check out the projects I&apos;ve
                been a part of in my{" "}
                <a target="_blank" href="/portfolio">
                  portfolio
                </a>.
              </Div1>
              <Div2>
                <Masonry
                  elementType={"ul"}
                  options={{
                    gutter: 20,
                    fitWidth: true,
                    transitionDuration: 0.8,
                  }}
                >
                  {frontList.map((imgUrl, index) => (
                    <li key={index}>
                      <img src={imgUrl} alt="" />
                    </li>
                  ))}
                </Masonry>
              </Div2>
              <Div3>
                <SocialIcons
                  href="/blog"
                  target="_blank"
                  style={{
                    borderRadius: "5px 0 0 5px",
                  }}
                >
                  <AiOutlineRead
                    size="1.5rem"
                    style={{
                      display: "inline-block",
                    }}
                  />
                  <span>Blog</span>
                </SocialIcons>
                <SocialIcons href="/portfolio" target="_blank">
                  <AiOutlineBulb
                    size="1.5rem"
                    style={{
                      display: "inline-block",
                    }}
                  />
                  <span>Portfolio</span>
                </SocialIcons>
                <SocialIcons
                  href="https://github.com/LuisAlejandro"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <AiOutlineGithub
                    size="1.5rem"
                    style={{
                      display: "inline-block",
                    }}
                  />
                </SocialIcons>
                <SocialIcons
                  href="https://www.linkedin.com/in/martinezfaneyth"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <AiOutlineLinkedin
                    size="1.5rem"
                    style={{
                      display: "inline-block",
                    }}
                  />
                </SocialIcons>
                <SocialIcons
                  href="https://www.youtube.com/@TecnologiaEnElDivan"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    borderRadius: "0 5px 5px 0",
                  }}
                >
                  <AiOutlineYoutube
                    size="1.5rem"
                    style={{
                      display: "inline-block",
                    }}
                  />
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
