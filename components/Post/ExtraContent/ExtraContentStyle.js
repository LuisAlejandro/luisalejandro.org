import styled from "styled-components";

export const Container = styled.div`
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;
  margin-bottom: 30px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 1fr;
  grid-column-gap: 2rem;
  // padding: 1rem;
  // padding-top: 2rem;

  // @media ${(props) => props.theme.breakpoints.sm} {
  //   display: grid;
  //   grid-template-columns: repeat(5, 1fr);
  //   grid-template-rows: repeat(2, 60px);
  //   grid-column-gap: 0.5rem;
  //   grid-row-gap: 0.5rem;
  // }
`;

export const Div1 = styled.div`
  grid-area: 1 / 1 / 2 / 2;
  display: flex;
  flex-direction: row;
  align-content: center;
  // @media ${(props) => props.theme.breakpoints.sm} {
  //   grid-area: 1 / 1 / 2 / 3;
  // }
`;

export const Div2 = styled.div`
  grid-area: 1 / 2 / 2 / 3;
  display: flex;
  justify-content: end;
  // @media ${(props) => props.theme.breakpoints.sm} {
  //   grid-area: 2 / 2 / 3 / 5;
  // }
`;

export const Div3 = styled.div`
  grid-area: 1 / 3 / 2 / 4;
  display: flex;
  justify-content: space-between;
  align-items: center;
  // @media ${(props) => props.theme.breakpoints.sm} {
  //   align-items: center;
  //   grid-area: 1 / 4 / 2 / 6;
  // }
`;
