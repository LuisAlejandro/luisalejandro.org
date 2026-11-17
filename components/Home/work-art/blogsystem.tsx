"use client";

import {
  INK,
  RULE,
  ACCENT,
  PAPER,
  Note,
  SHEET,
  PANEL,
  beat,
  Layer,
  Obj,
  Win,
  Check,
  Figure,
} from "./shared";

/** A proof sheet: the draft, a cut, and the one byline signed by hand. */
export function BlogProof() {
  return (
    <g transform="translate(560 548) rotate(-5)">
      <g
        className="site-obj"
        style={{ "--tilt-in": "-5deg" } as React.CSSProperties}
      >
        <rect x="5" y="5" width="350" height="236" fill={SHEET} stroke={RULE} />
        <rect width="350" height="236" fill={SHEET} stroke={INK} />
        <Note x="18" y="24" size={7}>
          proof · general post
        </Note>
        <path d="M18 34H332" stroke={RULE} />
        <Note x="18" y="58" size={15} fill={INK} weight={500}>
          Nine agents, one signature
        </Note>
        {[290, 260, 300, 240, 276].map((w, i) => (
          <rect
            key={i}
            x="18"
            y={74 + i * 16}
            width={w}
            height="6"
            fill={PANEL}
          />
        ))}
        {/* The de-AI pass strikes the tell, in the editor's red. */}
        <g className="site-step-in" style={beat(0.4)}>
          <path d="M14 109H262" stroke={ACCENT} strokeWidth="1.5" />
          <Note x="270" y="112" size={7} fill={ACCENT}>
            tricolon
          </Note>
        </g>
        <g className="site-step-in" style={beat(0.48)}>
          <path d="M14 141H220" stroke={ACCENT} strokeWidth="1.5" />
          <Note x="228" y="144" size={7} fill={ACCENT}>
            summary nobody needed
          </Note>
        </g>
        <path d="M18 168H332" stroke={RULE} />
        <Note x="18" y="210" size={7}>
          byline
        </Note>
        <path d="M80 210H332" stroke={RULE} />
        <path
          className="site-draw"
          style={beat(0.74, 0.14)}
          d="M96 204q6-26 12-8t9-2q6-16 8 2t10-4q6 18 16 4t14-2q10-10 18 0t22-4q12 4 30-6"
          fill="none"
          stroke={INK}
          strokeWidth="1.3"
          pathLength={1}
        />
      </g>
    </g>
  );
}

