import { Tween } from "react-gsap";

const HeroIntro = ({
  Subtitle,
  Title,
  Description,
  team,
  deliverables,
  links,
  year,
}) => (
  <div id="herointro" className="w-full">
    <div className="flex absolute right-32 top-64 font-display text-14xl text-white opacity-20">
      <Tween
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
      >
        <div className="relative">{year}</div>
      </Tween>
    </div>
    <div className="grid grid-cols-16 gap-4 px-32 py-60">
      <div className="col-span-11">
        <Tween
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
        >
          <div className="relative">
            <p className="font-main text-3xl font-extralight text-white">
              <Subtitle />
            </p>
            <h1 className="font-display text-10xl font-bold text-white m-0">
              <Title />
            </h1>
            <p className="font-main text-4xl font-extralight text-white leading-normal">
              <Description />
            </p>
            <div className="font-main text-2xl font-extralight text-white">
              <ul className="flex py-8">
                {links.map((link) => (
                  <li key={link.text}>
                    <a
                      target="_blank"
                      href={link.url}
                      className="font-light text-3xl text-neutral-400 py-2 px-4 my-0 mr-4 rounded-3xl bg-black bg-opacity-30 hover:bg-opacity-50 transition-all duration-300 ease-in-out"
                    >
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Tween>
      </div>
      <Tween
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
      >
        <div className="relative col-span-3">
          <h4 className="font-title text-2xl font-regular text-gray-300 text-right">
            Team
          </h4>
          <ul>
            {team.map((t) => (
              <li
                key={t}
                className="font-main text-3xl font-extralight text-white text-right"
              >
                {t}
              </li>
            ))}
          </ul>
        </div>
        <div className="relative col-span-2">
          <h4 className="font-title text-2xl font-regular text-gray-300 text-right">
            Deliverables
          </h4>
          <ul>
            {deliverables.map((d) => (
              <li
                key={d}
                className="font-main text-3xl font-extralight text-white text-right"
              >
                {d}
              </li>
            ))}
          </ul>
        </div>
      </Tween>
    </div>
  </div>
);

export default HeroIntro;
