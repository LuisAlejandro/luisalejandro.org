import { FaqSection } from "@components/Home/FaqSection";
import { PhilosophySection } from "@components/Home/PhilosophySection";
import { ProofBlock } from "@components/Home/ProofBlock";

export function HomeContentSections() {
  return (
    <div className="home-content-sections w-full">
      <PhilosophySection />
      <ProofBlock />
      <FaqSection />
    </div>
  );
}
