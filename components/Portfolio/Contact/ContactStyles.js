import styled from "styled-components"


export const GridContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  padding-top: 3rem;
  padding-bottom: 3rem;
  place-items: center;
  column-gap: 1rem;
  row-gap: 3rem;
  margin-bottom: 10rem;
  @media ${(props) => props.theme.breakpoints.sm} {
    display: flex;
    flex-direction: column;
    padding: 2rem;
    padding-bottom: 1.5rem;
  }
`;

export const FormItem = styled.div`
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.2);
  text-align: center;
  width: 95%;
  @media ${(props) => props.theme.breakpoints.sm} {
    width: 100%;
  }
`;