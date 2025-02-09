import styled from "styled-components";

export const CarouselContainer = styled.ul`
  display: flex;
  flex-direction: row;
  list-style: none;
  padding: 0;
  width: 100%;
  justify-content: space-between;

  @media only screen and (min-width: 0px) and (max-width: 450px) {
    flex-direction: column;
  }

  @media ${(props) => props.theme.breakpoints.sm} {
    flex-direction: column;
  }

  @media ${(props) => props.theme.breakpoints.md} {
    flex-direction: column;
  }
`;

export const CarouselItem = styled.li`
  margin: 10px 0;

  @media only screen and (min-width: 0px) and (max-width: 450px) {
    width: 100%;
  }
`;

export const CarouselItemTitle = styled.h4`
  font-weight: bold;
  font-size: 42px;
  line-height: 42px;
  letter-spacing: 0.02em;
  display: flex;
  background: linear-gradient(
    121.57deg,
    rgba(34, 34, 34, 0.66) 10%,
    rgba(34, 34, 34, 0.66) 30.15%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 8px;

  @media ${(props) => props.theme.breakpoints.md} {
    font-size: 20px;
    line-height: 28px;
    margin-bottom: 4px;
  }

  @media ${(props) => props.theme.breakpoints.sm} {
    font-size: 20px;
    line-height: 28px;
  }
`;

export const CarouselItemText = styled.p`
  font-size: 14px;
  line-height: 22px;
  letter-spacing: 0.02em;
  padding-right: 16px;

  @media ${(props) => props.theme.breakpoints.md} {
    font-size: 12px;
    line-height: 18px;
    padding-right: 32px;
  }
  @media ${(props) => props.theme.breakpoints.sm} {
    font-size: 11px;
    line-height: 18px;
    padding-right: 0;
  }
`;
