type GlanceItem = { value: string; label: string };

/**
 * "At a glance": a few figures that stand in for the illustration a case study
 * does not have yet. It sits where the others place their drawing, as a
 * ruled list in the redesign's spec style.
 */
export function CaseStudyGlance({
  title = "At a glance",
  items,
}: {
  title?: string;
  items: GlanceItem[];
}) {
  return (
    <aside className="site-case-glance" aria-label={title}>
      <p className="site-note">{title}</p>
      <dl>
        {items.map((item) => (
          <div key={item.label}>
            <dt className="site-case-glance__value">{item.value}</dt>
            <dd>{item.label}</dd>
          </div>
        ))}
      </dl>
    </aside>
  );
}
