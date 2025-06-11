import { Tween } from "react-gsap";
import { Scene } from "react-scrollmagic";

interface ResultsProps {
  Title: () => React.ReactNode;
  Content: () => React.ReactNode;
  links: { text: string; url: string }[];
}

const Results = ({ Title, Content, links }: ResultsProps) => (
  <div
    id="results"
    className="w-full bg-gradient-to-tl from-gray-100 to-gray-300"
  >
    <svg viewBox="0 0 1920 100">
      <path fill="#333" d="M960,50l960-50H0L960,50z" />
    </svg>
    <Scene triggerElement="#results" duration="200%" triggerHook="1">
      {(progress: number) => (
        <Tween
          to={{
            right: "-100px",
          }}
          ease="Expo.EaseIn"
          totalProgress={progress}
          paused
        >
          <h1 className="font-display text-18xl font-bold text-black m-0 absolute right-0 opacity-5 hidden md:block">
            <Title />
          </h1>
        </Tween>
      )}
    </Scene>

    <div className="grid grid-cols-8 gap-4 px-8 md:px-32 py-60">
      <div className="lg:col-span-1"></div>
      <div className="lg:col-span-6 col-span-8">
        <Scene triggerElement="#results" duration="200%" triggerHook="1">
          {(progress: number) => (
            <Tween
              to={{
                opacity: 1,
              }}
              ease="Expo.EaseIn"
              totalProgress={progress}
              paused
            >
              <h1 className="font-display text-8xl md:text-12xl font-bold text-black m-0">
                <Title />
              </h1>
            </Tween>
          )}
        </Scene>
        <Scene triggerElement="#results" duration="200%" triggerHook="1">
          {(progress: number) => (
            <Tween
              to={{
                opacity: 1,
              }}
              ease="Expo.EaseIn"
              totalProgress={progress}
              paused
            >
              <div className="font-main text-4xl font-extralight text-neutral-700 leading-normal">
                <Content />
              </div>
            </Tween>
          )}
        </Scene>
      </div>

      <div className="lg:col-span-1"></div>
    </div>

    <div className="grid grid-cols-8 gap-4 px-32 pt-16 pb-60">
      <div className="col-span-1"></div>
      <div className="col-span-6 font-main text-2xl font-extralight text-white">
        <ul className="flex py-8">
          {links.map((link) => (
            <li key={link.text}>
              <a
                target="_blank"
                rel="nofollow noreferrer"
                href={link.url}
                className="font-thin text-6xl text-neutral-900 py-2 px-4 my-0 mr-4 rounded-3xl bg-black bg-opacity-10 hover:bg-opacity-30 transition-all duration-300 ease-in-out"
              >
                {link.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="col-span-1"></div>
    </div>

    <svg viewBox="0 0 1920 100">
      <path fill="#aaa" d="M1920,0v100H0V0l960,50L1920,0z" />
    </svg>
  </div>
);

export default Results;
