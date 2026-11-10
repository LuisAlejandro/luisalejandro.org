import type { ReactNode } from "react";

type SectionHeaderProps = {
  num: string;
  label: string;
  note?: ReactNode;
  id?: string;
};

export function SectionHeader({ num, label, note, id }: SectionHeaderProps) {
  return (
    <div
      id={id}
      className="flex items-baseline justify-between border-b border-rule pb-3.5 mb-8 lg:mb-12 site-note text-[0.75rem]"
    >
      <div className="flex items-baseline gap-2.5">
        <span className="text-signal font-medium">[{num}]</span>
        <span className="text-ink font-medium tracking-wider">{label}</span>
      </div>
      {note && <div className="text-ink-muted text-[0.75rem]">{note}</div>}
    </div>
  );
}
