import styled from "styled-components";

export const Heading1 = styled.h1`
  font-size: 3.8rem;
  font-weight: 100;
  text-align: justify;
  margin: 60px auto 30px auto;
  width: 700px;
  color: rgb(60, 60, 60);

  span {
    font-weight: 900;
    font-family: ${(props) => props.theme.fonts.title};
  }

  @media ${(props) => props.theme.breakpoints.xs} {
    width: 100%;
    font-size: 2rem;
  }

  @media ${(props) => props.theme.breakpoints.sm} {
    width: 100%;
  }

  @media ${(props) => props.theme.breakpoints.md} {
    width: 100%;
  }

  @media ${(props) => props.theme.breakpoints.lg} {
    width: 100%;
  }
`;

export const Div1 = styled.div`
  font-size: 2rem;
  font-weight: 200;
  line-height: 1.5;
  text-align: justify;
  margin: 30px auto;
  width: 700px;
  color: rgb(60, 60, 60);

  span {
    font-weight: 900;
    font-family: ${(props) => props.theme.fonts.title};
  }

  a {
    background: rgb(237, 228, 206);
    border-radius: 5px;
    padding: 0px 5px;
    transition: background-color 0.2s ease-in, color 0.2s ease-in;

    &:hover {
      background-color: rgb(255, 255, 255);
      color: rgb(0, 0, 0);
    }
  }

  @media ${(props) => props.theme.breakpoints.xs} {
    width: 100%;
  }

  @media ${(props) => props.theme.breakpoints.sm} {
    width: 100%;
  }

  @media ${(props) => props.theme.breakpoints.md} {
    width: 100%;
  }

  @media ${(props) => props.theme.breakpoints.lg} {
    width: 100%;
  }
`;

export const Div2 = styled.div`
  grid-area: 1 / 5 / 2 / 6;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30px auto;
  width: 700px;

  ul {
    display: flex;
    width: 100%;
    img {
      width: 220px;
      border-radius: 10px;
      margin-bottom: 20px;
    }
  }

  @media ${(props) => props.theme.breakpoints.xs} {
    display: none;
    width: 100%;
    ul {
      img {
        width: 70px;
      }
    }
  }

  @media ${(props) => props.theme.breakpoints.sm} {
    width: 100%;
    ul {
      img {
        width: 100px;
      }
    }
  }

  @media ${(props) => props.theme.breakpoints.md} {
    width: 100%;
    ul {
      img {
        width: 170px;
      }
    }
  }

  @media ${(props) => props.theme.breakpoints.lg} {
    width: 100%;
    ul {
      img {
        width: 180px;
      }
    }
  }
`;

export const Div3 = styled.div`
  grid-area: 1 / 5 / 2 / 6;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;

  @media ${(props) => props.theme.breakpoints.xs} {
    margin-bottom: 20px;
    flex-direction: column;
  }
`;

export const SocialIcons = styled.a`
  display: inline-block;
  vertical-align: top;
  font-family: ${(props) => props.theme.fonts.main};
  font-weight: 300;
  line-height: 20px;
  text-transform: uppercase;
  height: 33px;
  padding: 3px 10px 7px 10px;
  margin: 0 0 24px 0;
  background-color: rgb(242, 217, 160);
  color: rgb(90, 90, 90);
  box-shadow: 0 -4px 0 rgba(255, 255, 255, 0.2) inset,
    0 -3px 0 rgba(0, 0, 0, 0.2) inset, -1px 0 0 rgba(0, 0, 0, 0.2) inset,
    1px 1px 0 rgba(0, 0, 0, 0.2) inset;
  transition: background-color 0.2s ease-in, color 0.2s ease-in;
  border-radius: 0;

  svg {
    display: inline-block;
    font-size: 24px;
  }

  span {
    display: inline-block;
    vertical-align: text-top;
    line-height: 24px;
    margin: 0 0 0 5px;
    font-size: 0.9em;
    font-weight: 300;
  }

  &:hover {
    background-color: rgb(237, 228, 206);
    color: rgb(0, 0, 0);
  }

  &:active {
    margin: 4px 0 20px 0;
    padding: 3px 10px;
    background-color: rgb(237, 228, 206);
    box-shadow: none;
    color: rgb(0, 0, 0);
  }

  @media ${(props) => props.theme.breakpoints.xs} {
    border-radius: 5px;
    display:block;
    width: 100%;
    text-align: center;
    margin: 0 0 4px 0;
    height: 63px;

    svg {
      display: inline-block;
      font-size: 54px;
    }

    span {
      display: none;
    }

    &:active {
      margin: 4px 0 0 0;
    }
  }
`;
