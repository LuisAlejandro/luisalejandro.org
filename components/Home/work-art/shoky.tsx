"use client";

import {
  INK,
  MUTED,
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
  Figure,
} from "./shared";

/** A repo tree: one forked workspace with its sibling services under packages/. */
export function ShokyTree() {
  const rows: [number, string, string][] = [
    [0, "shoky-client-a/", ""],
    [1, "repos.list", "3 siblings"],
    [1, "project.env", ""],
    [1, "packages/", ""],
    [2, "api/", "cloned"],
    [2, "web/", "cloned"],
    [2, "contracts/", "cloned"],
    [1, "memory-bank/", "curated"],
  ];
  return (
    <g transform="translate(560 560) rotate(-5)">
      <g
        className="site-obj"
        style={{ "--tilt-in": "-5deg" } as React.CSSProperties}
      >
        <rect x="5" y="5" width="340" height="232" fill={SHEET} stroke={RULE} />
        <rect width="340" height="232" fill={SHEET} stroke={INK} />
        <Note x="16" y="22" size={7}>
          fork · one per project
        </Note>
        <path d="M0 32H340" stroke={INK} />
        {rows.map(([depth, name, tag], i) => {
          const x = 22 + depth * 22;
          const y = 54 + i * 22;
          const late = depth === 2 || name === "memory-bank/";
          const body = (
            <>
              {depth > 0 && (
                <path
                  d={`M${x - 14} ${y - 18}V${y - 4}H${x - 4}`}
                  fill="none"
                  stroke={RULE}
                />
              )}
              <Note
                x={x}
                y={y}
                size={9}
                fill={name.endsWith("/") ? INK : MUTED}
              >
                {name}
              </Note>
              {tag && (
                <Note x="322" y={y} size={7} anchor="end">
                  {tag}
                </Note>
              )}
            </>
          );
          return late ? (
            <g key={name} className="site-step-in" style={beat(0.3 + i * 0.07)}>
              {body}
            </g>
          ) : (
            <g key={name}>{body}</g>
          );
        })}
      </g>
    </g>
  );
}

