"use client";

import Hero from "@components/Apps/Hero/Hero";
import { Section } from "@components/common/Layout/Section";
import Contact from "@components/Portfolio/Contact/Contact";
import Header from "@components/Portfolio/Header/Header";

export default function AgorasPage() {
  return (
    <div className="w-full mx-auto">
      <Header />
      <main>
        <Section grid overflowVisible>
          <Hero />
        </Section>
        <Contact />
      </main>
    </div>
  );
}
