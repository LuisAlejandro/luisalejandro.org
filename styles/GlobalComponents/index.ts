import styled from "styled-components";

export const Section = styled.section`
  display: ${(props) => (props.grid ? "grid" : "flex")};
  flex-direction: ${(props) => (props.row ? "row" : "column")};
  padding: ${(props) =>
    props.nopadding
      ? "0"
      : props.accent1 || props.accent2
      ? "32px calc((100% - 1040px)/2)"
      : "32px 48px 0"};
  background: ${(props) =>
    props.accent1
      ? "#f8d983"
      : props.accent2
      ? "#da8244"
      : props.color || "transparent"};
  margin: 0 auto;
  width: 100%;
  max-width: ${(props) => (props.wide ? "80%" : "1040px")};
  box-sizing: content-box;
  position: relative;
  overflow: ${(props) => (props.overflowVisible ? "visible" : "hidden")};
  grid-template-columns: ${(props) => (props.oneColumn ? "1fr" : "1fr 1fr")};

  h1 {
    font-weight: 200;
    font-size: 2.5em;
    margin: 40px auto;
    width: 100%;
    max-width: 94%;
  }

  .termspriv {
    h2 {
      font-weight: 200;
      font-size: 1.5em;
      margin: 20px auto;
      width: 100%;
      max-width: 94%;
    }

    h3 {
      font-weight: 200;
      font-size: 1.1em;
      margin: 20px auto;
      width: 100%;
      max-width: 94%;
    }

    h4 {
      font-weight: 200;
      font-size: 1em;
      margin: 10px auto;
      width: 100%;
      max-width: 94%;
    }

    p,
    li {
      font-size: 1em;
      line-height: 1.4em;
      margin: 5px auto;
      width: 100%;
      max-width: 94%;
    }
  }

  @media ${(props) => props.theme.breakpoints.xs} {
    display: flex;
    flex-direction: column;
    max-width: calc(100% - 64px);
    padding: 24px 32px 0;
  }

  @media ${(props) => props.theme.breakpoints.sm} {
    display: flex;
    flex-direction: column;
    max-width: calc(100% - 64px);
    padding: 24px 32px 0;
  }

  @media ${(props) => props.theme.breakpoints.md} {
    display: flex;
    flex-direction: column;
    max-width: calc(100% - 64px);
    padding: 24px 32px 0;
  }

  @media ${(props) => props.theme.breakpoints.lg} {
    display: flex;
    flex-direction: column;
    max-width: calc(100% - 64px);
    padding: 24px 32px 0;
  }
`;

export const SectionTitle = styled.h2`
  font-weight: 800;
  font-size: ${(props) => (props.main ? "65px" : "56px")};
  line-height: ${(props) => (props.main ? "72px" : "67px")};
  width: max-content;
  max-width: 100%;
  background: linear-gradient(
    121.57deg,
    rgba(34, 34, 34, 1) 18.77%,
    rgba(34, 34, 34, 0.8) 60.15%
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 16px;
  padding: ${(props) => (props.main ? "58px 0 16px" : "0")};

  @media ${(props) => props.theme.breakpoints.md} {
    font-size: ${(props) => (props.main ? "56px" : "48px")};
    line-height: ${(props) => (props.main ? "56px" : "48px")};
    margin-bottom: 12px;
    padding: ${(props) => (props.main ? "40px 0 12px" : "0")};
  }

  @media ${(props) => props.theme.breakpoints.sm} {
    font-size: 32px;
    line-height: 40px;
    font-size: ${(props) => (props.main ? "28px" : "32px")};
    line-height: ${(props) => (props.main ? "32px" : "40px")};
    margin-bottom: 8px;
    padding: ${(props) => (props.main ? "16px 0 8px" : "0")};
    max-width: 100%;
  }

  @media ${(props) => props.theme.breakpoints.xs} {
    font-size: 32px;
    line-height: 40px;
    font-size: ${(props) => (props.main ? "28px" : "32px")};
    line-height: ${(props) => (props.main ? "32px" : "40px")};
    margin-bottom: 8px;
    padding: ${(props) => (props.main ? "16px 0 8px" : "0")};
    max-width: 100%;
  }
`;

