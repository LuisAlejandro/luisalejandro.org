"use client";

import {
  INK,
  RULE,
  Note,
  Leader,
  Tip,
  SHEET,
  PANEL,
  beat,
  Layer,
} from "./shared";

/** A corrugated shipping container: the same image from test to production. */
export function CicdContainer() {
  return (
    <g transform="translate(474 560) rotate(-4)">
      <g
        className="site-obj"
        style={{ "--tilt-in": "-4deg" } as React.CSSProperties}
      >
        <g
          data-cicd="cargo"
          style={{
            transform:
              "translateX(calc((1 - clamp(0, (var(--p) - 0.28) / 0.42, 1)) * -110px))",
          }}
        >
          <path d="M0 20 46 0H490L444 20Z" fill={SHEET} stroke={INK} />
          <path d="M444 20 490 0V156L444 178Z" fill={SHEET} stroke={INK} />
          <rect y="20" width="444" height="158" fill={SHEET} stroke={INK} />
          <path d="M0 32H444M0 166H444" fill="none" stroke={RULE} />
          {Array.from({ length: 17 }, (_, i) => (
            <path
              key={i}
              d={`M${17 + i * 25} 38v114m5-114v114`}
              fill="none"
              stroke={RULE}
              strokeWidth="0.8"
            />
          ))}
          <rect
            x="38"
            y="62"
            width="236"
            height="74"
            fill={SHEET}
            stroke={RULE}
          />
          <Note x="50" y="81" size={8}>
            WTW · release image
          </Note>
          <Note x="50" y="104" size={14} fill={INK} weight={500}>
            app / production
          </Note>
          <Note x="50" y="124" size={8}>
            same image · dev / test / deploy
          </Note>
          <rect
            x="306"
            y="62"
            width="108"
            height="66"
            fill={SHEET}
            stroke={INK}
          />
          <Note x="318" y="80" size={7}>
            multistage build
          </Note>
          <Note x="318" y="100" size={11} fill={INK}>
            1.5 GB
          </Note>
          <path
            className="site-draw"
            style={beat(0.56, 0.08)}
            d="M314 99 385 89"
            fill="none"
            stroke={INK}
            strokeWidth="1.5"
            pathLength={1}
          />
          <g className="site-step-in" style={beat(0.62)}>
            <rect x="312" y="105" width="94" height="19" fill={SHEET} />
            <Note x="318" y="119" size={12} fill={INK} weight={500}>
              200 MB
            </Note>
          </g>
          {/* Corner castings, door hinges, locking bars and handles. */}
          {[4, 426].flatMap((x) =>
            [24, 160].map((y) => (
              <rect
                key={`${x}-${y}`}
                x={x}
                y={y}
                width="14"
                height="13"
                rx="2"
                fill={SHEET}
                stroke={INK}
              />
            ))
          )}
          <path
            d="M451 28 483 13V145L451 161ZM465 21V152M457 34V146M477 25V138"
            fill="none"
            stroke={INK}
          />
          <path d="M453 63l8-4m-8 54 8-4m10-54 10-5m-10 56 10-5" stroke={INK} />
          <path d="M460 87l10-5v13l-10 5Z" fill={SHEET} stroke={INK} />
          <Note x="42" y="156" size={7}>
            sealed · versioned · reproducible
          </Note>
        </g>
      </g>
    </g>
  );
}

/**
 * Wheel The World: a release crosses a desk. The notebook passes its checks,
 * the container travels toward production, the stopwatch falls from 40 to 10
 * minutes, and the estimated monthly bill is revised. Figures come from this
 * project's case study, not from decorative sample logs.
 */

/**
 * Wheel The World: a release crosses a desk. The notebook passes its checks,
 * the container travels toward production, the stopwatch falls from 40 to 10
 * minutes, and the estimated monthly bill is revised. Figures come from this
 * project's case study, not from decorative sample logs.
 */
