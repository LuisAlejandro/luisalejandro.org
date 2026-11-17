"use client";

import {
  INK,
  RULE,
  PAPER,
  Note,
  SHEET,
  PANEL,
  beat,
  Layer,
  Obj,
  Win,
  Check,
  Stamp,
  Figure,
} from "./shared";

/** A padlock whose shackle lifts open, tagged with the home Mash keeps apart. */
export function MashLock() {
  return (
    <g transform="translate(560 552) rotate(-6)">
      <g
        className="site-obj"
        style={{ "--tilt-in": "-5deg" } as React.CSSProperties}
      >
        {/* Shackle first, so the body covers its legs; it rises on its beat. */}
        <g
          style={{
            transform:
              "translateY(calc(clamp(0, (var(--p) - 0.62) / 0.12, 1) * -26px))",
          }}
        >
          <path
            d="M34 24V-46a46 46 0 0 1 92 0V24"
            fill="none"
            stroke={INK}
            strokeWidth="14"
          />
          <path
            d="M34 24V-46a46 46 0 0 1 92 0V24"
            fill="none"
            stroke={SHEET}
            strokeWidth="12"
          />
        </g>
        <rect
          x="5"
          y="5"
          width="160"
          height="130"
          rx="12"
          fill={SHEET}
          stroke={RULE}
        />
        <rect width="160" height="130" rx="12" fill={SHEET} stroke={INK} />
        <path d="M0 20H160M0 112H160" stroke={RULE} />
        <circle cx="80" cy="58" r="11" fill="none" stroke={INK} />
        <path d="M75 66l-4 26h18l-4-26" fill={PANEL} stroke={INK} />
        <Note x="80" y="126" size={6.5} anchor="middle">
          no vendor lock
        </Note>
        {/* String and tag. */}
        <path d="M150 104c40 30 70 22 96 2" fill="none" stroke={INK} />
        <g transform="translate(240 48) rotate(8)">
          <path
            d="M18 0H186V112H18L0 56Z"
            transform="translate(4 4)"
            fill={SHEET}
            stroke={RULE}
          />
          <path d="M18 0H186V112H18L0 56Z" fill={SHEET} stroke={INK} />
          <circle cx="20" cy="56" r="6" fill={PANEL} stroke={INK} />
          <Note x="38" y="26" size={7}>
            config / isolated
          </Note>
          <Note x="38" y="56" size={18} fill={INK} weight={500}>
            ~/.mash
          </Note>
          <path d="M38 70H172" stroke={RULE} />
          <Note x="38" y="88" size={7}>
            your home untouched
          </Note>
          <Note x="38" y="102" size={7}>
            env vars, never HOME
          </Note>
        </g>
      </g>
    </g>
  );
}

