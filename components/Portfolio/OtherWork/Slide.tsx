import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { AiOutlineLeft } from "react-icons/ai";

import markdownToHtml from "@lib/markdownToHtml";

import { slideAnimation } from "./Animations";

import { Article } from "./Slide/Article";
import { Body } from "./Slide/Body";
import { Caption } from "./Slide/Caption";
import { CustomLink } from "./Slide/CustomLink";
import { CustomLink2 } from "./Slide/CustomLink2";
import { CustomLink3 } from "./Slide/CustomLink3";
import { Description } from "./Slide/Description";
import { Figure } from "./Slide/Figure";
import { Header } from "./Slide/Header";
import { Logo } from "./Slide/Logo";
import { Tag } from "./Slide/Tag";
import { TagList } from "./Slide/TagList";

const Slide = ({ currentIndex, setModalOpen, galleryList }: any) => {
  const current = galleryList[currentIndex];
  const lastHero = current.images.hero.length - 1;

  const [description, setDescription] = useState(current.description);

  useEffect(() => {
    const parseMarkdown = async () => {
      setDescription(await markdownToHtml(current.description));
    };

    parseMarkdown();
  }, [current.description]);

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
              <source srcSet="/images/other/banner.svg" />
              <img
                src="/images/other/banner.svg"
                alt={current.name}
                className="mb-4"
              />
            </picture>
            <Caption className="top-6">
              <h1 className="text-4xl text-black font-bold leading-none my-0 mb-2.5">
                {current.name}
              </h1>
              <p className="text-xl text-gray-600">
                {current.shortDescription}
              </p>
            </Caption>
            <Caption className="w-38">
              <CustomLink2 accent onClick={() => setModalOpen(false)}>
                <AiOutlineLeft /> Go back
              </CustomLink2>
            </Caption>
          </Figure>
          {current.images.hero.map((imgUrl: any, index: any) => (
            <Figure
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
            >
              <picture>
                <source srcSet={imgUrl} />
                <img
                  src={imgUrl}
                  alt={current.name}
                  className="rounded-[10px]"
                />
              </picture>
              {index === lastHero && (
                <Logo>
                  <img
                    src={current.images.logo}
                    alt={current.name}
                    className="w-full"
                  />
                </Logo>
              )}
            </Figure>
          ))}
        </Header>
        <Body year={current.year}>
          <TagList>
            {current.tags.map((tag: any, index: any) => (
              <Tag key={index}>{tag}</Tag>
            ))}
          </TagList>
          <Description dangerouslySetInnerHTML={{ __html: description }} />
          {current.sources.map((source: any, index: any) => (
            <CustomLink
              target="_blank"
              rel="nofollow noreferrer"
              href={source.url}
              key={index}
            >
              View {source.name} online
            </CustomLink>
          ))}
          <CustomLink3 accent onClick={() => setModalOpen(false)}>
            <AiOutlineLeft /> Go back to gallery
          </CustomLink3>
        </Body>
      </Article>
    </AnimatePresence>
  );
};

export default Slide;
