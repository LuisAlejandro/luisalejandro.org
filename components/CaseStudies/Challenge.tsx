import cn from "classnames";
import { Scene } from "react-scrollmagic";

import { WaveDivider } from "@components/common/Layout/WaveDivider";
import ScrollTween from "./ScrollTween";

interface ChallengeProps {
  Title: () => React.ReactNode;
  Content: () => React.ReactNode;
  bgImgClass?: string;
}

const Challenge = ({ Title, Content, bgImgClass }: ChallengeProps) => (
  <div
    id="challenge"
    className="w-full bg-gradient-to-tl from-neutral-700 to-neutral-600"
  >
    <div
      className={cn(
        "w-full bg-none bg-right bg-cover bg-no-repeat",
        bgImgClass
          ? {
              [bgImgClass]: true,
            }
          : {}
      )}
    >
      <WaveDivider fill="#333" />
      <Scene
        triggerElement="#challenge"
        duration="200%"
        triggerHook="1"
        offset={-100}
      >
        {(progress: number) => (
          <ScrollTween
            to={{
              left: "100px",
            }}
            from={{
              left: "-128px",
            }}
            ease="Expo.EaseIn"
            totalProgress={progress}
            paused
            className="absolute"
          >
            <h1 className="font-display text-5xl leading-6 lg:text-15xl lg:leading-10 font-bold text-neutral-700 m-0 opacity-30 hidden md:block">
              <Title />
            </h1>
          </ScrollTween>
        )}
      </Scene>

      <div className="grid grid-cols-8 gap-4 px-8 py-72">
        <div className="lg:col-span-5 col-span-8">
          <Scene
            triggerElement="#challenge"
            duration="100%"
            triggerHook="1"
            offset={-100}
          >
            {(progress: number) => (
              <ScrollTween
                to={{
                  opacity: 1,
                  top: "-100px",
                }}
                from={{
                  opacity: 0,
                  top: "0px",
                }}
                ease="Expo.EaseIn"
                totalProgress={progress}
                paused
                className="relative"
              >
                <h1 className="font-display text-5xl leading-6 lg:text-10xl lg:leading-35 font-bold text-white m-0">
                  <Title />
                </h1>
              </ScrollTween>
            )}
          </Scene>
          <Scene
            triggerElement="#challenge"
            duration="100%"
            triggerHook="1"
            offset={-100}
          >
            {(progress: number) => (
              <ScrollTween
                to={{
                  opacity: 1,
                }}
                from={{
                  opacity: 0,
                }}
                ease="Expo.EaseIn"
                totalProgress={progress}
                paused
              >
                <div className="font-main text-2xl font-light text-white leading-normal">
                  <Content />
                </div>
              </ScrollTween>
            )}
          </Scene>
        </div>

        <div className="col-span-3"></div>
      </div>

      <WaveDivider fill="#333" inverted />
    </div>
  </div>
);

export default Challenge;
