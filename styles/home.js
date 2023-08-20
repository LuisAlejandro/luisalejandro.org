import { css } from "styled-components";

const partialHomeStyles = css`
  #app {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding: 60px 0 0 0;

    .home {
      display: inline-block;
      width: 100%;

      .footer {
        font-family: ${(props) => props.theme.fonts.main};
        font-weight: 300;
        color: rgba(0, 0, 0, 0.4);
        margin-bottom: 20px;
      }
    }
  }
`;

export default partialHomeStyles;
