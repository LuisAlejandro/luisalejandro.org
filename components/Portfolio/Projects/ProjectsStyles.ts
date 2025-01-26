import styled from "styled-components";

export const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  overflow: hidden;
`;

export const GridContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  padding-top: 3rem;
  padding-bottom: 3rem;
  place-items: center;
  column-gap: 3rem;
  row-gap: 3rem;
  margin-bottom: 10rem;

  a {
    width: 100%;
  }

  @media ${(props) => props.theme.breakpoints.xs} {
    display: flex;
    flex-direction: column;
    padding: 2rem 0;
    padding-bottom: 1.5rem;
    column-gap: 1rem;
    row-gap: 1rem;
  }
`;

export const BlogCard = styled.div`
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.2);
  text-align: center;
  width: 100%;
  @media ${(props) => props.theme.breakpoints.sm} {
    width: 100%;
  }
`;

export const HeaderThree = styled.h3`
  font-weight: 500;
  letter-spacing: 2px;
  color: #222222;
  padding: 0.5rem 0;
  margin-top: 1rem;
  font-size: ${(props) => (props.title ? "3rem" : "2rem")};
`;

export const Hr = styled.hr`
  width: 50px;
  height: 3px;
  margin: 8px auto;
  border: 0;
  background: #d0bb57;
`;

export const Intro = styled.div`
  width: 170px;
  margin: 0 auto;
  color: #222222;
  font-size: 13px;
  font-style: italic;
  line-height: 18px;
`;

export const CardInfo = styled.p`
  width: 100%;
  padding: 0 50px;
  color: #222222;
  font-style: 2rem;
  line-height: 24px;
  text-align: center;
  margin-top: 2rem;
  @media ${(props) => props.theme.breakpoints.sm} {
    padding: 0.3rem;
  }
`;

export const TagList = styled.ul`
  display: flex;
  justify-content: center;
  padding: 2rem;
  @media ${(props) => props.theme.breakpoints.xs} {
    display: none;
  }
`;

export const Tag = styled.li`
  color: #222;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 15px;
  padding: 5px 10px;
  margin: 0 2px;
  font-size: 1.5rem;
`;
