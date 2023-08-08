import Link from "next/link";
import Image from "next/image";
import {
  AiOutlineGithub,
  AiOutlineYoutube,
  AiOutlineBulb,
  AiOutlineRead,
  AiOutlineApi,
  AiOutlineLinkedin,
} from "react-icons/ai";

import Container from "@components/Home/container";
import Layout from "@components/Home/layout";
import Footer from "@components/Home/footer";
import { SocialIcons, Div3 } from "@components/Home/styles";
import { HomeStyles } from "@styles/globals";

export default function Index() {
  return (
    <>
      <Layout>
        <HomeStyles />
        <Container>
          <div id="app">
            <div id="home">
              <Link passHref href="/">
                <a
                  style={{
                    display: "flex",
                    alignItems: "center",
                    color: "white",
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
              <Div3>
                <SocialIcons href="/blog">
                  <AiOutlineRead
                    size="1.5rem"
                    style={{
                      display: "inline-block",
                    }}
                  />{" "}
                  Blog
                </SocialIcons>
                <SocialIcons href="/portfolio">
                  <AiOutlineBulb
                    size="1.5rem"
                    style={{
                      display: "inline-block",
                    }}
                  />{" "}
                  Portfolio
                </SocialIcons>
                <SocialIcons href="/case-studies">
                  <AiOutlineApi
                    size="1.5rem"
                    style={{
                      display: "inline-block",
                    }}
                  />{" "}
                  Case studies
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
