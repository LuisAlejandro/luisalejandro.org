import { config, experience } from "@constants/constants";

export type ProofPoint = {
  metric: string;
  project: string;
  context: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export const philosophy = `I build production systems for SaaS and distributed-product teams who need a reliable remote engineer over the long haul. With ${experience}+ years of experience, my work centers on clear async communication, explicit ownership, and shipping maintainable APIs and services that stay dependable after launch. Whether integrating third-party platforms or scaling backend throughput, I treat remote collaboration as the default operating mode—not a compromise. Clients get consistent delivery, documented decisions, and maintainable codebases the next engineer can pick up without archaeology.`;

export const proofPoints: ProofPoint[] = [
  {
    metric: "294K+ downloads",
    project: "Dockershelf",
    context:
      "because developers needed lean Python, Node, and Debian Docker images that are roughly four times smaller than official alternatives.",
  },
  {
    metric: "39% booking increase",
    project: "Expedia API integration for Wheel the World",
    context:
      "because connecting their hotel catalog from roughly 1,000 to 600,000+ properties made accessible travel inventory discoverable at scale.",
  },
  {
    metric: "60+ open source projects",
    project: "public GitHub portfolio",
    context:
      "because I ship reusable libraries and tools that other teams can adopt without vendor lock-in.",
  },
];

export const faqItems: FaqItem[] = [
  {
    question: "What backend frameworks and languages do you use?",
    answer:
      "I specialize in TypeScript, Python, and Go because they offer the optimal balance of developer velocity, type safety, and production execution performance. I build backends primarily using Node.js and Express, Python with Django and FastAPI, and Go for highly concurrent microservices. I prefer FastAPI for lightweight, type-safe API design and Go when throughput and predictable latency matter most.",
  },
  {
    question: "Are you available for remote work?",
    answer:
      "Yes. I have worked remotely for more than a decade across U.S. and European time zones. I communicate asynchronously by default—written specs, recorded demos, and clear handoffs—while staying reachable for overlap hours when real-time collaboration helps.",
  },
  {
    question: "What types of engagements do you accept?",
    answer:
      "I take on long-term remote contracts and focused project work for SaaS products, API platforms, and developer tooling. Typical engagements include backend architecture, third-party integrations, CI/CD hardening, and rescuing legacy systems without a big-bang rewrite.",
  },
  {
    question: "How can I start a conversation about hiring you?",
    answer: `Visit the contact page at ${config.url}/contact to send a message with your project scope, timeline, and team context. I reply to serious contract and full-time remote inquiries within a few business days.`,
  },
];

export const sectionTitles = {
  philosophy: "How I work remotely",
  proof: "Selected impact",
  faq: "Frequently asked questions",
};
