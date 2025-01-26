import { Scene } from "react-scrollmagic";
import { Tween } from "react-gsap";

const Product = ({ Title, Content, videoUrl }) => (
  <div id="product" className="w-full">
    <Scene triggerElement="#product" duration="200%" triggerHook="1">
      {(progress) => (
        <Tween
          to={{
            left: "300px",
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
    <div className="grid grid-cols-8 gap-4 px-8 md:px-32 py-60">
      <div className="lg:col-span-4 col-span-8">
        <Scene triggerElement="#product" duration="80%" triggerHook="1">
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
        <Scene triggerElement="#product" duration="120%" triggerHook="1">
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
      {videoUrl && (
        <div
          className="col-span-4 hidden lg:block"
          style={{
            height: "200px",
          }}
        >
          <video
            playsInline="playsinline"
            preload="none"
            autoPlay="autoplay"
            muted={true}
            loop="loop"
            style={{
              height: "800px",
              width: "1200px",
              position: "relative",
              top: "100px",
              left: "50px",
              maxWidth: "unset",
              zIndex: 1,
              opacity: 0.7,
            }}
          >
            <source src={videoUrl} type="video/mp4" />
          </video>
        </div>
      )}
    </div>
  </div>
);

export default Product;
