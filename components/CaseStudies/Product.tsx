import { Scene } from "react-scrollmagic";

import ScrollTween from "./ScrollTween";

interface ProductProps {
  Title: () => React.ReactNode;
  Content: () => React.ReactNode;
  videoUrl?: string;
}

const Product = ({ Title, Content, videoUrl }: ProductProps) => (
  <div id="product" className="w-full">
    <Scene triggerElement="#product" duration="200%" triggerHook="1">
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
          <h1 className="font-display text-5xl leading-6 lg:text-18xl lg:leading-10 font-bold text-neutral-700 m-0 opacity-30 hidden md:block">
            <Title />
          </h1>
        </ScrollTween>
      )}
    </Scene>
    <div className="grid grid-cols-8 gap-4 px-8 py-60">
      <div className="lg:col-span-4 col-span-8">
        <Scene
          triggerElement="#product"
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
          triggerElement="#product"
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
      {videoUrl && (
        <div className="col-span-4 hidden lg:block h-[200px]">
          <video
            playsInline={true}
            preload="none"
            autoPlay={true}
            muted={true}
            loop={true}
            className="h-[800px] w-[1200px] relative top-[100px] left-[50px] max-w-none z-[1] opacity-70"
          >
            <source src={videoUrl} type="video/mp4" />
          </video>
        </div>
      )}
    </div>
  </div>
);

export default Product;
