import { Tween } from "react-gsap";


const HeroIntro = ({ Subtitle, Title, Description, team, deliverables }) => (
  <div id="herointro" className="w-full">
    <div className="grid grid-cols-8 gap-4 px-32 py-60">
      <div className="col-span-6">
        <Tween
          duration={2}
          from={{
            left: '100px',
            opacity: 0
          }}
          to={{
            left: 0,
            opacity: 1
          }}
          ease="Expo.EaseIn">
          <div className="relative">
            <p className="font-main text-2xl font-extralight text-white">
              <Subtitle />
            </p>
            <h1 className="font-display text-9xl font-bold text-white m-0">
              <Title />
            </h1>
            <p className="font-main text-4xl font-extralight text-white">
              <Description />
            </p>
          </div>
        </Tween>
      </div>
      <Tween
        duration={2}
        to={{
          right: 0,
          opacity: 1
        }}
        from={{
          right: '100px',
          opacity: 0
        }}
        ease="Expo.EaseIn">
        <div className="relative">
          <h4 className="font-title text-2xl font-regular text-gray-300 text-right">
            Team
          </h4>
          <ul>
            {team.map((t) => <li key={t} className="font-main text-2xl font-extralight text-white text-right">{t}</li>)}
          </ul>
        </div>
        <div className="relative">
          <h4 className="font-title text-2xl font-regular text-gray-300 text-right">
            Deliverables
          </h4>
          <ul>
            {deliverables.map((d) => <li key={d} className="font-main text-2xl font-extralight text-white text-right">{d}</li>)}
          </ul>
        </div>
      </Tween>
    </div>
  </div>
);


export default HeroIntro;