/** Mash: one window holding terminal, agent and editor; every tool pinned. */
export function MashArt({ layer = "back" }: { layer?: Layer }) {
  if (layer === "front") return <MashLock />;

  const code = [228, 170, 262, 120, 200, 240, 150];
  const hits = [1, 3, 5];
  return (
    <>
      {/* The workspace: Herdr tabs over two panes, Pi beside Fresh. */}
      <Obj x={220} y={150} r={-3} tilt={-4}>
        <Win w={660} h={300} title="mash · ghostty + herdr" />
        <rect x="1" y="29" width="149" height="23" fill={PANEL} />
        <path d="M0 52H660M150 28V52M300 28V52M450 28V52" stroke={INK} />
        <Note x="14" y="44" size={8} fill={INK}>
          01 launcher
        </Note>
        <Note x="164" y="44" size={8}>
          02 blog-post
        </Note>
        <g className="site-step-in" style={beat(0.5)}>
          <circle cx="284" cy="41" r="3.5" fill={INK} />
        </g>
        <Note x="314" y="44" size={8}>
          03 release
        </Note>
        <path
          className="site-draw"
          style={beat(0.06, 0.12)}
          d="M300 52V272"
          stroke={INK}
          pathLength={1}
        />

        {/* Pi, the agent. */}
        <Note x="16" y="74" size={8}>
          pi · agent
        </Note>
        <path d="M16 84H284" stroke={RULE} />
        <Note x="16" y="106" size={9} fill={INK}>
          {"> find every MASH_HOME"}
        </Note>
        {[240, 196, 252, 148].map((w, i) => (
          <g key={w} className="site-step-in" style={beat(0.16 + i * 0.06)}>
            <rect
              x="16"
              y={120 + i * 16}
              width={w}
              height="6"
              fill={PANEL}
              stroke={RULE}
            />
          </g>
        ))}
        <g className="site-step-in" style={beat(0.42)}>
          <Note x="16" y="208" size={8} fill={INK}>
            opened 3 matches in fresh
          </Note>
        </g>

        {/* Fresh, the shared editor, with the search the terminal never had. */}
        <Note x="316" y="74" size={8}>
          fresh · launcher.sh
        </Note>
        <rect
          x="316"
          y="84"
          width="328"
          height="22"
          rx="3"
          fill="none"
          stroke={INK}
        />
        <Note x="326" y="99" size={8} fill={INK}>
          search: MASH_HOME
        </Note>
        <g className="site-step-in" style={beat(0.36)}>
          <Note x="634" y="99" size={7} anchor="end">
            3 matches
          </Note>
        </g>
        {code.map((w, i) => (
          <g key={i}>
            <Note x="320" y={132 + i * 19} size={6.5}>
              {String(40 + i)}
            </Note>
            <rect x="344" y={126 + i * 19} width={w} height="6" fill={PANEL} />
          </g>
        ))}
        {hits.map((row, k) => (
          <g key={row} className="site-step-in" style={beat(0.44 + k * 0.06)}>
            <rect
              x="338"
              y={119 + row * 19}
              width="306"
              height="18"
              fill="none"
              stroke={INK}
            />
          </g>
        ))}

        <path d="M0 272H660" stroke={INK} />
        <Note x="14" y="290" size={7}>
          herdr · 3 tabs · 1 waiting on you
        </Note>
        <Note x="646" y="290" size={7} anchor="end">
          one window
        </Note>
      </Obj>

      {/* Pin manifest on a clipboard: each tool by version and checksum. */}
      <Obj x={950} y={140} r={6} tilt={4}>
        <rect
          x="-6"
          y="-5"
          width="223"
          height="277"
          rx="4"
          fill={SHEET}
          stroke={INK}
        />
        <rect width="210" height="264" fill={SHEET} stroke={RULE} />
        <rect
          x="67"
          y="-9"
          width="76"
          height="16"
          rx="3"
          fill={SHEET}
          stroke={INK}
        />
        <Note x="16" y="33" size={8} fill={INK}>
          pin manifest
        </Note>
        <Note x="194" y="33" size={7} anchor="end">
          sha-256
        </Note>
        <path d="M16 45H194" stroke={RULE} />
        {["ghostty", "herdr", "fresh", "pi", "python", "node"].map(
          (name, i) => (
            <g key={name}>
              <Note x="16" y={72 + i * 28} size={8} fill={INK}>
                {name}
              </Note>
              <path
                d={`M78 ${69 + i * 28}H164`}
                stroke={RULE}
                strokeWidth="5"
                strokeDasharray="2 2"
              />
              <rect
                x="174"
                y={62 + i * 28}
                width="12"
                height="12"
                fill="none"
                stroke={INK}
              />
              <Check x={176.5} y={68 + i * 28} at={0.18 + i * 0.07} />
            </g>
          )
        )}
        <path d="M16 236H194" stroke={RULE} />
        <Note x="16" y="254" size={7}>
          65 components · 4 targets
        </Note>
      </Obj>

      {/* The first-launch wizard asking for a language. */}
      <Obj x={1220} y={262} r={7} tilt={4}>
        <rect
          x="5"
          y="5"
          width="270"
          height="182"
          rx="6"
          fill={SHEET}
          stroke={RULE}
        />
        <rect width="270" height="182" rx="6" fill={SHEET} stroke={INK} />
        <Note x="16" y="24" size={7}>
          first launch · step 1 / 3
        </Note>
        <path d="M16 35H254" stroke={RULE} />
        <Note x="16" y="60" size={12} fill={INK} weight={500}>
          Language
        </Note>
        {["English", "Español", "Português"].map((label, i) => (
          <g key={label}>
            <rect
              x="16"
              y={74 + i * 26}
              width="238"
              height="21"
              rx="3"
              fill="none"
              stroke={RULE}
            />
            <Note x="26" y={88 + i * 26} size={8}>
              {label}
            </Note>
          </g>
        ))}
        <g className="site-step-in" style={beat(0.32)}>
          <rect x="16" y="100" width="238" height="21" rx="3" fill={INK} />
          <Note x="26" y="114" size={8} fill={PAPER}>
            Español
          </Note>
          <path
            d="M234 110l3 3 6-8"
            fill="none"
            stroke={PAPER}
            strokeWidth="1.2"
          />
        </g>
        <Note x="16" y="170" size={7}>
          + 12 more · 15 in the interface
        </Note>
      </Obj>

      {/* The Linux package, boxed and signed for the APT repository. */}
      <Obj x={118} y={630} r={5} tilt={5}>
        <path d="M0 18 22 0H218L196 18Z" fill={SHEET} stroke={INK} />
        <path d="M196 18 218 0V124L196 142Z" fill={SHEET} stroke={INK} />
        <rect y="18" width="196" height="124" fill={SHEET} stroke={INK} />
        <path d="M90 18V142M106 18V142M98 18 120 0" fill="none" stroke={RULE} />
        <rect x="20" y="50" width="156" height="56" fill={SHEET} stroke={INK} />
        <Note x="98" y="74" size={9} fill={INK} anchor="middle" weight={500}>
          mash_amd64.deb
        </Note>
        <Note x="98" y="94" size={7} anchor="middle">
          ubuntu · apt repository
        </Note>
        <Note x="20" y="132" size={6.5}>
          this side up ↑
        </Note>
        <Stamp x={150} y={120} r={-10} w={96} at={0.6}>
          signed
        </Stamp>
      </Obj>

      <g className="site-art__lift">
        <MashLock />
      </g>
      <Figure
        x={1200}
        y={676}
        value="12K"
        lines={["views on the launch post", "reported in the case study"]}
      />
    </>
  );
}
