import Image from "next/image";
import Link from "next/link";

import { experience } from "@constants/constants";

import HighlightText from "@components/common/HighlightText";
import { Container } from "@components/common/Layout/Container";
import { Footer } from "@components/common/Layout/Footer";
import { Heading } from "@components/common/Layout/Heading";
import { SubHeading } from "@components/common/Layout/SubHeading";
import StyledLink from "@components/common/StyledLink";
import ButtonBar from "@components/Home/ButtonBar";

import Gallery from "@side-effects/Home/Gallery";

export default async function HomePage() {
  return (
    <main>
      <Container>
        <div
          id="app"
          className="flex flex-col items-center justify-center w-full h-full pt-15"
        >
          <div className="home inline-block w-full">
            <Link href="/">
              <Image
                alt=""
                className="mx-auto"
                src="/images/logomin.svg"
                height={200}
                width={200}
              />
            </Link>
            <Heading>
              Hi, I&apos;m <HighlightText>Luis Alejandro</HighlightText>.
              I&apos;m a <HighlightText>software engineer</HighlightText> from
              Venezuela, working remotely since the invention of the phone.{" "}
            </Heading>
            <SubHeading>
              I have more than{" "}
              <HighlightText>{experience} years of experience</HighlightText> as
              a full stack developer. I&apos;m an active{" "}
              <StyledLink
                href="https://github.com/LuisAlejandro"
                target="_blank"
                rel="nofollow noreferrer"
              >
                open source contributor
              </StyledLink>{" "}
              and like to <StyledLink href="/blog">write</StyledLink> about my
              discoveries. You can check out the projects I&apos;ve been a part
              of in my <StyledLink href="/portfolio">portfolio</StyledLink> .
            </SubHeading>
            <Gallery />
            <ButtonBar />
            <Footer />
          </div>
        </div>
      </Container>
    </main>
  );
}
