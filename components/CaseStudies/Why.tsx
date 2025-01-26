import { Scene } from "react-scrollmagic";
import { Tween } from "react-gsap";

import { useEffect } from "react";

const Why = ({
  Title,
  Content,
  ImageComponent,
  ImageUseEffect
}: any) => {

  useEffect(() => {
    ImageUseEffect();
  }, [ImageUseEffect]);

  return (
    
    <div id="why" className="w-full">
      
      <div className="w-full">
        <Scene triggerElement="#why" duration="200%" triggerHook="1">
          {(progress: any) => <Tween
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
          </Tween>}
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
            <Scene triggerElement="#why" duration="80%" triggerHook="1">
              {(progress: any) => <Tween
                from={{
                  position: "relative",
                  top: "-100px",
                  color: "rgba(255, 255, 255, 0)",
                }}
                ease="Expo.EaseIn"
                totalProgress={progress}
                paused
              >
                
                <h1 className="font-display text-8xl md:text-12xl font-bold text-white m-0 z-10">
                  <Title />
                
                </h1>
              </Tween>}
            </Scene>
            <Scene triggerElement="#why" duration="120%" triggerHook="1">
              {(progress: any) => <Tween
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
              </Tween>}
            </Scene>
          
          </div>
        
        </div>
      
      </div>
    
    </div>
  );
};

export default Why;
