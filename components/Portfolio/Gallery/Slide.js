import { AnimatePresence } from 'framer-motion';

import {
  Article,
  Body,
  Caption,
  Description,
  Figure,
  Header,
  Logo,
  Link
} from './SlideStyles';
import { slideAnimation } from './Animations';


const Slide = ({ currentIndex, setCurrentIndex, isModalOpen, setModalOpen, galleryList }) => {

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
          ease: 'easeInOut',
        }}>
        <Header>
          <Figure
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}>
            <picture>
              <source srcSet={current.images.hero[0]} />
              <img src={current.images.hero[0]} alt="" />
            </picture>
            <Caption>
              <h1>{current.name}</h1>
              <p>{current.shortDescription}</p>
            </Caption>
          </Figure>
          <Figure
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}>
            <picture>
              <source srcSet={current.images.hero[1]} />
              <img src={current.images.hero[1]} alt="" />
            </picture>
          </Figure>
          <Figure
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}>
            <picture>
              <source srcSet={current.images.hero[2]} />
              <img src={current.images.hero[2]} alt="" />
            </picture>
            <Logo>
              <img src={current.images.logo} alt="" />
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
  )
}

export default Slide