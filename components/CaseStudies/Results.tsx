import { Scene } from "react-scrollmagic";

import ScrollTween from "./ScrollTween";

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
    <Scene
      triggerElement="#results"
      duration="200%"
      triggerHook="1"
      offset={-100}
    >
      {(progress: number) => (
        <ScrollTween
          to={{
            right: "-100px",
          }}
          from={{
            right: "0px",
          }}
          ease="Expo.EaseIn"
          totalProgress={progress}
          paused
          className="absolute"
        >
          <h1 className="font-display text-5xl leading-6 lg:text-15xl lg:leading-10 font-bold text-black m-0 opacity-5 hidden md:block">
            <Title />
          </h1>
        </ScrollTween>
      )}
    </Scene>

    <div className="grid grid-cols-8 gap-4 px-8 pt-60">
      <div className="lg:col-span-1"></div>
      <div className="lg:col-span-6 col-span-8">
        <Scene
          triggerElement="#results"
          duration="200%"
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
              <h1 className="font-display text-5xl leading-6 lg:text-10xl lg:leading-35 font-bold text-black m-0">
                <Title />
              </h1>
            </ScrollTween>
          )}
        </Scene>
        <Scene
          triggerElement="#results"
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
              <div className="font-main text-2xl font-extralight text-neutral-700 leading-normal">
                <Content />
              </div>
            </ScrollTween>
          )}
        </Scene>
      </div>

      <div className="lg:col-span-1"></div>
    </div>
    <div className="grid grid-cols-8 gap-4 px-8">
      <div className="lg:col-span-1"></div>
      <div className="lg:col-span-6 col-span-8">
        <ul className="flex py-16">
          {links.map((link) => (
            <li key={link.text}>
              <a
                target="_blank"
                rel="nofollow noreferrer"
                href={link.url}
                className="font-thin text-2xl text-neutral-900 py-1 px-4 my-0 mr-4 rounded-xl bg-black/10 hover:bg-black/30 transition-all duration-300 ease-in-out"
              >
                {link.text}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="lg:col-span-1"></div>
    </div>

    <svg viewBox="0 0 1920 100">
      <path fill="#aaa" d="M1920,0v100H0V0l960,50L1920,0z" />
    </svg>
  </div>
);

export default Results;
