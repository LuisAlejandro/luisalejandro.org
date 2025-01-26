import styled from "styled-components";

export const FooterWrapper = styled.section`
  width: 100%;
  max-width: 1040px;
  padding: 20rem calc((100% - 1040px) / 2) 40px;
  margin: 0;
  box-sizing: content-box;
  background: #333;

  @media ${(props) => props.theme.breakpoints.lg} {
    padding: 10rem 0 40px 0;
  }

  @media ${(props) => props.theme.breakpoints.md} {
    padding: 10rem 0 40px 0;
  }

  @media ${(props) => props.theme.breakpoints.sm} {
    padding: 10rem 0 40px 0;
  }

  @media ${(props) => props.theme.breakpoints.xs} {
    padding: 10rem 0 40px 0;
  }
`;

export const LinkItem = styled.a`
  font-size: 18px;
  line-height: 30px;
  color: rgba(255, 255, 255, 0.66);
  margin-bottom: 16px;
  transition: 0.3s ease;
  position: relative;
  left: 0;

  &:hover {
    color: rgba(255, 255, 255, 1);
    left: 6px;
  }

  @media ${(props) => props.theme.breakpoints.md} {
    font-size: 17px;
    line-height: 28px;
    display: flex;
  }

  @media ${(props) => props.theme.breakpoints.sm} {
    font-size: 15px;
    line-height: 14px;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
  }
`;

export const SocialIconsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;

  @media ${(props) => props.theme.breakpoints.xs} {
    flex-direction: column;
  }

  @media ${(props) => props.theme.breakpoints.sm} {
    flex-direction: column;
  }
`;

export const CompanyContainer = styled.div`
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  margin-right: auto;

  @media ${(props) => props.theme.breakpoints.xs} {
    display: flex;
    align-items: center;
    margin: 0;
  }

  @media ${(props) => props.theme.breakpoints.sm} {
    display: flex;
    align-items: center;
    margin: 0;
  }
`;

export const Slogan = styled.p`
  color: rgba(255, 255, 255, 0.5);
  min-width: 280px;
  letter-spacing: 0.02em;
  font-size: 18px;
  line-height: 30px;
  padding-top: 1rem;

  @media ${(props) => props.theme.breakpoints.xs} {
    line-height: 22px;
    font-size: 15px;
    text-align: center;
    width: 100%;
  }

  @media ${(props) => props.theme.breakpoints.sm} {
    line-height: 22px;
    font-size: 15px;
    text-align: center;
    width: 100%;
  }
`;

export const SocialContainer = styled.div`
  display: flex;
  align-items: center;

  @media ${(props) => props.theme.breakpoints.xs} {
    justify-content: center;
  }

  @media ${(props) => props.theme.breakpoints.sm} {
    justify-content: center;
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

export const LinkList = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, minmax(85px, 220px));
  gap: 40px;
  padding: 40px 0 28px;

  @media ${(props) => props.theme.breakpoints.lg} {
    padding: 32px 0 16px;
  }

  @media ${(props) => props.theme.breakpoints.md} {
    width: 100%;
    padding: 32px 0 16px;
    gap: 16px;
  }

  @media ${(props) => props.theme.breakpoints.sm} {
    width: 100%;
    padding: 32px 4px 16px;
    gap: 5px;
  }

  @media ${(props) => props.theme.breakpoints.xs} {
    width: 100%;
    padding: 32px 18px 16px;
    gap: 5px;
  }
`;

export const LinkColumn = styled.li`
  display: flex;
  flex-direction: column;
  max-width: 220px;
  width: 100%;
`;

export const LinkTitle = styled.h4`
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 24px;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.4);
  margin-bottom: 16px;

  @media ${(props) => props.theme.breakpoints.sm} {
    font-size: 10px;
    line-height: 12px;
    margin-bottom: 8px;
  }
`;