/** The blog system: a premise, a claim pack, nine agents and a social queue. */
export function BlogSystemArt({ layer = "back" }: { layer?: Layer }) {
  if (layer === "front") return <BlogProof />;

  const agents = [
    "researcher",
    "seo writer",
    "engineer",
    "storyteller",
    "reviewer",
    "analyst",
    "de-ai editor",
    "illustrator",
    "publisher",
  ];
  return (
    <>
      {/* The premise file and the agent roster that picks it up. */}
      <Obj x={214} y={150} r={-3} tilt={-4}>
        <Win w={660} h={296} title="blog · generate" />
        <Note x="20" y="54" size={8}>
          post.md · frontmatter
        </Note>
        <path d="M20 64H260" stroke={RULE} />
        {[
          ["premise:", "one line"],
          ["type:", "technical"],
          ["freshness:", "research"],
          ["audience:", "engineers"],
          ["media:", "2 placeholders"],
        ].map(([k, v], i) => (
          <g key={k}>
            <Note x="20" y={88 + i * 22} size={9}>
              {k}
            </Note>
            <Note x="118" y={88 + i * 22} size={9} fill={INK}>
              {v}
            </Note>
          </g>
        ))}
        <rect
          x="20"
          y="210"
          width="240"
          height="64"
          rx="3"
          fill="none"
          stroke={RULE}
        />
        <Note x="32" y="232" size={8} fill={INK}>
          $ make generate
        </Note>
        <g className="site-step-in" style={beat(0.66)}>
          <Note x="32" y="256" size={8}>
            draft · images · placeholders replaced
          </Note>
        </g>

        {/* Nine agents; the post type lights the ones that earn their place. */}
        <Note x="292" y="54" size={8}>
          agents
        </Note>
        <path d="M292 64H640" stroke={RULE} />
        {agents.map((name, i) => {
          const x = 292 + (i % 3) * 118;
          const y = 78 + Math.floor(i / 3) * 62;
          const on = [0, 2, 6, 7, 8].includes(i);
          return (
            <g key={name}>
              <rect
                x={x}
                y={y}
                width="108"
                height="50"
                rx="3"
                fill="none"
                stroke={RULE}
              />
              <circle cx={x + 16} cy={y + 18} r="7" fill="none" stroke={INK} />
              <Note x={x + 30} y={y + 22} size={7.5} fill={INK}>
                {name}
              </Note>
              <Note x={x + 10} y={y + 41} size={6}>
                {String(i + 1).padStart(2, "0")}
              </Note>
              {on && (
                <g
                  className="site-step-in"
                  style={beat(0.12 + [0, 2, 6, 7, 8].indexOf(i) * 0.1)}
                >
                  <rect
                    x={x}
                    y={y}
                    width="108"
                    height="50"
                    rx="3"
                    fill="none"
                    stroke={INK}
                    strokeWidth="1.5"
                  />
                  <circle cx={x + 16} cy={y + 18} r="4" fill={INK} />
                  <Note x={x + 98} y={y + 41} size={6} fill={INK} anchor="end">
                    run
                  </Note>
                </g>
              )}
            </g>
          );
        })}
      </Obj>

      {/* The claim pack: sources fetched today, each claim ticked against them. */}
      <Obj x={954} y={146} r={6} tilt={4}>
        <rect x="5" y="5" width="220" height="276" fill={SHEET} stroke={RULE} />
        <rect width="220" height="276" fill={SHEET} stroke={INK} />
        <path d="M0 0H220V36H0Z" fill={PANEL} stroke={INK} />
        <Note x="16" y="23" size={8} fill={INK}>
          claim pack · fetched today
        </Note>
        {[
          ["price", "source ↗"],
          ["model name", "source ↗"],
          ["release date", "source ↗"],
          ["benchmark", "source ↗"],
          ["product state", "source ↗"],
        ].map(([claim, src], i) => (
          <g key={claim}>
            <rect
              x="16"
              y={54 + i * 36}
              width="11"
              height="11"
              fill="none"
              stroke={INK}
            />
            <Check x={17.5} y={60 + i * 36} at={0.26 + i * 0.07} />
            <Note x="36" y={63 + i * 36} size={8} fill={INK}>
              {claim}
            </Note>
            <Note x="204" y={63 + i * 36} size={6.5} anchor="end">
              {src}
            </Note>
            <path d={`M16 ${76 + i * 36}H204`} stroke={RULE} />
          </g>
        ))}
        <Note x="16" y="252" size={6.5}>
          no claim added, none dropped
        </Note>
      </Obj>

      {/* The social queue: one post scheduled across six networks. */}
      <Obj x={1222} y={270} r={-7} tilt={-4}>
        <rect x="5" y="5" width="260" height="170" fill={SHEET} stroke={RULE} />
        <rect width="260" height="170" fill={SHEET} stroke={INK} />
        <Note x="16" y="24" size={8}>
          social queue · this week
        </Note>
        <path d="M16 35H244" stroke={RULE} />
        {["mon", "tue", "wed", "thu", "fri", "sat"].map((d, i) => (
          <g key={d}>
            <rect
              x={16 + i * 38}
              y="48"
              width="32"
              height="100"
              fill="none"
              stroke={RULE}
            />
            <Note x={32 + i * 38} y="62" size={6.5} anchor="middle">
              {d}
            </Note>
            <g className="site-step-in" style={beat(0.5 + i * 0.05)}>
              <rect
                x={20 + i * 38}
                y={76 + (i % 3) * 18}
                width="24"
                height="16"
                fill={INK}
              />
            </g>
          </g>
        ))}
        <Note x="16" y="162" size={6.5}>
          6 platforms · from the same post
        </Note>
      </Obj>

      {/* A fountain pen nib: the human part. */}
      <Obj x={150} y={660} r={-24} tilt={-5}>
        <path
          d="M0 22H210L260 11 210 0H0Z"
          transform="translate(4 4)"
          fill={SHEET}
          stroke={RULE}
        />
        <rect
          x="0"
          y="0"
          width="150"
          height="22"
          rx="3"
          fill={SHEET}
          stroke={INK}
        />
        <path d="M150 0H210L262 11 210 22H150Z" fill={SHEET} stroke={INK} />
        <path d="M210 11H262M228 11a3 3 0 1 0 0 .1" fill="none" stroke={INK} />
        <path d="M118 0V22" stroke={RULE} />
        <rect
          x="20"
          y="-6"
          width="80"
          height="6"
          rx="2"
          fill={PAPER}
          stroke={INK}
        />
        <Note x="12" y="15" size={6.5}>
          one byline
        </Note>
      </Obj>

      <g className="site-art__lift">
        <BlogProof />
      </g>
      <Figure
        x={1200}
        y={676}
        value="100×"
        lines={["monthly search impressions", "reported in the case study"]}
      />
    </>
  );
}
