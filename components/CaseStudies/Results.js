import { Scene } from "react-scrollmagic";
import { Tween } from "react-gsap";


const Results = ({ Title, Content }) => (
  <div id="results" className="w-full bg-gradient-to-tl from-gray-100 to-gray-300">
    <svg viewBox="0 0 1920 100">
      <path fill="#333" d="M960,50l960-50H0L960,50z" />
    </svg>
    <Scene triggerElement="#results" duration="200%" triggerHook="1">
      {progress => (
        <Tween
          to={{
            right: '-100px',
          }}
          ease="Expo.EaseIn"
          totalProgress={progress}
          paused>
          <h1 className="font-display text-18xl font-bold text-white m-0 absolute right-0 opacity-70">
            <Title />
          </h1>
        </Tween>
      )}
    </Scene>
    <div className="grid grid-cols-8 gap-4 px-32 py-60">
      <div className="col-span-1">
        {/* <Scene triggerElement="#results" duration="150%" triggerHook="1">
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
        <Scene triggerElement="#results" duration="80%" triggerHook="1">
          {progress => (
            <Tween
              from={{
                position: "relative",
                top: "-100px",
                color: 'rgba(0, 0, 0, 0)',
              }}
              ease="Expo.EaseIn"
              totalProgress={progress}
              paused>
              <h1 className="font-display text-12xl font-bold text-black m-0">
                <Title />
              </h1>
            </Tween>
          )}
        </Scene>
        <Scene triggerElement="#results" duration="120%" triggerHook="1">
          {progress => (
            <Tween
              from={{
                position: "relative",
                top: "100px",
                color: 'rgba(0, 0, 0, 0)',
              }}
              ease="Expo.EaseIn"
              totalProgress={progress}
              paused>
              <p className="font-main text-4xl font-extralight text-black">
                <Content />
              </p>
            </Tween>
          )}
        </Scene>
      </div>
    </div>
    <svg viewBox="0 0 1920 100">
      <path fill="#333" d="M1920,0v100H0V0l960,50L1920,0z"/>
    </svg>
  </div>
);


export default Results;
