import { css } from "styled-components";

const partialHomeStyles = css`
  html,
  body {
    width: 100%;
    height: 100%;
    background-color: #f5cc6a;
  }

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
        color: rgba(0, 0, 0, 0.4);
        margin-bottom: 20px;
      }
    }
  }
`;

export default partialHomeStyles;
