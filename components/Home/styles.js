import styled from "styled-components";

export const Heading1 = styled.h1`
  font-size: 2.5rem;
  font-weight: 100;
  margin: 60px auto 30px auto;
  width: 700px;
  text-align: justify;
  color: rgb(60, 60, 60);
  span {
    font-weight: 900;
  }
`;

export const Div1 = styled.div`
  margin: 30px auto;
  width: 700px;
  text-align: justify;
  font-size: 1.2rem;
  font-weight: 200;
  line-height: 1.5;
  color: rgb(60, 60, 60);

  span {
    font-weight: 900;
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
      width: 200px;
      border-radius: 10px;
      margin-bottom: 20px;
    }
  }
  @media ${(props) => props.theme.breakpoints.sm} {
    align-items: center;
    grid-area: 1 / 4 / 2 / 6;
  }
`;

export const Div3 = styled.div`
  grid-area: 1 / 5 / 2 / 6;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  @media ${(props) => props.theme.breakpoints.sm} {
    align-items: center;
    grid-area: 1 / 4 / 2 / 6;
  }
`;

export const SocialIcons = styled.a`
  display: inline-block;
  vertical-align: top;
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

  span {
    display: inline-block;
    vertical-align: top;
    line-height: 23px;
    margin: 0 0 0 5px;
    font-size: 1.1em;
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
`;
