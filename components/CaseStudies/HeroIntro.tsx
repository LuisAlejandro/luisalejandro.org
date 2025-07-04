"use client";

import { useEffect, useState } from "react";

import ScrollTween from "./ScrollTween";

// Custom hook to simulate progress from 0 to 1 over specified duration
const useProgressAnimation = (duration: number = 5000) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    const animationFrame = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min(elapsed / duration, 1);

      setProgress(newProgress);

      if (newProgress < 1) {
        requestAnimationFrame(animationFrame);
      }
    };

    requestAnimationFrame(animationFrame);
  }, [duration]);

  return progress;
};

interface HeroIntroProps {
  Subtitle: () => React.ReactNode;
  Title: () => React.ReactNode;
  Description: () => React.ReactNode;
  team: string[];
  deliverables: string[];
  links: { text: string; url: string }[];
  year: number;
}

const HeroIntro = ({
  Subtitle,
  Title,
  Description,
  team,
  deliverables,
  links,
  year,
}: HeroIntroProps) => {
  const progress = useProgressAnimation(2000);

  return (
    <div id="herointro" className="w-full">
      <div className="flex absolute right-10 top-80 lg:top-40 lg:right-32 font-display font-black text-8xl lg:text-11xl text-white opacity-20">
        <ScrollTween
          duration={2}
          to={{
            right: 0,
            opacity: 1,
          }}
          from={{
            right: "100px",
            opacity: 0,
          }}
          ease="Expo.EaseIn"
          totalProgress={progress}
          className="relative"
        >
          {year}
        </ScrollTween>
      </div>
      <div className="grid grid-cols-16 gap-4 px-8 py-20">
        <div className="lg:col-span-12 col-span-16">
          <ScrollTween
            duration={2}
            from={{
              left: "100px",
              opacity: 0,
            }}
            to={{
              left: 0,
              opacity: 1,
            }}
            ease="Expo.EaseIn"
            totalProgress={progress}
            className="relative"
          >
            <p className="font-main text-lg font-light text-white">
              <Subtitle />
            </p>
            <h1 className="font-display text-8xl tracking-wide font-bold text-white m-0">
              <Title />
            </h1>
            <p className="font-main text-2xl font-light text-white leading-normal">
              <Description />
            </p>
            <div className="font-main text-2xl font-light text-white">
              <ul className="flex py-8">
                {links.map((link: any) => (
                  <li key={link.text}>
                    <a
                      target="_blank"
                      rel="nofollow noreferrer"
                      href={link.url}
                      className="font-light text-lg text-neutral-400 py-2 px-4 my-0 mr-4 rounded-3xl bg-black/30 hover:bg-black/50 transition-all duration-300 ease-in-out"
                    >
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollTween>
        </div>
        <ScrollTween
          duration={2}
          to={{
            right: 0,
            opacity: 1,
          }}
          from={{
            right: "100px",
            opacity: 0,
          }}
          ease="Expo.EaseIn"
          totalProgress={progress}
          className="relative top-6 lg:top-20 lg:col-span-4 col-span-16 flex flex-row gap-4 justify-end lg:justify-start"
        >
          <div>
            <h4 className="font-main text-xl font-black text-gray-300 text-right">
              Team
            </h4>
            <ul>
              {team.map((t: any) => (
                <li
                  key={t}
                  className="font-main text-lg font-light text-white text-right"
                >
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-main text-xl font-black text-gray-300 text-right">
              Deliverables
            </h4>
            <ul>
              {deliverables.map((d: any) => (
                <li
                  key={d}
                  className="font-main text-lg font-light text-white text-right"
                >
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </ScrollTween>
      </div>
    </div>
  );
};

export default HeroIntro;
