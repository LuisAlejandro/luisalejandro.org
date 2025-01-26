import styled from "styled-components";

export const Container = styled.div`
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;
  margin-bottom: 30px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: 1fr;
  grid-column-gap: 2rem;
  padding: 1rem;
  padding-top: 2rem;

  @media ${(props) => props.theme.breakpoints.xs} {
    display: flex;
  }
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

  @media ${(props) => props.theme.breakpoints.xs} {
    display: none;
  }
`;

// Navigation Links
export const NavLink = styled.a`
  font-size: 2rem;
  font-weight: 300;
  color: ${(props) => props.theme.colors.navLink};
  transition: 0.4s ease;
  &:hover {
    color: ${(props) => props.theme.colors.navLinkHover};
    cursor: pointer;
  }

  @media ${(props) => props.theme.breakpoints.xs} {
    padding: 0.5rem;
    font-size: 1.7rem;
  }
`;

// Social Icons
export const SocialIcons = styled.a`
  transition: 0.3s ease;
  color: ${(props) => props.theme.colors.navLink};
  border-radius: 50px;
  padding: 8px;
  &:hover {
    color: ${(props) => props.theme.colors.navLinkHover};
    background-color: ${(props) => props.theme.colors.accent2};
    transform: scale(1.2);
    cursor: pointer;
  }
`;
