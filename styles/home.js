import { css } from 'styled-components'

const partialHomeStyles = css`
html,
body {
  width: 100%;
  height: 100%;
  background-color: #fff;
  overflow: hidden;
}

#app {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 20% 0 0 0;
  
  .container-loader {
    display: inline-block;
    position: absolute;
    height: 120px;
    width: 20%;
    top: 60%;
    left: 40%;
  }
  
  #home {
    display: inline-block;
    width: 100%;
    
    .container-portfolio {
      height: 500px;
      width: 500px;
      position: absolute;
      bottom: 0;
      right: 0;
      z-index: 20;
      filter: grayscale(100%);
      cursor: pointer;
      animation: animation-focus-leave 0.25s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
      transform: translate(700px, 100px);
    }
    
    .container-portfolio:hover {
      animation: animation-focus-enter 0.25s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
    }
    
    .container-about {
      height: 350px;
      width: 350px;
      position: absolute;
      top: 0;
      right: -2%;
      z-index: 20;
      filter: grayscale(100%);
      cursor: pointer;
      animation: animation-focus-leave 0.25s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
      transform: translate(500px, -300px);
    }
    
    .container-about:hover {
      animation: animation-focus-enter 0.25s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
    }
    
    .container-contact {
      height: 200px;
      width: 200px;
      position: absolute;
      bottom: 5%;
      right: 30%;
      z-index: 20;
      filter: grayscale(100%);
      cursor: pointer;
      animation: animation-focus-leave 0.25s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
      transform: translate(300px, 500px);
    }
    
    .container-contact:hover {
      animation: animation-focus-enter 0.25s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
    }
    
    .container-donations {
      height: 170px;
      width: 170px;
      position: absolute;
      bottom: 30%;
      right: 30%;
      z-index: 20;
      filter: grayscale(100%);
      cursor: pointer;
      animation: animation-focus-leave 0.25s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
      transform: translate(100px, 500px);
    }
    
    .container-donations:hover {
      animation: animation-focus-enter 0.25s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
    }
    
    .container-easter {
      height: 400px;
      width: 400px;
      position: absolute;
      bottom: -10%;
      right: 40%;
      z-index: 20;
      filter: grayscale(100%);
      cursor: pointer;
      animation: animation-focus-leave 0.25s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
      transform: translate(-100px, 500px);
    }
    
    .container-easter:hover {
      animation: animation-focus-enter 0.25s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
    }
    
    .container-blog {
      height: 350px;
      width: 350px;
      position: absolute;
      bottom: -10%;
      right: 60%;
      z-index: 20;
      filter: grayscale(100%);
      cursor: pointer;
      animation: animation-focus-leave 0.25s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
      transform: translate(100px, 500px);
    }
    
    .container-blog:hover {
      animation: animation-focus-enter 0.25s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
    }
    
    .container-clients {
      height: 250px;
      width: 250px;
      position: absolute;
      top: 5%;
      right: 18%;
      z-index: 20;
      filter: grayscale(100%);
      cursor: pointer;
      animation: animation-focus-leave 0.25s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
      transform: translate(100px, -600px);
    }
    
    .container-clients:hover {
      animation: animation-focus-enter 0.25s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
    }
    
    .container-page-home {
      height: 900px;
      width: 900px;
      position: absolute;
      top: -45%;
      left: 0;
      z-index: 10;
      filter: grayscale(100%);
      transform: translate(-1000px, -1500px);
    }
    
    .container-page-portfolio {
      height: 900px;
      width: 900px;
      position: absolute;
      top: -44%;
      left: -0.25%;
      z-index: 8;
      filter: grayscale(100%);
      cursor: pointer;
      transform: translate(-500px, -1500px);
    }
    
    .container-page-about {
      height: 900px;
      width: 900px;
      position: absolute;
      top: -43%;
      left: -0.5%;
      z-index: 7;
      filter: grayscale(100%);
      cursor: pointer;
      transform: translate(-200px, -1500px);
    }
    
    .container-page-blog {
      height: 900px;
      width: 900px;
      position: absolute;
      top: -42%;
      left: 0;
      z-index: 6;
      filter: grayscale(100%);
      cursor: pointer;
      transform: translate(500px, -1500px);
    }
    
    .container-page-clients {
      height: 900px;
      width: 900px;
      position: absolute;
      top: -41%;
      left: 0;
      z-index: 5;
      filter: grayscale(100%);
      cursor: pointer;
      transform: translate(700px, -2000px);
    }
    
    .container-page-contact {
      height: 900px;
      width: 900px;
      position: absolute;
      top: -40%;
      left: 0.5%;
      z-index: 4;
      filter: grayscale(100%);
      cursor: pointer;
      transform: translate(700px, -2000px);
    }
    
    .container-page-donations {
      height: 900px;
      width: 900px;
      position: absolute;
      top: -40%;
      left: 1%;
      z-index: 3;
      filter: grayscale(100%);
      cursor: pointer;
      transform: translate(1500px, -1700px);
    }
    
    .container-page-easter {
      height: 900px;
      width: 900px;
      position: absolute;
      top: -40%;
      left: 2%;
      z-index: 2;
      filter: grayscale(100%);
      cursor: pointer;
      transform: translate(1000px, -1500px);
    }
  }
}

.animation-focus-easter-enter {
  animation: animation-focus-easter-enter 0.25s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}
.animation-focus-easter-leave {
	animation: animation-focus-easter-leave 0.25s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}

@keyframes animation-focus-easter-enter {
  0% {
    transform: rotate(-10deg) translateY(0px);
    filter: grayscale(100%);
  }
  100% {
    transform: rotate(-10deg) translateY(-40px);
    filter: grayscale(0);
  }
}

@keyframes animation-focus-easter-leave {
  0% {
    transform: rotate(-10deg) translateY(-40px);
    filter: grayscale(0);
  }
  100% {
    transform: rotate(-10deg) translateY(0px);
    filter: grayscale(100%);
  }
}


.animation-reaction-pages-enter {
  animation: animation-reaction-pages-enter 0.25s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}
.animation-reaction-pages-leave {
	animation: animation-reaction-pages-leave 0.25s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}

@keyframes animation-reaction-pages-enter {
  0% {
    transform: rotate(-20deg) translateY(0px);
    filter: grayscale(100%);
  }
  100% {
    transform: rotate(-20deg) translateY(-400px);
    filter: grayscale(0);
  }
}

@keyframes animation-reaction-pages-leave {
  0% {
    transform: rotate(-20deg) translateY(-400px);
    filter: grayscale(0);
  }
  100% {
    transform: rotate(-20deg) translateY(0px);
    filter: grayscale(100%);
  }
}


.animation-focus-enter {
  animation: animation-focus-enter 0.25s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}
.animation-focus-leave {
	animation: animation-focus-leave 0.25s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}

@keyframes animation-focus-enter {
  0% {
    filter: grayscale(100%);
  }
  100% {
    filter: grayscale(0);
  }
}

@keyframes animation-focus-leave {
  0% {
    filter: grayscale(0);
  }
  100% {
    filter: grayscale(100%);
  }
}
`

export default partialHomeStyles