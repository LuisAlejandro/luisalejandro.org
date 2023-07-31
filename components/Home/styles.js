import styled from 'styled-components';


export const Div3 = styled.div`
  grid-area: 1 / 5 / 2 / 6;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30px 0px;
  @media ${(props) => props.theme.breakpoints.sm} {
    align-items: center;
    grid-area: 1 / 4 / 2 / 6;
  }
`;

export const SocialIcons = styled.a`
  transition: 0.3s ease;
  color: ${(props) => props.theme.colors.navLink};
  padding: 5px;
  margin: 5px;
  border-radius: 10px;
  &:hover {
    color: ${(props) => props.theme.colors.navLinkHover};
    background-color: ${(props) => props.theme.colors.accent2};
    transform: scale(1.1);
    cursor: pointer;
  }
`