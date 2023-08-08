import styled from "styled-components";

export const LeftSection = styled.div`
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;

  .button1 {
    display: inline-block;
    vertical-align: top;
    margin: 5px 1%;
    width: 200px;

    a {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2em;
      font-weight: 200;
      height: 64px;
      line-height: 20px;
      margin: 0 0 80px 0;
      padding: 3px 5px 7px 5px;
      color: rgb(90, 90, 90);
      box-shadow: 0 -6px 0 rgba(255, 255, 255, 0.3) inset,
        0 -5px 0 rgba(0, 0, 0, 0.3) inset, -1px 0 0 rgba(0, 0, 0, 0.3) inset,
        1px 1px 0 rgba(0, 0, 0, 0.3) inset;
      background-color: rgb(171, 183, 183);
      background-image: radial-gradient(
        ellipse closest-side at 50% 50%,
        rgba(255, 255, 255, 0.4),
        rgba(255, 255, 255, 0)
      );
      transition: background-color 0.4s ease-out;
      border-radius: 15px;
    }

    a:hover {
      background-color: rgb(192 206 206);
    }

    a:active {
      padding: 3px 5px;
      margin: 4px 0 76px 0;
      box-shadow: 0px -2px 2px rgba(0, 0, 0, 0.2) inset;
      background-color: rgb(192 206 206);
    }
  }

  .button2 {
    display: inline-block;
    vertical-align: top;
    margin: 5px 1%;
    width: 200px;

    a {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2em;
      font-weight: 200;
      height: 64px;
      line-height: 20px;
      margin: 0 0 80px 0;
      padding: 3px 5px 7px 5px;
      background-color: rgb(210, 210, 210);
      color: rgb(90, 90, 90);
      box-shadow: 0 -4px 0 rgba(255, 255, 255, 0.3) inset,
        0 -3px 0 rgba(0, 0, 0, 0.3) inset, -1px 0 0 rgba(0, 0, 0, 0.3) inset,
        1px 1px 0 rgba(0, 0, 0, 0.3) inset;
      transition: background-color 0.2s ease-in;
      border-radius: 15px;
    }

    a:hover {
      background-color: rgb(255, 255, 255);
    }

    a:active {
      padding: 3px 5px;
      margin: 4px 0 76px 0;
      background-color: rgb(255, 255, 255);
      box-shadow: none;
    }
  }

  @media ${(props) => props.theme.breakpoints.sm} {
    width: 80%;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
  }

  @media ${(props) => props.theme.breakpoints.md} {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
  }
`;
