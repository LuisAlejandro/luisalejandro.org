"use client";

import { INK, RULE, ACCENT, Note, SHEET, PANEL, beat, Layer } from "./shared";

/** An actual shelf, with crates sliding onto it as the builds pass. */
export function DockershelfRack() {
  return (
    <g transform="translate(424 556) rotate(-3)">
      <g
        className="site-obj"
        style={{ "--tilt-in": "-4deg" } as React.CSSProperties}
      >
        {/* Angle-iron uprights, shelf lip, bolt heads and braces. */}
        <path d="M0 0h14v228H0ZM686 0h14v228h-14Z" fill={SHEET} stroke={INK} />
        {[12, 70, 128, 186, 216].flatMap((y) =>
          [7, 693].map((x) => (
            <circle
              key={`${x}-${y}`}
              cx={x}
              cy={y}
              r="2"
              fill="none"
              stroke={INK}
            />
          ))
        )}
        <path
          d="M14 213h672M14 186l40 27m632-27-40 27"
          fill="none"
          stroke={RULE}
        />
        {["python", "node", "debian"].map((name, i) => (
          <g key={name} transform={`translate(${38 + i * 214} 26)`}>
            <g
              data-story={`crate-${name}`}
              style={{
                transform: `translateX(calc((1 - clamp(0, (var(--p) - ${0.08 + i * 0.15}) / 0.2, 1)) * -120px))`,
              }}
            >
              <path d="M0 18 22 0H198L176 18Z" fill={SHEET} stroke={INK} />
              <path d="M176 18 198 0V146L176 164Z" fill={SHEET} stroke={INK} />
              <rect y="18" width="176" height="146" fill={SHEET} stroke={INK} />
              <path
                d="M0 30H176M0 151H176M12 18V164M164 18V164M0 73H176M0 119H176"
                fill="none"
                stroke={RULE}
              />
              <path
                d="m12 31 152 119M12 151 164 31"
                fill="none"
                stroke={RULE}
              />
              <rect
                x="27"
                y="53"
                width="122"
                height="62"
                fill={SHEET}
                stroke={INK}
              />
              <Note x="88" y="73" size={7} anchor="middle">
                dockershelf
              </Note>
              <Note
                x="88"
                y="96"
                size={15}
                fill={INK}
                anchor="middle"
                weight={500}
              >
                {name}
              </Note>
              {[
                [6, 24],
                [170, 24],
                [6, 158],
                [170, 158],
              ].map(([x, y]) => (
                <circle key={`${x}-${y}`} cx={x} cy={y} r="1.5" fill={INK} />
              ))}
              <g className="site-step-in" style={beat(0.25 + i * 0.15)}>
                <rect
                  x="128"
                  y="125"
                  width="35"
                  height="16"
                  fill={SHEET}
                  stroke={INK}
                />
                <path d="m134 132 4 4 7-8" fill="none" stroke={INK} />
                <Note x="150" y="136" size={6}>
                  ok
                </Note>
              </g>
            </g>
          </g>
        ))}
        <path d="M-12 191H712v19H-12Z" fill={SHEET} stroke={INK} />
        <path d="M-12 197H712" stroke={RULE} />
        <Note x="350" y="205" size={7} anchor="middle">
          Debian stable + sid / amd64 + arm64
        </Note>
      </g>
    </g>
  );
}

/** Dockershelf: assemble the shelf, verify a pull, tick the weekly builds. */

