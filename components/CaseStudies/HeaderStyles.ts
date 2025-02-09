import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: 1fr;
  grid-column-gap: 2rem;
  // padding: 1rem;
  // padding-top: 2rem;
  // padding-bottom: 2rem;
  // padding: 2rem 5rem;
  padding: 2rem calc((100% - 1280px)/2);
`;

export const Div1 = styled.div`
  grid-area: 1 / 1 / 2 / 2;
  display: flex;
  flex-direction: row;
  align-content: center;
`;

export const Div2 = styled.ul`
  grid-area: 1 / 2 / 2 / 5;
  display: flex;
  justify-content: end;

  li {
    margin: 0 20px;
    line-height: 60px;
  }
`;

export const Div3 = styled.div`
  grid-area: 1 / 5 / 2 / 6;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media only screen and (min-width: 0px) and (max-width: 450px) {
    display: none;
  }

  @media ${(props) => props.theme.breakpoints.sm} {
    display: none;
  }
`;

// Navigation Links
export const NavLink = styled.a`
  font-size: 2rem;
  font-weight: 300;
  color: #aaa;
  transition: 0.4s ease;
  &:hover {
    color: #fff;
    cursor: pointer;
  }
  @media ${(props) => props.theme.breakpoints.sm} {
    padding: 0.5rem;
    font-size: 1.7rem;
  }
`;

export const SocialIcons = styled.a`
  transition: 0.3s ease;
  color: #aaa;
  border-radius: 50px;
  padding: 8px;
  margin: 0 8px;

  &:hover {
    color: #fff;
    background-color: #555;
    transform: scale(1.2);
    cursor: pointer;
  }
`;
