
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { AiOutlineLeft } from "react-icons/ai";

import markdownToHtml from "@lib/markdownToHtml";
import {
  Article,
  Body,
  Caption,
  Description,
  Figure,
  Header,
  Logo,
  CustomLink,
  CustomLink2,
  CustomLink3,
  TagList,
  Tag,
} from "./SlideStyles";
import { slideAnimation } from "./Animations";

const Slide = ({
  currentIndex,
  setCurrentIndex,
  isModalOpen,
  setModalOpen,
  galleryList
}: any) => {
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
              
              <img src="/images/other/banner.svg" alt="" />
            
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
                  style={{ borderRadius: "10px" }}
                />
              
              </picture>
              {index === lastHero && (
                <Logo>
                  
                  <img src={current.images.logo} alt={current.name} />
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
          <Description
            dangerouslySetInnerHTML={{ __html: description }}
          ></Description>
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
