import { AnimatePresence } from "framer-motion";
import { AiOutlineLeft } from "react-icons/ai";
import Image from "next/image";

import {
  Article,
  Body,
  Caption,
  Description,
  Figure,
  Header,
  Logo,
  Link,
  Link2,
} from "./SlideStyles";
import { slideAnimation } from "./Animations";

const Slide = ({
  currentIndex,
  setCurrentIndex,
  isModalOpen,
  setModalOpen,
  galleryList,
}) => {
  const current = galleryList[currentIndex];

  return (
    <AnimatePresence initial={false} custom={1}>
      <Article
        key={currentIndex}
        custom={1}
        variants={slideAnimation}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{
          duration: 0.5,
          ease: "easeInOut",
        }}
      >
        <Header>
          <Figure
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
            <picture>
              <source srcSet={current.images.hero[0]} />
              <Image src={current.images.hero[0]} alt="" />
            </picture>
            <Caption
              style={{
                top: "4rem",
              }}
            >
              <h1>{current.name}</h1>
              <p>{current.shortDescription}</p>
            </Caption>
            <Caption
              style={{
                width: "150px",
              }}
            >
              <Link2 accent onClick={() => setModalOpen(false)}>
                <AiOutlineLeft /> Go back
              </Link2>
            </Caption>
          </Figure>
          <Figure
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
            <picture>
              <source srcSet={current.images.hero[1]} />
              <Image src={current.images.hero[1]} alt="" />
            </picture>
          </Figure>
          <Figure
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
            <picture>
              <source srcSet={current.images.hero[2]} />
              <Image src={current.images.hero[2]} alt="" />
            </picture>
            <Logo>
              <Image src={current.images.logo} alt="" />
            </Logo>
          </Figure>
        </Header>
        <Body year={current.year}>
          <Description>{current.description}</Description>
          {current.sources.map((source, index) => (
            <Link href={source.url} key={index}>
              View {source.name} online
            </Link>
          ))}
          <Link accent onClick={() => setModalOpen(false)}>
            Go back to other work
          </Link>
        </Body>
      </Article>
    </AnimatePresence>
  );
};

export default Slide;
