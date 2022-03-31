import { css } from 'styled-components'

const partialPortfolioStyles = css`
#portfolio-bg {
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
`

export default partialPortfolioStyles