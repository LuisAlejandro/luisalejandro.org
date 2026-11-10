import type { ReactNode } from "react";

type SectionHeaderProps = {
  num: string;
  label: string;
  note?: ReactNode;
  id?: string;
};

/**
 * The rule, the label and the right-hand figure note that open every section.
 * The rule sits above the label, as it does in the reference.
 */
export function SectionHeader({ num, label, note, id }: SectionHeaderProps) {
  return (
    <div id={id} className="site-section-head site-note">
      <h2 className="flex items-baseline gap-2.5">
        <span aria-hidden="true">[{num}]</span>
        <span>{label}</span>
      </h2>
      {note && <div className="text-ink-muted">{note}</div>}
    </div>
  );
}
