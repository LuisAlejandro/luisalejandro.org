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

  @media ${(props) => props.theme.breakpoints.xs} {
    padding-left: 16px;
    padding-right: 16px;
    font-size: 32px;
    line-height: 40px;
    font-size: ${(props) => (props.main ? "28px" : "32px")};
    line-height: ${(props) => (props.main ? "32px" : "40px")};
    margin-bottom: 8px;
    max-width: 100%;
  }

  @media ${(props) => props.theme.breakpoints.sm} {
    padding-left: 16px;
    padding-right: 16px;
    font-size: 32px;
    line-height: 40px;
    font-size: ${(props) => (props.main ? "28px" : "32px")};
    line-height: ${(props) => (props.main ? "32px" : "40px")};
    margin-bottom: 8px;
    max-width: 100%;
  }

  @media ${(props) => props.theme.breakpoints.md} {
    padding-left: 16px;
    padding-right: 16px;
    font-size: ${(props) => (props.main ? "56px" : "48px")};
    line-height: ${(props) => (props.main ? "56px" : "48px")};
    margin-bottom: 12px;
  }

  @media ${(props) => props.theme.breakpoints.lg} {
    padding-left: 16px;
    padding-right: 16px;
  }

  @media ${(props) => props.theme.breakpoints.xl} {
    padding-left: 16px;
    padding-right: 16px;
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

  @media ${(props) => props.theme.breakpoints.xs} {
    padding-left: 16px;
    padding-right: 16px;
    font-size: 16px;
    line-height: 24px;
    padding-bottom: 16px;
  }

  @media ${(props) => props.theme.breakpoints.sm} {
    padding-left: 16px;
    padding-right: 16px;
    font-size: 16px;
    line-height: 24px;
    padding-bottom: 16px;
  }

  @media ${(props) => props.theme.breakpoints.md} {
    padding-left: 16px;
    padding-right: 16px;
    max-width: 670px;
    font-size: 20px;
    line-height: 32px;
    padding-bottom: 24px;
  }

  @media ${(props) => props.theme.breakpoints.lg} {
    padding-left: 16px;
    padding-right: 16px;
  }

  @media ${(props) => props.theme.breakpoints.xl} {
    padding-left: 16px;
    padding-right: 16px;
  }
`;
