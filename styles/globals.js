import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";

import partialHomeStyles from "./home";
import partialPortfolioStyles from "./portfolio";

const HomeStyles = createGlobalStyle`
  ${normalize};
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  html {
    font-size: 62.5%;
    scroll-behavior: smooth;
  }
  body {
    font-family: ${(props) => props.theme.fonts.main};
    font-size: 1.6rem;
    background-color: #f5cc6a;
    color: ${(props) => props.theme.colors.primary1};
    cursor: default;
    overflow-x: hidden;
  }
  h1,h2,h3,h4,h5,h6,button {
    font-family: ${(props) => props.theme.fonts.main};
  }
  a {
    text-decoration: none;
  }
  li{
    list-style: none;
  }
  ${partialHomeStyles}
`;

const PortfolioStyles = createGlobalStyle`
  ${normalize};
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  html {
    font-size: 62.5%;
    scroll-behavior: smooth;
  }
  body {
    font-family: ${(props) => props.theme.fonts.main};
    font-size: 1.6rem;
    background: linear-gradient(180deg,#e68449,#f1b161 15%,#f5cc6a);
    color: ${(props) => props.theme.colors.primary1};
    cursor: default;
    overflow-x: hidden;
  }
  h1,h2,h3,h4,h5,h6,button {
    font-family: ${(props) => props.theme.fonts.title};
  }
  a {
    text-decoration: none;
  }
  li {
    list-style: none;
  }
  ${partialPortfolioStyles}
`;

const CaseStudiesDetailsStyles = createGlobalStyle`
  ${normalize};
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  html {
    font-size: 62.5%;
    scroll-behavior: smooth;
  }
  body {
    font-family: ${(props) => props.theme.fonts.main};
    font-size: 1.6rem;
    color: ${(props) => props.theme.colors.primary1};
    cursor: default;
    overflow-x: hidden;
  }
  h1,h2,h3,h4,h5,h6,button {
    font-family: ${(props) => props.theme.fonts.title};
  }
  a {
    text-decoration: none;
  }
  li {
    list-style: none;
  }
`;

const BlogStyles = createGlobalStyle`
  ${normalize};
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 62.5%;
    scroll-behavior: smooth;
  }

  body {
    font-family: ${(props) => props.theme.fonts.main};
    font-size: 1.6rem;
    cursor: default;
    overflow-x: hidden;
    line-height: 1em;
    background: #ddd;
    color: rgb(0, 0, 0);
  }

  h1,h2,h3,h4,h5,h6,button {
    font-family: ${(props) => props.theme.fonts.main};
  }

  a {
    text-decoration: none;
  }
  
  li {
    list-style: none;
  }
`;

const BlogPostStyles = createGlobalStyle`
  ${normalize};
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 62.5%;
    scroll-behavior: smooth;
  }

  body {
    font-family: ${(props) => props.theme.fonts.main};
    font-size: 1.6rem;
    cursor: default;
    overflow-x: hidden;
    line-height: 1em;
    background: #ddd;
    color: rgb(0, 0, 0);
  }

  h1,h2,h3,h4,h5,h6,button {
    font-family: ${(props) => props.theme.fonts.main};
  }

  a {
    text-decoration: none;
  }
  
  li {
    list-style: none;
  }
`;

export {
  HomeStyles,
  PortfolioStyles,
  CaseStudiesDetailsStyles,
  BlogStyles,
  BlogPostStyles,
};
