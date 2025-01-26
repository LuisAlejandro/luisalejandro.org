import { css } from "styled-components";

const partialPortfolioStyles = css`
  #about {
    .container-clients {
      height: 250px;
      width: 250px;
      position: absolute;
      top: 0;
      right: calc(((100% - 1040px) / 2) - 20px);
      opacity: 0.5;
      transform: rotateZ(30deg);
    }
  }

  #projects {
    .container-about {
      height: 300px;
      width: 300px;
      position: absolute;
      top: 0;
      right: calc(((100% - 1040px) / 2) - 40px);
      opacity: 0.5;
      transform: rotateZ(30deg);
    }
  }

  #skills {
    margin-top: 60px;
  }

  #about {
    padding-top: 100px;
  }

  #portfolio-bg {
    position: relative;
    top: -50px;
    right: -50px;

    @media ${(props) => props.theme.breakpoints.xs} {
      display: none;
    }

    @media ${(props) => props.theme.breakpoints.sm} {
      display: none;
    }

    @media ${(props) => props.theme.breakpoints.md} {
      display: none;
    }

    @media ${(props) => props.theme.breakpoints.lg} {
      display: none;
    }

    .container-portfolio {
      height: 500px;
      width: 500px;
      position: absolute;
      bottom: 0;
      right: 0;
      transform: translate(0px, 0px) rotateZ(30deg);
    }

    .container-blog {
      height: 250px;
      width: 250px;
      position: absolute;
      bottom: 0;
      right: 0;
      transform: translate(-450px, 50px) rotateZ(-30deg);
    }

    .container-contact {
      height: 150px;
      width: 150px;
      position: absolute;
      bottom: 0;
      right: 0;
      transform: translate(-450px, -300px) rotateZ(-50deg);
    }

    .container-donations {
      height: 170px;
      width: 170px;
      position: absolute;
      bottom: 0;
      right: 0;
      transform: translate(0px, 100px) rotateZ(150deg);
    }

    .container-easter {
      height: 300px;
      width: 300px;
      position: absolute;
      bottom: 0;
      right: 0;
      transform: translate(-250px, 250px) rotateZ(20deg);
    }
  }
`;

export default partialPortfolioStyles;
