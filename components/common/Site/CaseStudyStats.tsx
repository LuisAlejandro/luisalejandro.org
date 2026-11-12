type Stat = {
  value: string;
  /** Lines shown around the number, in reading order. */
  lines: [string] | [string, string];
};

/** One row of outcome numbers, shared by every case study. */
export function CaseStudyStats({ items }: { items: Stat[] }) {
  return (
    <dl className="site-case-stats">
      {items.map((stat) => (
        <div key={`${stat.value}-${stat.lines.join(" ")}`}>
          <dt className="site-case-stats__value">{stat.value}</dt>
          <dd>
            {stat.lines.map((line) => (
              <span key={line} className="site-note block">
                {line}
              </span>
            ))}
          </dd>
        </div>
      ))}
    </dl>
  );
}
