import { Scene } from "react-scrollmagic";
import { Tween } from "react-gsap";
import styled from 'styled-components';


const PinContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  -webkit-perspective: 1000;
          perspective: 1000;
`;

const SlideContainer = styled.div`
  width: 400%;
  height: 100%;
`;

const Panel = styled.section`
  height: 100%;
  width: 25%;
  float: left;
`;

const Product = ({ Title, Content }) => (
  <div id="product" className="w-full">
    <Scene triggerElement="#product" duration="200%" triggerHook="1">
      {progress => (
        <Tween
          to={{
            right: '-100px',
          }}
          ease="Expo.EaseIn"
          totalProgress={progress}
          paused>
          <h1 className="font-display text-18xl font-bold text-neutral-700 m-0 absolute right-0 opacity-30">
            <Title />
          </h1>
        </Tween>
      )}
    </Scene>
    <div className="grid grid-cols-8 gap-4 px-32 py-60">
      <div className="col-span-1">
        {/* <Scene triggerElement="#product" duration="150%" triggerHook="1">
          {progress => (
            <Tween
              to={{
                left: "-300px"
              }}
              ease="Expo.EaseIn"
              totalProgress={progress}
              paused>
              <div style={{ position: 'absolute', left: '-450px' }}>
                <Me className="container-me" />
              </div>
            </Tween>
          )}
        </Scene> */}
      </div>
      <div className="col-span-7">
        <Scene triggerElement="#product" duration="80%" triggerHook="1">
          {progress => (
            <Tween
              from={{
                position: "relative",
                top: "-100px",
                color: 'rgba(255, 255, 255, 0)',
              }}
              ease="Expo.EaseIn"
              totalProgress={progress}
              paused>
              <h1 className="font-display text-12xl font-bold text-white m-0">
                <Title />
              </h1>
            </Tween>
          )}
        </Scene>
        <Scene triggerElement="#product" duration="120%" triggerHook="1">
          {progress => (
            <Tween
              from={{
                position: "relative",
                top: "100px",
                color: 'rgba(255, 255, 255, 0)',
              }}
              ease="Expo.EaseIn"
              totalProgress={progress}
              paused>
              <p className="font-main text-4xl font-extralight text-white">
                <Content />
              </p>
            </Tween>
          )}
        </Scene>

        <Scene triggerElement="#product" duration="500%" triggerHook="onLeave" pin>
          <PinContainer>
            <SlideContainer>
              <Panel>
                <b>ONE</b>
              </Panel>
              <Panel>
                <b>TWO</b>
              </Panel>
              <Panel>
                <b>THREE</b>
              </Panel>
              <Panel>
                <b>FOUR</b>
              </Panel>
            </SlideContainer>
          </PinContainer>
        </Scene>

      </div>
    </div>
  </div>
);


export default Product;
