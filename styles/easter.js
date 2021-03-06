import { css } from 'styled-components'

const partialEasterStyles = css`
#cloud-small,
#easter > .container-me,
#easter > .container-fire,
#easter > .container-stream,
#easter > .container-cloud-1,
#easter > .container-cloud-2,
#easter > .container-glasses,
#easter > .container-water-drop,
#easter > .container-extinguisher,
#easter > .container-scooter {
  display: none;
}

#easter > .container-scooter {
  height: 450px;
  width: 300px;
  position: absolute;
  top: 40%;
  left: -4%;
}

#easter > .container-stream {
  height: 170px;
  width: 380px;
  position: absolute;
  top: 50%;
  left: 63%;
  transform: rotate(40deg);
}

#easter > .container-cloud-1 {
  width: 400px;
  position: absolute;
  top: 60%;
  left: 68%;
}

#easter > .container-cloud-2 {
  width: 400px;
  position: absolute;
  top: 60%;
  left: 72%;
}

#easter > .container-extinguisher {
  height: 220px;
  width: 220px;
  position: absolute;
  top: 42%;
  left: 56%;
}

#easter > .container-me {
  height: 450px;
  width: 400px;
  position: absolute;
  top: 30%;
  left: -8%;
  z-index: 2;
}

#easter > .container-water-drop {
  height: 30px;
  width: 30px;
  position: absolute;
  top: 32%;
  left: 61%;
  z-index: 3;
}

#easter > .container-fire {
  display: none;
  position: absolute;
  height: 120px;
  width: 20%;
  top: 60%;
  left: 40%;
}

#right-foot-1,
#right-foot-2,
#right-foot-3,
#left-foot-1,
#left-foot-2,
#left-foot-3,
#left-hand-trick,
#shirt-side,
#crotch-side,
#head-front {
  display: none;
}

#head-side {
  transform-origin: 230px 150px;
}

#head-front {
  transform-origin: 250px 140px;
}

#torso-plus-head-arms {
  transform-origin: center center;
}

#right-arm {
  transform-origin: 120px 240px;
}

#lower-right-arm-plus-hand {
  transform-origin: 120px 380px;
}

#right-hand {
  transform-origin: 150px 480px;
}

#left-arm {
  transform-origin: 370px 240px;
}

#lower-left-arm-plus-hand {
  transform-origin: 370px 380px;
}

#left-hand {
  transform-origin: 350px 480px;
}

#left-leg {
  transform-origin: 300px 500px;
}

#lower-left-leg-plus-foot {
  transform-origin: 300px 650px;
}

#right-leg {
  transform-origin: 200px 500px;
}

#lower-right-leg-plus-foot {
  transform-origin: 200px 650px;
}

#right-foot,
#right-foot-1,
#right-foot-2,
#right-foot-3 {
  transform-origin: 200px 850px;
}

#left-foot,
#left-foot-1,
#left-foot-2,
#left-foot-3 {
  transform-origin: 300px 850px;
}

#full-body {
  transform-origin: 300px 850px;
}
`

export default partialEasterStyles