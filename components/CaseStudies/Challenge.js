import { Scene } from "react-scrollmagic";
import { Tween } from "react-gsap";
import cn from "classnames";

const Challenge = ({ Title, Content, bgImgClass }) => (
  <div
    id="challenge"
    className="w-full bg-gradient-to-tl from-neutral-700 to-neutral-600"
  >
    <div
      className={cn(
        "w-full bg-none",
        bgImgClass
          ? {
              [bgImgClass]: true,
            }
          : {}
      )}
      style={{
        backgroundPosition: "top right",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <svg viewBox="0 0 1920 100">
        <path fill="#333" d="M960,50l960-50H0L960,50z" />
      </svg>
      <Scene triggerElement="#challenge" duration="200%" triggerHook="1">
        {(progress) => (
          <Tween
            to={{
              left: "100px",
            }}
            ease="Expo.EaseIn"
            totalProgress={progress}
            paused
          >
            <h1 className="font-display text-18xl font-bold text-neutral-700 m-0 absolute -left-32 opacity-30 hidden md:block">
              <Title />
            </h1>
          </Tween>
        )}
      </Scene>
      <div className="grid grid-cols-8 gap-4 px-8 md:px-32 py-72">
        <div className="lg:col-span-5 col-span-8">
          <Scene triggerElement="#challenge" duration="80%" triggerHook="1">
            {(progress) => (
              <Tween
                from={{
                  position: "relative",
                  top: "-100px",
                  color: "rgba(255, 255, 255, 0)",
                }}
                ease="Expo.EaseIn"
                totalProgress={progress}
                paused
              >
                <h1 className="font-display text-8xl md:text-12xl font-bold text-white m-0">
                  <Title />
                </h1>
              </Tween>
            )}
          </Scene>
          <Scene triggerElement="#challenge" duration="120%" triggerHook="1">
            {(progress) => (
              <Tween
                from={{
                  position: "relative",
                  top: "100px",
                  color: "rgba(255, 255, 255, 0)",
                }}
                ease="Expo.EaseIn"
                totalProgress={progress}
                paused
              >
                <div className="font-main text-4xl font-extralight text-white leading-normal">
                  <Content />
                </div>
              </Tween>
            )}
          </Scene>
        </div>
        <div className="col-span-3"></div>
      </div>
      <svg viewBox="0 0 1920 100">
        <path fill="#333" d="M1920,0v100H0V0l960,50L1920,0z" />
      </svg>
    </div>
  </div>
);

export default Challenge;
