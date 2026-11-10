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

export type ServiceItem = {
  num: string;
  title: string;
  description: string;
  tags: string[];
};

export const servicesList: ServiceItem[] = [
  {
    num: "01",
    title: "Backend architecture and APIs",
    description:
      "Type-safe APIs and microservices that the next engineer can pick up without archaeology. Documented decisions, clean patterns, and predictable throughput.",
    tags: ["TypeScript", "Python", "Go", "FastAPI", "Django"],
  },
  {
    num: "02",
    title: "Third-party integrations",
    description:
      "Connecting products to external platforms at scale, such as the Expedia integration that took Wheel the World from roughly 1,000 to 600,000+ properties.",
    tags: ["REST APIs", "Node.js", "Go", "Redis", "Stripe"],
  },
  {
    num: "03",
    title: "CI/CD hardening and legacy rescue",
    description:
      "Reliable delivery pipelines and step-by-step modernisation of legacy systems, without a high-risk big-bang rewrite.",
    tags: ["CI/CD", "Docker", "GitHub Actions", "Google Cloud"],
  },
];

export const sectionTitles = {
  metrics: "Selected impact",
  work: "Selected work",
  services: "Services",
  faq: "Working with me",
  blog: "From the blog",
  cta: "Next",
};

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

export const heroContent = {
  status: {
    role: "LUIS ALEJANDRO · SOFTWARE ENGINEER",
    location: "BASE · 10.25° N, 67.60° W · MARACAY, VENEZUELA",
    availability: "OPEN TO REMOTE WORK",
  },
  headline: {
    lead: "I build backends.",
    typed:
      "APIs, integrations and open source tools that stay dependable after launch.",
  },
  labels: [
    { glyph: "●", text: `${experience}+ YEARS OF EXPERIENCE` },
    { glyph: "◆", text: "60+ OPEN SOURCE PROJECTS" },
    { glyph: "▲", text: "REMOTE BY DEFAULT" },
  ],
  actions: {
    primary: { label: "Let's talk →", href: "/contact" },
    secondary: { label: "See the work", href: "/#work" },
  },
};