export function CicdArt({ layer = "back" }: { layer?: Layer }) {
  if (layer === "front") return <CicdContainer />;

  const stages = [
    ["Build", "multistage image", 0.08],
    ["Test", "parallel jobs", 0.24],
    ["Push", "versioned artifact", 0.46],
    ["Deploy", "only if tests pass", 0.68],
  ] as const;

  return (
    <>
      {/* Spiral notebook: cover, stacked pages, binding and a release checklist. */}
      <g transform="translate(234 156) rotate(-5)">
        <g
          className="site-obj"
          style={{ "--tilt-in": "-4deg" } as React.CSSProperties}
        >
          <rect
            x="-10"
            y="-5"
            width="550"
            height="326"
            rx="5"
            fill={SHEET}
            stroke={INK}
          />
          <rect
            x="8"
            y="7"
            width="526"
            height="308"
            fill={SHEET}
            stroke={RULE}
          />
          <rect width="526" height="308" fill={SHEET} stroke={INK} />
          <path d="M50 0V308M64 74H504" stroke={RULE} fill="none" />
          {Array.from({ length: 9 }, (_, i) => (
            <g key={i}>
              <circle
                cx="16"
                cy={26 + i * 32}
                r="4"
                fill={PANEL}
                stroke={RULE}
              />
              <path
                d={`M17 ${22 + i * 32}C-20 ${8 + i * 32}-21 ${40 + i * 32}17 ${30 + i * 32}`}
                fill="none"
                stroke={INK}
              />
            </g>
          ))}
          <Note x="66" y="27" size={8}>
            Wheel The World · release notebook
          </Note>
          <Note x="66" y="55" size={19} fill={INK} weight={500}>
            CI / continuous delivery
          </Note>
          <Note x="504" y="27" size={7} anchor="end">
            GitHub Actions
          </Note>
          <Note x="66" y="94" size={8}>
            main → image → checks → production
          </Note>
          {stages.map(([name, detail, at], i) => {
            const y = 112 + i * 42;
            return (
              <g key={name}>
                <path d={`M68 ${y + 20}H504`} stroke={RULE} />
                <rect
                  x="68"
                  y={y - 3}
                  width="14"
                  height="14"
                  rx="2"
                  fill="none"
                  stroke={INK}
                />
                <Note x="96" y={y + 8} size={11} fill={INK}>
                  {name}
                </Note>
                <Note x="186" y={y + 8} size={8}>
                  {detail}
                </Note>
                <Note x="498" y={y + 8} size={8} anchor="end">
                  queued
                </Note>
                <g
                  className="site-step-in"
                  style={beat(at, 0.09)}
                  data-cicd={`stage-${name.toLowerCase()}`}
                >
                  <path
                    d={`M71 ${y + 3}l4 4 6-8`}
                    stroke={INK}
                    strokeWidth="1.5"
                    fill="none"
                  />
                  <rect x="432" y={y - 7} width="72" height="22" fill={SHEET} />
                  <Note x="498" y={y + 8} size={8} fill={INK} anchor="end">
                    passed
                  </Note>
                </g>
              </g>
            );
          })}
          <g className="site-step-in" style={beat(0.76)}>
            <Note x="66" y="300" size={7}>
              all checks passed · release ready
            </Note>
          </g>
        </g>
      </g>

      {/* Mechanical stopwatch, with a knurled crown and a moving hand. */}
      <g transform="translate(832 70) rotate(9)">
        <g
          className="site-obj"
          style={{ "--tilt-in": "5deg" } as React.CSSProperties}
        >
          <rect
            x="105"
            y="6"
            width="30"
            height="22"
            rx="3"
            fill={SHEET}
            stroke={INK}
          />
          {Array.from({ length: 6 }, (_, i) => (
            <path key={i} d={`M${109 + i * 4} 9v15`} stroke={RULE} />
          ))}
          <rect
            x="114"
            y="28"
            width="12"
            height="19"
            fill={SHEET}
            stroke={INK}
          />
          <path d="M183 59l14-16 13 11-14 16" fill={SHEET} stroke={INK} />
          <circle cx="120" cy="142" r="98" fill={SHEET} stroke={INK} />
          <circle cx="120" cy="142" r="89" fill="none" stroke={RULE} />
          {Array.from({ length: 60 }, (_, i) => {
            const a = (i / 60) * Math.PI * 2;
            const r = i % 5 === 0 ? 73 : 79;
            // Quantise SVG coordinates: Node and Chrome can disagree at
            // trig's final decimal, which otherwise trips hydration.
            return (
              <path
                key={i}
                d={`M${(120 + Math.sin(a) * r).toFixed(3)} ${(142 - Math.cos(a) * r).toFixed(3)}L${(120 + Math.sin(a) * 84).toFixed(3)} ${(142 - Math.cos(a) * 84).toFixed(3)}`}
                stroke={i % 5 === 0 ? INK : RULE}
                fill="none"
              />
            );
          })}
          {[
            [120, 81, "0"],
            [175, 112, "10"],
            [175, 177, "20"],
            [120, 208, "30"],
            [66, 177, "40"],
            [66, 112, "50"],
          ].map(([x, y, n]) => (
            <Note key={n} x={x} y={y} size={9} fill={INK} anchor="middle">
              {String(n)}
            </Note>
          ))}
          <g transform="translate(120 142)">
            <g
              data-cicd="stopwatch-hand"
              style={{
                transform:
                  "rotate(calc(240deg - clamp(0, (var(--p) - 0.12) / 0.64, 1) * 180deg))",
                transformOrigin: "0 0",
              }}
            >
              <path d="M0 15V-65" fill="none" stroke={INK} strokeWidth="1.8" />
            </g>
          </g>
          <circle cx="120" cy="142" r="4.5" fill={INK} />
          <Note x="120" y="164" size={6.5} anchor="middle">
            deploy / minutes
          </Note>
          <Note x="120" y="260" size={9} fill={INK} anchor="middle">
            40 min → 10 min
          </Note>
        </g>
      </g>

      {/* Cloud console: release gate and an affirmative deployment state. */}
      <g transform="translate(1170 244) rotate(7)">
        <g
          className="site-obj"
          style={{ "--tilt-in": "4deg" } as React.CSSProperties}
        >
          <rect
            x="5"
            y="5"
            width="300"
            height="226"
            rx="5"
            fill={SHEET}
            stroke={RULE}
          />
          <rect width="300" height="226" rx="5" fill={SHEET} stroke={INK} />
          <path d="M0 30H300M18 65H282" stroke={RULE} fill="none" />
          <circle cx="16" cy="15" r="3" fill="none" stroke={INK} />
          <Note x="30" y="19" size={8} fill={INK}>
            production console
          </Note>
          <Note x="18" y="51" size={8}>
            release / main
          </Note>
          <Note x="282" y="51" size={7} anchor="end">
            Google Cloud
          </Note>
          <Note x="18" y="89" size={8}>
            image
          </Note>
          <Note x="282" y="89" size={9} fill={INK} anchor="end">
            app:release
          </Note>
          <Note x="18" y="111" size={8}>
            checks
          </Note>
          <Note x="282" y="111" size={8} anchor="end">
            waiting
          </Note>
          <g className="site-step-in" style={beat(0.64)}>
            <rect x="216" y="98" width="68" height="18" fill={SHEET} />
            <Note x="282" y="111" size={8} fill={INK} anchor="end">
              passed
            </Note>
          </g>
          <rect
            x="18"
            y="134"
            width="264"
            height="7"
            rx="3"
            fill="none"
            stroke={RULE}
          />
          <path
            className="site-draw"
            style={beat(0.64, 0.15)}
            d="M22 137.5H278"
            stroke={INK}
            strokeWidth="4"
            pathLength={1}
          />
          <rect
            x="18"
            y="160"
            width="264"
            height="42"
            rx="3"
            fill="none"
            stroke={INK}
          />
          <Note x="150" y="186" size={9} anchor="middle">
            deploy on passing tests
          </Note>
          <g className="site-step-in" style={beat(0.8)} data-cicd="release">
            <rect x="18" y="160" width="264" height="42" rx="3" fill={INK} />
            <path
              d="M72 181l4 4 7-9"
              fill="none"
              stroke={SHEET}
              strokeWidth="1.3"
            />
            <Note x="166" y="186" size={10} fill={SHEET} anchor="middle">
              deployed
            </Note>
          </g>
        </g>
      </g>

      {/* A folded, revised bill. This is the case study's website estimate,
          not a claim about the whole company's cloud spend. */}
      <g transform="translate(138 566) rotate(6)">
        <g
          className="site-obj"
          style={{ "--tilt-in": "5deg" } as React.CSSProperties}
        >
          <path d="M5 5H245L275 35V251H5Z" fill={SHEET} stroke={RULE} />
          <path d="M0 0H240L270 30V246H0Z" fill={SHEET} stroke={INK} />
          <path d="M240 0V30H270" fill={PANEL} stroke={INK} />
          <Note x="18" y="27" size={8}>
            Monthly pipeline estimate
          </Note>
          <Note x="18" y="47" size={7}>
            website frontend · one application
          </Note>
          <line x1="18" y1="61" x2="252" y2="61" stroke={RULE} />
          <Note x="18" y="84" size={8}>
            original pipeline
          </Note>
          <Note x="252" y="84" size={12} fill={INK} anchor="end">
            $32 / mo
          </Note>
          <path
            className="site-draw"
            style={beat(0.82, 0.06)}
            d="M15 80 255 73"
            fill="none"
            stroke={INK}
            strokeWidth="1.5"
            pathLength={1}
          />
          <g className="site-step-in" style={beat(0.88, 0.08)} data-cicd="bill">
            <Note x="18" y="112" size={8} fill={INK}>
              revised estimate
            </Note>
            <Note
              x="252"
              y="113"
              size={15}
              fill={INK}
              anchor="end"
              weight={500}
            >
              $8 / mo
            </Note>
            <path d="M198 125q30 9 56-4" stroke={INK} fill="none" />
          </g>
          <line x1="18" y1="144" x2="252" y2="144" stroke={RULE} />
          <Note x="18" y="165" size={7}>
            5 runs per day
          </Note>
          <Note x="18" y="181" size={7}>
            $0.008 per deployment minute
          </Note>
          <Note x="18" y="213" size={7}>
            illustrated from the case study
          </Note>
          <path d="M14 238H252" stroke={RULE} strokeDasharray="3 3" />
        </g>
      </g>

      {/* The rail is behind the solid container; its payload moves with scroll. */}
      <g stroke={RULE} fill="none">
        <path d="M394 760H1010M394 766H1010M394 752v23M1010 752v23" />
        {Array.from({ length: 18 }, (_, i) => (
          <path key={i} d={`M${410 + i * 33} 760l-7 6`} />
        ))}
      </g>
      <g className="site-art__lift">
        <CicdContainer />
      </g>

      <g transform="translate(1128 692)">
        <g className="site-rise" style={beat(0.88, 0.1)} data-cicd="outcome">
          <text
            y="48"
            fill={INK}
            fontSize="64"
            fontWeight="500"
            letterSpacing="-0.04em"
          >
            40 → 10
          </text>
          <Note x="4" y="72" size={9}>
            deploy minutes · website pipeline
          </Note>
        </g>
      </g>

      <Leader
        d="M485 128v-22"
        x={485}
        y={96}
        label="GitHub Actions"
        anchor="middle"
      />
      <Tip x={485} y={108} angle={-90} />
    </>
  );
}

/** A clinical-review sheet on a real clipboard, lifted over the title. */