/** Dockershelf: assemble the shelf, verify a pull, tick the weekly builds. */
export function DockershelfArt({ layer = "back" }: { layer?: Layer }) {
  if (layer === "front") return <DockershelfRack />;
  return (
    <>
      {/* Terminal session, with layered downloads rather than fake log metrics. */}
      <g transform="translate(230 160) rotate(-3)">
        <g
          className="site-obj"
          style={{ "--tilt-in": "-4deg" } as React.CSSProperties}
        >
          <rect
            x="5"
            y="5"
            width="640"
            height="281"
            rx="6"
            fill={SHEET}
            stroke={RULE}
          />
          <rect width="640" height="281" rx="6" fill={SHEET} stroke={INK} />
          <path d="M0 29H640" stroke={INK} />
          {[16, 29, 42].map((x) => (
            <circle key={x} cx={x} cy="14" r="3.2" fill="none" stroke={INK} />
          ))}
          <Note x="320" y="18" size={8} anchor="middle">
            dockershelf / terminal
          </Note>
          <Note x="20" y="59" size={11} fill={INK}>
            $ docker pull dockershelf/python
          </Note>
          <Note x="20" y="82" size={8}>
            Debian-based images / build + test + publish
          </Note>
          {["base", "runtime", "packages"].map((name, i) => (
            <g key={name}>
              <Note x="20" y={116 + i * 31} size={9}>
                {name}
              </Note>
              <rect
                x="132"
                y={105 + i * 31}
                width="374"
                height="11"
                rx="2"
                fill="none"
                stroke={RULE}
              />
              <path
                className="site-draw"
                style={beat(0.12 + i * 0.12, 0.2)}
                d={`M136 ${110.5 + i * 31}H502`}
                pathLength={1}
                stroke={INK}
                strokeWidth="5"
              />
              <g className="site-step-in" style={beat(0.32 + i * 0.12)}>
                <Note x="618" y={116 + i * 31} size={8} fill={INK} anchor="end">
                  verified
                </Note>
              </g>
            </g>
          ))}
          <path d="M20 204H620" stroke={RULE} />
          <g
            className="site-step-in"
            style={beat(0.6)}
            data-story="pull-verified"
          >
            <Note x="20" y="229" size={10} fill={INK}>
              status: downloaded and verified
            </Note>
            <Note x="20" y="253" size={8}>
              weekly builds / tests pass before publication
            </Note>
          </g>
        </g>
      </g>

      {/* A steel ruler and size specimen: four units against one. */}
      <g transform="translate(1195 236) rotate(8)">
        <g
          className="site-obj"
          style={{ "--tilt-in": "5deg" } as React.CSSProperties}
        >
          <rect
            x="-5"
            y="-5"
            width="290"
            height="237"
            fill={SHEET}
            stroke={RULE}
          />
          <rect width="280" height="227" fill={SHEET} stroke={INK} />
          <Note x="16" y="25" size={8}>
            Image size / specimen
          </Note>
          <path d="M16 37H264" stroke={RULE} />
          <Note x="16" y="61" size={8}>
            official Python / Node
          </Note>
          <rect
            x="16"
            y="75"
            width="240"
            height="28"
            fill={SHEET}
            stroke={INK}
          />
          <path d="M76 75V103M136 75V103M196 75V103" stroke={RULE} />
          <Note x="16" y="129" size={8}>
            dockershelf equivalent
          </Note>
          <rect x="16" y="143" width="60" height="28" fill={INK} />
          <rect
            x="9"
            y="192"
            width="255"
            height="23"
            rx="2"
            fill={SHEET}
            stroke={INK}
          />
          {Array.from({ length: 25 }, (_, i) => (
            <path
              key={i}
              d={`M${16 + i * 10} 192v${i % 5 === 0 ? 14 : 7}`}
              stroke={INK}
            />
          ))}
          <g className="site-step-in" style={beat(0.72)}>
            <Note x="122" y="161" size={11} fill={INK}>
              ≈ 4× smaller
            </Note>
          </g>
        </g>
      </g>

      {/* Build docket, clipped to a slim board. */}
      <g transform="translate(937 143) rotate(6)">
        <g
          className="site-obj"
          style={{ "--tilt-in": "4deg" } as React.CSSProperties}
        >
          <rect
            x="-6"
            y="-5"
            width="213"
            height="247"
            rx="4"
            fill={SHEET}
            stroke={INK}
          />
          <rect width="200" height="234" fill={SHEET} stroke={RULE} />
          <rect
            x="62"
            y="-9"
            width="76"
            height="16"
            rx="3"
            fill={SHEET}
            stroke={INK}
          />
          <Note x="16" y="33" size={8}>
            Build docket
          </Note>
          <path d="M16 45H184" stroke={RULE} />
          {["Debian stable", "Debian sid", "amd64", "arm64"].map((label, i) => (
            <g key={label}>
              <rect
                x="16"
                y={63 + i * 30}
                width="11"
                height="11"
                fill="none"
                stroke={INK}
              />
              <Note x="37" y={72 + i * 30} size={8}>
                {label}
              </Note>
              <path
                className="site-draw"
                style={beat(0.28 + i * 0.12)}
                d={`M18 ${68 + i * 30}l3 3 5-7`}
                fill="none"
                stroke={INK}
                pathLength={1}
              />
            </g>
          ))}
          <Note x="16" y="214" size={7}>
            publish only if tests pass
          </Note>
        </g>
      </g>

      {/* A weekly calendar strip with six successive build checks. */}
      <g transform="translate(123 635) rotate(5)">
        <g
          className="site-obj"
          style={{ "--tilt-in": "5deg" } as React.CSSProperties}
        >
          <rect
            x="4"
            y="4"
            width="230"
            height="163"
            fill={SHEET}
            stroke={RULE}
          />
          <rect width="230" height="163" fill={SHEET} stroke={INK} />
          {Array.from({ length: 7 }, (_, i) => (
            <circle
              key={i}
              cx={22 + i * 31}
              cy="10"
              r="3"
              fill={PANEL}
              stroke={INK}
            />
          ))}
          <Note x="16" y="40" size={10} fill={INK}>
            Weekly build + test
          </Note>
          <path d="M16 53H214" stroke={RULE} />
          {Array.from({ length: 6 }, (_, i) => (
            <g key={i}>
              <rect
                x={18 + (i % 3) * 69}
                y={69 + Math.floor(i / 3) * 37}
                width="58"
                height="27"
                fill="none"
                stroke={RULE}
              />
              <Note
                x={24 + (i % 3) * 69}
                y={86 + Math.floor(i / 3) * 37}
                size={6.5}
              >{`W${i + 1}`}</Note>
              <path
                className="site-draw"
                style={beat(0.5 + i * 0.055, 0.06)}
                d={`M${50 + (i % 3) * 69} ${82 + Math.floor(i / 3) * 37}l3 3 7-9`}
                pathLength={1}
                fill="none"
                stroke={INK}
              />
            </g>
          ))}
        </g>
      </g>
      <g className="site-art__lift">
        <DockershelfRack />
      </g>
      <g className="site-art__figure" transform="translate(1200 676)">
        <g
          className="site-rise"
          style={beat(0.86, 0.12)}
          data-story="dockershelf-outcome"
        >
          <text
            y="62"
            fill={ACCENT}
            fontSize="102"
            fontWeight="500"
            letterSpacing="-.045em"
          >
            294K
          </text>
          <Note x="4" y="87" size={9}>
            Python image downloads
          </Note>
          <Note x="4" y="105" size={7}>
            reported in the case study
          </Note>
        </g>
      </g>
    </>
  );
}

/** Institutional deployment note, stamped in ink rather than a copied seal. */
