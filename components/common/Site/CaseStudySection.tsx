import type { ReactNode } from "react";

import { DocSection } from "@components/common/Site/DocSection";

type CaseStudySectionProps = {
  /** Two-digit ordinal, e.g. "01". */
  index: string;
  /** Short label, e.g. "Problem". */
  label: string;
  children: ReactNode;
};

/** One numbered narrative section of a case study. */
export function CaseStudySection({
  index,
  label,
  children,
}: CaseStudySectionProps) {
  return (
    <DocSection num={index} label={label}>
      {children}
    </DocSection>
  );
}
