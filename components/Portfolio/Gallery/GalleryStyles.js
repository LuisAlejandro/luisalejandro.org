import styled from 'styled-components';
import { motion } from 'framer-motion';


export const GalleryWrapper = styled(motion.div)`
  padding: 1.5rem 0;
  padding-bottom: 15rem;
  margin: 0 auto;
  width: 100%;
  @media ${(props) => props.theme.breakpoints.sm} {
    padding-top: 2.5rem;
  }
`

export const SlideshowWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  padding: 1.5rem 0;
  padding-bottom: 15rem;
  margin: 0 auto;
  width: 100%;
  position: relative;
  @media ${(props) => props.theme.breakpoints.md} {
    padding-top: 2.5rem;
  }
  @media ${(props) => props.theme.breakpoints.xl} {
    padding-top: 4rem;
  }
`

export const GalleryCardItem = styled(motion.li)`
  display: block;
  float: left;
  padding: 5px;
  width: 33%;
  opacity: 0;
`

export const Figure = styled.figure`
  position: relative;
  opacity: 1;
  transition: opacity 0.2s linear;
  &:hover {
    opacity: 0.5;
    cursor: pointer;
  }
`

export const Caption = styled(motion.figcaption)`
  color: #FFF;
  position: absolute;
  bottom: 0;
  padding: 2rem;
  text-align: left;
  background: linear-gradient(rgba(0, 0, 0, 0.01), rgba(0, 0, 0, 0.85));
  width: 100%;
  h2 {
    font-weight: bold;
    font-size: 2rem;
    line-height: normal;
    margin-bottom: 0.4375rem;
    white-space: pre-line;
  }
  p {
    font-size: 1.5rem;
    font-weight: 100;
    color: rgba(255, 255, 255, 0.75);
  }
`