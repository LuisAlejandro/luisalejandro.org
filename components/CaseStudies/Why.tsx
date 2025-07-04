import { useEffect } from "react";
import { Scene } from "react-scrollmagic";

import ScrollTween from "./ScrollTween";

interface WhyProps {
  Title: () => React.ReactNode;
  Content: () => React.ReactNode;
  ImageComponent: React.ComponentType<any>;
  ImageUseEffect: () => void;
}

const Why = ({ Title, Content, ImageComponent, ImageUseEffect }: WhyProps) => {
  useEffect(() => {
    ImageUseEffect();
  }, [ImageUseEffect]);

  return (
    <div id="why" className="w-full">
      <div className="w-full">
        <Scene
          triggerElement="#why"
          duration="200%"
          triggerHook="1"
          offset={-100}
        >
          {(progress: number) => (
            <ScrollTween
              to={{
                right: "-500px",
              }}
              from={{
                right: "0",
              }}
              ease="Expo.EaseIn"
              totalProgress={progress}
              paused
              className="absolute"
            >
              <h1 className="font-display text-5xl leading-6 lg:text-15xl lg:leading-10 font-bold text-neutral-700 m-0 opacity-30 z-0 hidden md:block">
                <Title />
              </h1>
            </ScrollTween>
          )}
        </Scene>

        <div className="grid grid-cols-8 gap-4 px-8 py-60">
          <div className="col-span-4 hidden lg:block relative top-[-200px]">
            <ImageComponent
              style={{
                position: "relative",
                top: "0",
                right: "700px",
                height: "784px",
                width: "1400px",
              }}
            />
          </div>

          <div className="lg:col-span-4 col-span-8">
            <Scene
              triggerElement="#why"
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
                  <h1 className="font-display text-5xl leading-6 lg:text-10xl lg:leading-35 font-bold text-white m-0 z-10">
                    <Title />
                  </h1>
                </ScrollTween>
              )}
            </Scene>
            <Scene
              triggerElement="#why"
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
                  className="flex"
                >
                  <div className="font-main text-2xl font-light text-white leading-normal">
                    <Content />
                  </div>
                </ScrollTween>
              )}
            </Scene>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Why;