/** Shoky: a template forked into projects, a skill pipeline, memory per repo. */
export function ShokyArt({ layer = "back" }: { layer?: Layer }) {
  if (layer === "front") return <ShokyTree />;

  const stages = ["design", "prd", "plan", "work", "review", "pr"];
  return (
    <>
      {/* The workflow as a terminal checklist of skills. */}
      <Obj x={220} y={150} r={-3} tilt={-4}>
        <Win w={640} h={290} title="shoky · agent workflow" />
        <Note x="20" y="58" size={11} fill={INK}>
          $ ./scripts/init-template.sh
        </Note>
        <Note x="20" y="80" size={8}>
          one change, every repo it touches
        </Note>
        {/* Six stages as connected stations. */}
        <path d="M44 140H596" stroke={RULE} />
        <path
          className="site-draw"
          style={beat(0.1, 0.55)}
          d="M44 140H596"
          stroke={INK}
          strokeWidth="2"
          pathLength={1}
        />
        {stages.map((name, i) => {
          const x = 44 + i * 110.4;
          return (
            <g key={name}>
              <circle cx={x} cy="140" r="13" fill={SHEET} stroke={INK} />
              <g className="site-step-in" style={beat(0.12 + i * 0.09)}>
                <circle cx={x} cy="140" r="7" fill={INK} />
              </g>
              <Note x={x} y="172" size={8} fill={INK} anchor="middle">
                {name}
              </Note>
              <Note x={x} y="114" size={6.5} anchor="middle">
                {String(i + 1).padStart(2, "0")}
              </Note>
            </g>
          );
        })}
        <path d="M20 200H620" stroke={RULE} />
        {/* Three coordinated pull requests, one per repo. */}
        {["api", "web", "contracts"].map((repo, i) => (
          <g key={repo}>
            <rect
              x={20 + i * 204}
              y="216"
              width="190"
              height="52"
              rx="3"
              fill="none"
              stroke={RULE}
            />
            <Note x={32 + i * 204} y="236" size={7}>
              {`pull request · ${repo}`}
            </Note>
            <Note x={32 + i * 204} y="256" size={9} fill={INK}>
              {`#${41 + i * 7}`}
            </Note>
            <g className="site-step-in" style={beat(0.64 + i * 0.06)}>
              <rect
                x={136 + i * 204}
                y="244"
                width="62"
                height="16"
                rx="8"
                fill={INK}
              />
              <Note
                x={167 + i * 204}
                y="255"
                size={6.5}
                fill={PAPER}
                anchor="middle"
              >
                merged
              </Note>
            </g>
          </g>
        ))}
      </Obj>

      {/* Memory Bank: three index cards, one per file, held by a clip. */}
      <Obj x={960} y={160} r={7} tilt={5}>
        {["progress", "tech context", "system patterns"].map((name, i) => (
          <g
            key={name}
            transform={`translate(${i * -10} ${i * 14}) rotate(${i * -3})`}
          >
            <rect width="210" height="150" fill={SHEET} stroke={INK} />
            <path d="M0 30H210" stroke={INK} />
            {[52, 72, 92, 112, 132].map((y) => (
              <path key={y} d={`M14 ${y}H196`} stroke={RULE} />
            ))}
            <Note x="14" y="21" size={8} fill={INK}>
              {name}
            </Note>
          </g>
        ))}
        <g transform="translate(-20 28) rotate(-6)">
          <Note x="14" y="47" size={7}>
            from git history, then curated
          </Note>
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <rect
                x="14"
                y={60 + i * 20}
                width="11"
                height="11"
                fill="none"
                stroke={INK}
              />
              <Check x={15.5} y={66 + i * 20} at={0.36 + i * 0.08} />
              <rect
                x="32"
                y={63 + i * 20}
                width={[120, 96, 140][i]}
                height="5"
                fill={PANEL}
              />
            </g>
          ))}
        </g>
        <rect
          x="-8"
          y="-12"
          width="54"
          height="22"
          rx="4"
          fill={SHEET}
          stroke={INK}
        />
        <path d="M2 -12V-24H36V-12" fill="none" stroke={INK} />
      </Obj>

      {/* The host matrix: three platforms, WSL2 noted. */}
      <Obj x={1236} y={280} r={-7} tilt={-4}>
        <rect x="5" y="5" width="250" height="166" fill={SHEET} stroke={RULE} />
        <rect width="250" height="166" fill={SHEET} stroke={INK} />
        <Note x="16" y="24" size={8}>
          hosts / supported
        </Note>
        <path d="M16 35H234" stroke={RULE} />
        {[
          ["macOS", "native"],
          ["Linux", "native"],
          ["Windows", "WSL2 only"],
        ].map(([host, how], i) => (
          <g key={host}>
            <rect
              x="16"
              y={50 + i * 34}
              width="11"
              height="11"
              fill="none"
              stroke={INK}
            />
            <Check x={17.5} y={56 + i * 34} at={0.22 + i * 0.1} />
            <Note x="36" y={59 + i * 34} size={9} fill={INK}>
              {host}
            </Note>
            <Note x="234" y={59 + i * 34} size={7} anchor="end">
              {how}
            </Note>
          </g>
        ))}
        <Note x="16" y="156" size={6.5}>
          clone inside the linux filesystem
        </Note>
      </Obj>

      {/* A team badge on a lanyard: the onboarding the template replaced. */}
      <Obj x={150} y={620} r={6} tilt={5}>
        <path d="M70 -60 92 0M150 -60 128 0" fill="none" stroke={INK} />
        <rect
          x="88"
          y="-8"
          width="44"
          height="18"
          rx="3"
          fill={SHEET}
          stroke={INK}
        />
        <rect
          x="5"
          y="5"
          width="220"
          height="150"
          rx="8"
          fill={SHEET}
          stroke={RULE}
        />
        <rect width="220" height="150" rx="8" fill={SHEET} stroke={INK} />
        <rect
          x="94"
          y="14"
          width="32"
          height="6"
          rx="3"
          fill={PANEL}
          stroke={INK}
        />
        <Note x="16" y="44" size={7}>
          client project · engineer
        </Note>
        <Note x="16" y="70" size={14} fill={INK} weight={500}>
          day 1 → merged
        </Note>
        <path d="M16 84H204" stroke={RULE} />
        {Array.from({ length: 5 }, (_, i) => (
          <g key={i}>
            <rect
              x={16 + i * 38}
              y="98"
              width="32"
              height="32"
              fill="none"
              stroke={RULE}
            />
            <Note x={20 + i * 38} y="108" size={6}>
              {["mon", "tue", "wed", "thu", "fri"][i]}
            </Note>
          </g>
        ))}
        <Check x={176} y={118} at={0.7} />
      </Obj>

      <g className="site-art__lift">
        <ShokyTree />
      </g>
      <Figure
        x={1200}
        y={676}
        value="~25"
        lines={["engineers working from forks", "reported in the case study"]}
      />
    </>
  );
}
