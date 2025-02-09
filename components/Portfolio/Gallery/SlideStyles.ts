import styled from "styled-components";
import { motion } from "framer-motion";

export const Article = styled(motion.article)`
  padding: 1.5rem 0;
  margin: 0 auto;
  max-width: 100%;
  display: flex;
  flex-direction: row;
  margin-right: 1.5rem;
  align-items: flex-start;
`;

export const Header = styled.div`
  width: 50%;

  @media only screen and (min-width: 0px) and (max-width: 450px) {
    display: none;
  }

  @media ${(props) => props.theme.breakpoints.sm} {
    display: none;
  }

  @media ${(props) => props.theme.breakpoints.md} {
    display: none;
  }

  @media ${(props) => props.theme.breakpoints.lg} {
    display: none;
  }
`;

export const Figure = styled(motion.figure)`
  position: relative;
  margin-bottom: 1rem;
`;

export const Caption = styled.figcaption`
  position: absolute;
  background-color: #fff;
  padding: 1.5rem;
  left: -3.5rem;
  top: -3.5rem;
  width: 75%;

  h1 {
    font-size: 3.5rem;
    color: #000;
    font-weight: bold;
    line-height: 1;
    margin: 0px 0 10px 0;

  }

  p {
    font-size: 1.9375rem;
    color: #666;
  }
`;

export const Logo = styled.div`
  position: absolute;
  background-color: #fff;
  padding: 1.5rem;
  right: -3.5rem;
  bottom: -3.5rem;
  width: 40%;

  @media ${(props) => props.theme.breakpoints.md} {
    padding: 0 4rem 4.125rem 4rem;
    top: 0;
    left: 15rem;
    bottom: unset;
    width: 100%;
  }

  @media ${(props) => props.theme.breakpoints.xl} {
    left: 26rem;
  }

  img {
    width: 100%;
  }
`;

export const Body = styled.div`
  padding-bottom: 4.1875rem;
  padding-left: 7.1875rem;
  position: relative;
  width: 50%;

  @media only screen and (min-width: 0px) and (max-width: 450px) {
    width: 100%;
    padding: 0;
  }

  @media ${(props) => props.theme.breakpoints.sm} {
    width: 100%;
    padding: 0;
  }

  @media ${(props) => props.theme.breakpoints.md} {
    width: 100%;
    padding: 0;
  }

  @media ${(props) => props.theme.breakpoints.lg} {
    width: 100%;
    padding: 0;
  }

  &::before {
    position: absolute;
    content: ${({ year }) => `"${year}"`};
    font-weight: bold;
    color: rgba(255, 255, 255, 0.3);
    font-size: 22rem;
    top: -10rem;
    right: 1rem;
    z-index: 1;
    line-height: 1;
    letter-spacing: -1.8rem;

    @media only screen and (min-width: 0px) and (max-width: 450px) {
      font-size: 12rem;
      letter-spacing: -0.5rem;
      top: -5rem;
    }

    @media ${(props) => props.theme.breakpoints.sm} {
      font-size: 15rem;
      letter-spacing: -1rem;
      top: -8rem;
    }

    @media ${(props) => props.theme.breakpoints.md} {
      font-size: 12.5rem;
      right: unset;
      left: 0;
      top: -6rem;
    }

  }
`;

export const Description = styled.p`
  font-family: ${(props) => props.theme.fonts.main};
  font-weight: 200;
  font-size: 2.875rem;
  color: #222;
  line-height: 2;
  margin-bottom: 6.25rem;
  z-index: 2;
  position: relative;

  a {
    background: rgba(255, 255, 255, 0.6);
    border-radius: 0.5rem;
    padding: 0.25rem 1rem;

    &:hover {
      background: rgba(255, 255, 255, 1);
    }
  }
`;

export const CustomLink = styled.a`
  font-family: ${(props) => props.theme.fonts.main};
  font-weight: 100;
  font-size: 3.5625rem;
  color: #000;
  letter-spacing: -0.1206rem;
  margin-bottom: 1.25rem;
  margin-top: ${({ accent }) => (accent ? "4rem" : "0")};
  width: 100%;
  text-align: right;
  background: ${({ accent }) =>
    accent ? "rgba(255, 255, 255, 0.7)" : "rgba(255, 255, 255, 0.3)"};
  padding: 1rem;
  display: block;
  cursor: pointer;
  transition: 0.3s ease;
  position: relative;
  left: 0;

  &:hover {
    background: ${({ accent }) =>
      accent ? "rgba(255, 255, 255, 1)" : "rgba(255, 255, 255, 0.6)"};
    left: 6px;
  }
`;

export const CustomLink2 = styled.a`
  font-family: ${(props) => props.theme.fonts.main};
  font-weight: 100;
  font-size: 2.5rem;
  color: #000;
  width: 100%;
  cursor: pointer;
  transition: 0.3s ease;
  display: flex;
  background: ${({ accent }) =>
    accent ? "rgba(255, 255, 255, 0.7)" : "rgba(255, 255, 255, 0.3)"};
`;

export const CustomLink3 = styled.a`
  font-family: ${(props) => props.theme.fonts.main};
  font-weight: 100;
  font-size: 2.5rem;
  color: #000;
  margin-bottom: 1.25rem;
  margin-top: ${({ accent }) => (accent ? "4rem" : "0")};
  width: 100%;
  background: ${({ accent }) =>
    accent ? "rgba(255, 255, 255, 0.7)" : "rgba(255, 255, 255, 0.3)"};
  padding: 1rem;
  display: flex;
  cursor: pointer;
  transition: 0.3s ease;
  justify-content: end;
  position: relative;
  left: 0;

  &:hover {
    background: ${({ accent }) =>
      accent ? "rgba(255, 255, 255, 1)" : "rgba(255, 255, 255, 0.6)"};
    left: 6px;
  }
`;

export const TagList = styled.ul`
  display: flex;
  justify-content: end;
  padding: 10rem 0 2rem 0;
`;

export const Tag = styled.li`
  color: rgba(0, 0, 0, 0.6);
  background: rgba(255, 255, 255, 0.3);
  padding: 5px 10px;
  margin: 0 5px;
  font-size: 1.5rem;
`;
