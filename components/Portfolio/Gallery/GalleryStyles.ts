import styled from "styled-components";
import { motion } from "framer-motion";

export const GalleryWrapper = styled(motion.div)`
  padding: 1.5rem 0;
  padding-bottom: 15rem;
  margin: 0 auto;
  width: 100%;
  @media ${(props) => props.theme.breakpoints.sm} {
    padding-top: 2.5rem;
  }
`;

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
`;

export const GalleryCardItem = styled(motion.li)`
  display: block;
  float: left;
  padding: 5px 0.5%;
  width: 33.333%;
  opacity: 0;

  @media only screen and (min-width: 0px) and (max-width: 450px) {
    width: 100%;
  }
  @media ${(props) => props.theme.breakpoints.sm} {
    width: 100%;
  }
  @media ${(props) => props.theme.breakpoints.md} {
    width: 50%;
  }
  @media ${(props) => props.theme.breakpoints.lg} {
    width: 50%;
  }
`;

export const Figure = styled.figure`
  position: relative;
  opacity: 1;
  transition: opacity 0.5s linear;
  img {
    width: 100%;
    border-radius: 10px;
  }
  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }
`;

export const Caption = styled(motion.figcaption)`
  color: #fff;
  position: absolute;
  bottom: 0;
  padding: 2rem;
  text-align: left;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.85));
  width: 100%;
  border-radius: 10px;

  h2 {
    font-size: 6rem;
    line-height: 1;
    margin-bottom: 0;

    @media only screen and (min-width: 0px) and (max-width: 450px) {
      display: none;
    }
    @media ${(props) => props.theme.breakpoints.md} {
      display: none;
    }
  }

  h3 {
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

    @media only screen and (min-width: 0px) and (max-width: 450px) {
      display: none;
    }
  }
`;
