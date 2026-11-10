import { experience } from "@constants/constants";

export type ImpactRow = {
  metric: string;
  note: string;
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
    title: "AI agents and LLM features",
    description:
      "Agent workflows, retrieval and model calls wired into real products, with tests and fallbacks so they keep working after the demo.",
    tags: ["LLM APIs", "Agents", "RAG", "MCP", "Python"],
  },
  {
    num: "02",
    title: "Full-stack product builds",
    description:
      "Next.js and React on the front, type-safe APIs in TypeScript, Python or Go behind it, shipped as one product the next engineer can pick up without archaeology.",
    tags: ["TypeScript", "Next.js", "React", "FastAPI", "Go"],
  },
  {
    num: "03",
    title: "Integrations and delivery",
    description:
      "Third-party platforms connected at scale, like the Expedia integration that took Wheel the World from about 1,000 to 600,000+ properties, on pipelines that ship safely.",
    tags: ["REST APIs", "Stripe", "Docker", "GitHub Actions", "Google Cloud"],
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

/** The right-hand note on each section header. */
export const sectionNotes = {
  metrics: "fig. 01 · shipped, then measured",
  work: "Five builds, in order",
  services: "See the portfolio →",
  faq: "Typical reply: 3 business days",
  cta: "3 business days",
};

/**
 * The 01 slot: one short line per number, at heading size. The note is the
 * measurement's source, printed in the margin like a figure caption.
 */
export const impactRows: ImpactRow[] = [
  { metric: "294K downloads", note: "dockershelf · docker hub" },
  { metric: "39% more bookings", note: "wheel the world · Q1 2023" },
  { metric: "60+ open projects", note: "github.com/LuisAlejandro" },
];

export const workIntro =
  "Five builds I can talk about: a booking engine that carried accessible inventory at scale, a pipeline rescue, a desktop diagnostic tool, an image library half a million pulls deep, and a distribution that shipped to public offices.";

export const impactLead =
  "Three numbers from work that shipped. The Dockershelf images are roughly a quarter the size of the official ones, the Expedia integration put 600,000 accessible properties on the map, and the rest is open source you can read tonight.";

export const faqItems: FaqItem[] = [
  {
    question: "What stack do you use?",
    answer:
      "TypeScript, Python and Go: Next.js and React on the front, Node, FastAPI and Go behind it, and LLM APIs with agent tooling where AI earns its place.",
  },
  {
    question: "Are you available for remote work?",
    answer:
      "Yes. More than a decade of remote work across US and European time zones, asynchronous by default, with overlap hours when real time helps.",
  },
  {
    question: "What types of engagements do you accept?",
    answer:
      "Long-term remote contracts and focused projects: full-stack builds, AI features and agents, third-party integrations, and CI/CD hardening.",
  },
  {
    question: "How can I start a conversation?",
    answer:
      "Send your project scope, timeline and team context through the contact page. Serious contract and full-time remote inquiries get a reply within a few business days.",
  },
];

/** Two lines, set at heading size above the four steps. */
export const faqClaim = ["You bring the product.", "I make it hold."];

export const heroContent = {
  status: {
    role: "Luis Alejandro · fullstack AI engineer",
    location: "Base · 10.25° N, 67.60° W · Maracay",
    availability: "Open to remote work",
  },
  headline: {
    lead: "Prompt. Build. Test. Deploy.",
    typed:
      "Full-stack products and AI agents that stay dependable after launch.",
  },
  intro: `Keeping production calm since 2009.`,
  labels: [
    { glyph: "●", text: `${experience}+ years of experience` },
    { glyph: "◆", text: "60+ open source projects" },
    { glyph: "▲", text: "Remote by default" },
  ],
  actions: {
    primary: { label: "Let's talk", href: "/contact" },
    secondary: { label: "See the work", href: "/#work" },
  },
  vortexNote: "main.go · point anywhere to steer the vortex",
};

export const ctaContent = {
  lines: ["Have a product", "to ship with AI?"],
  primary: { label: "Send me the brief" },
  secondary: { label: "Read the blog", href: "/blog" },
};

export const footerContent = {
  claim: "Got a product that needs to ship?",
  claimLink: { label: "Let's talk.", href: "/contact" },
  wordmark: "Luis Alejandro",
  contactLinks: [
    { label: "Send a brief", href: "/contact" },
    { label: "Read the blog", href: "/blog" },
  ],
  markdownTwin: { label: "Markdown", href: "/index.md" },
};