export const SectionText = styled.p`
  max-width: 800px;
  font-size: 24px;
  line-height: 40px;
  font-weight: 300;
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

  @media ${(props) => props.theme.breakpoints.xs} {
    font-size: 16px;
    line-height: 24px;
    padding-bottom: 16px;
  }
`;

export const SectionDivider = styled.div`
  width: 64px;
  height: 6px;
  margin: ${(props) => (props.divider ? "4rem 0" : "")};
  border-radius: 10px;
  background-color: #fff;
  background: ${(props) =>
    props.colorAlt
      ? "linear-gradient(270deg, #F46737 0%, #945DD6 100%)"
      : "linear-gradient(270deg, #13ADC7 0%, #945DD6 100%)"};

  @media ${(props) => props.theme.breakpoints.md} {
    width: 48px;
    height: 4px;
  }

  @media ${(props) => props.theme.breakpoints.sm} {
    width: 32px;
    height: 2px;
  }
`;
export const SectionSubText = styled.p`
  max-width: 800px;
  font-weight: 300;
  font-size: 18px;
  line-height: 32px;
  color: rgba(255, 255, 255, 0.75);

  @media ${(props) => props.theme.breakpoints.md} {
    max-width: 672px;
    font-size: 16px;
    line-height: 25px;
  }

  @media ${(props) => props.theme.breakpoints.sm} {
    font-size: 14px;
    line-height: 22px;
  }
`;
export const SecondaryBtn = styled.button`
  color: #fff;
  background: none;
  border: 1px solid rgba(255, 255, 255, 0.33);
  box-sizing: border-box;
  border-radius: 999px;
  padding: 16px 24px;
  font-weight: 600;
  font-size: 18px;
  line-height: 16px;
  width: fit-content;
  margin-top: 32px;
  margin-bottom: 80px;
  cursor: pointer;
  transition: 0.4s ease;
  &:focus {
    outline: none;
  }

  &:hover {
    color: #0f1624;
    background: #fff;
    border: 1px solid #fff;
  }

  &:active {
    background: #e0e4eb;
    border: 1px solid #304169;
    box-shadow: inset 0px 2px 1px rgba(46, 49, 55, 0.15),
      inset 0px 0px 4px rgba(20, 20, 55, 0.3);
  }

  @media ${(props) => props.theme.breakpoints.md} {
    margin-top: 24px;
    margin-bottom: 64px;
    padding: 16px 24px;
    width: fit-content;
    font-size: 20px;
    line-height: 20px;
  }

  @media ${(props) => props.theme.breakpoints.sm} {
    margin-top: 16px;
    margin-bottom: 40px;
    padding: 8px 16px;
    width: 100%;
    font-size: 14px;
    line-height: 16px;
  }
`;

export const LinkContainer = styled.div`
  margin-left: ${({ large }) => (large ? "24px" : "16px")};
  transition: 0.3s ease;
  justify-content: center;
  border-radius: 50px;
  padding: 8px;

  &:hover {
    background-color: #212d45;
    transform: scale(1.2);
    cursor: pointer;
  }

  @media ${(props) => props.theme.breakpoints.md} {
    margin-left: ${({ large }) => (large ? "16px" : "8px")};
  }
  @media ${(props) => props.theme.breakpoints.sm} {
    margin-left: ${({ large }) => (large ? "0" : "8px")};
  }
`;

export const LinkIconImg = styled.div`
  display: flex;
  height: ${({ large }) => (large ? "32px" : "24px")};

  @media ${(props) => props.theme.breakpoints.md} {
    height: ${({ nav }) => (nav ? "16px" : "24px")};
  }

  @media ${(props) => props.theme.breakpoints.sm} {
    height: ${({ large }) => (large ? "32px" : "16px")};
  }
`;
