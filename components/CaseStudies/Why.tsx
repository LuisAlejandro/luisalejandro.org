import { useEffect } from "react";
import { Tween } from "react-gsap";
import { Scene } from "react-scrollmagic";

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
        <Scene triggerElement="#why" duration="200%" triggerHook="1">
          {(progress: number) => (
            <Tween
              to={{
                right: "-100px",
              }}
              ease="Expo.EaseIn"
              totalProgress={progress}
              paused
            >
              <h1 className="font-display text-18xl font-bold text-neutral-700 m-0 absolute right-0 opacity-30 z-0 hidden md:block">
                <Title />
              </h1>
            </Tween>
          )}
        </Scene>

        <div className="grid grid-cols-8 gap-4 px-8 md:px-32 py-60">
          <div className="col-span-4 hidden lg:block">
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
            <Scene triggerElement="#why" duration="200%" triggerHook="1">
              {(progress: number) => (
                <Tween
                  to={{
                    opacity: 1,
                  }}
                  ease="Expo.EaseIn"
                  totalProgress={progress}
                  paused
                >
                  <h1 className="font-display text-8xl md:text-12xl font-bold text-white opacity-0 m-0 z-10">
                    <Title />
                  </h1>
                </Tween>
              )}
            </Scene>
            <Scene triggerElement="#why" duration="200%" triggerHook="1">
              {(progress: number) => (
                <Tween
                  to={{
                    opacity: 1,
                  }}
                  ease="Expo.EaseIn"
                  totalProgress={progress}
                  paused
                >
                  <div className="font-main text-4xl font-extralight text-white opacity-0 leading-normal">
                    <Content />
                  </div>
                </Tween>
              )}
            </Scene>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Why;
