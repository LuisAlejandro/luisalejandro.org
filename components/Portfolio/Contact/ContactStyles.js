import styled from "styled-components";

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  width: 100%;
  padding: 0;
  margin: 0;
  background-color: ${(props) => (props.transparent ? "transparent" : "#aaa")};

  @media ${(props) => props.theme.breakpoints.md} {
    padding: 24px 48px 0;
    flex-direction: column;
  }

  @media ${(props) => props.theme.breakpoints.sm} {
    padding: "16px 16px 0";
    width: calc(100vw - 32px);
    flex-direction: column;
  }
`;

export const SectionTitle = styled.h2`
  font-weight: 800;
  font-size: 65px;
  line-height: 72px;
  width: 100%;
  max-width: 1040px;
  background: linear-gradient(
    121.57deg,
    rgba(34, 34, 34, 1) 18.77%,
    rgba(34, 34, 34, 0.8) 60.15%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0 auto;
  margin-bottom: 16px;
  padding: 58px 0 16px;

  @media ${(props) => props.theme.breakpoints.md} {
    font-size: 56px;
    line-height: 56px;
    margin-bottom: 12px;
    padding: 40px 0 12px;
  }

  @media ${(props) => props.theme.breakpoints.sm} {
    font-size: 32px;
    line-height: 40px;
    font-size: 28px;
    line-height: 32px;
    margin-bottom: 8px;
    padding: 16px 0 8px;
    max-width: 100%;
  }
`;

export const SectionText = styled.p`
  font-weight: 300;
  font-size: 24px;
  line-height: 40px;
  width: 100%;
  max-width: 1040px;
  margin: 0 auto;
  margin-bottom: 16px;
  padding-bottom: 3.6rem;
  color: ${(props) => props.theme.colors.primary1};

  @media ${(props) => props.theme.breakpoints.md} {
    max-width: 670px;
    font-size: 20px;
    line-height: 32px;
    padding-bottom: 24px;
  }

  @media ${(props) => props.theme.breakpoints.sm} {
    font-size: 16px;
    line-height: 24px;
    padding-bottom: 16px;
  }
`;
