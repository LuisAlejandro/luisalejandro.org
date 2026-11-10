export type PixelEvent = "ClickHeaderStore" | "ClickHeaderContact";

export type NavItem = {
  num: string;
  label: string;
  href: string;
  external?: boolean;
  pixelEvent?: PixelEvent;
};

export const siteNavItems: NavItem[] = [
  { num: "01", label: "Portfolio", href: "/portfolio" },
  { num: "02", label: "Blog", href: "/blog" },
  {
    num: "03",
    label: "Store",
    href: "https://store.luisalejandro.org/",
    external: true,
    pixelEvent: "ClickHeaderStore",
  },
  {
    num: "04",
    label: "Contact",
    href: "/contact",
    pixelEvent: "ClickHeaderContact",
  },
];

export const siteSocialLinks = [
  { label: "GitHub", href: "https://github.com/LuisAlejandro", external: true },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/martinezfaneyth",
    external: true,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@LuisDevelops",
    external: true,
  },
  { label: "RSS", href: "/blog/posts/feed.xml", external: false },
];

export const contactAction = {
  label: "Let's talk",
  href: "/contact",
  pixelEvent: "ClickHeaderContact" as PixelEvent,
};

export type PaletteItem = {
  id: string;
  label: string;
  group: "Go to" | "Elsewhere";
  href: string;
  external?: boolean;
  hint?: string;
  keywords?: string[];
  pixelEvent?: PixelEvent;
};

const pageHints: Record<
  string,
  { id: string; hint: string; keywords?: string[] }
> = {
  "/": { id: "home", hint: "/" },
  "/portfolio": { id: "portfolio", hint: "/portfolio", keywords: ["work"] },
  "/blog": { id: "blog", hint: "/blog", keywords: ["writing"] },
  "https://store.luisalejandro.org/": {
    id: "store",
    hint: "store.luisalejandro.org ↗",
  },
  "/contact": { id: "contact", hint: "/contact", keywords: ["hire", "email"] },
};

const socialHints: Record<string, { id: string; hint: string }> = {
  "https://github.com/LuisAlejandro": {
    id: "ext-github",
    hint: "github.com ↗",
  },
  "https://www.linkedin.com/in/martinezfaneyth": {
    id: "ext-linkedin",
    hint: "linkedin.com ↗",
  },
  "https://www.youtube.com/@LuisDevelops": {
    id: "ext-youtube",
    hint: "youtube.com ↗",
  },
  "/blog/posts/feed.xml": { id: "ext-rss", hint: "feed.xml" },
};

const homeSections: PaletteItem[] = [
  {
    id: "sec-metrics",
    label: "Metrics & Impact",
    group: "Go to",
    href: "/#metrics",
    hint: "#metrics",
    keywords: ["proof", "numbers", "stats", "experience"],
  },
  {
    id: "sec-work",
    label: "Selected Work",
    group: "Go to",
    href: "/#work",
    hint: "#work",
    keywords: ["projects", "case studies", "canaima", "dockershelf", "expedia"],
  },
  {
    id: "sec-services",
    label: "Services",
    group: "Go to",
    href: "/#services",
    hint: "#services",
    keywords: ["architecture", "backend", "ai", "consulting"],
  },
  {
    id: "sec-faq",
    label: "FAQ",
    group: "Go to",
    href: "/#faq",
    hint: "#faq",
    keywords: ["questions", "rates", "remote", "stack"],
  },
  {
    id: "sec-blog",
    label: "Latest Articles",
    group: "Go to",
    href: "/#from-the-blog",
    hint: "#from-the-blog",
    keywords: ["posts", "writing"],
  },
];

// Derived from the header and footer lists, so the palette cannot drift from
// the navigation it duplicates.
export const paletteItems: PaletteItem[] = [
  ...siteNavItems.map((item) => {
    const meta = pageHints[item.href];
    return {
      id: meta?.id ?? item.label.toLowerCase(),
      label: item.label,
      group: "Go to" as const,
      href: item.href,
      external: item.external,
      hint: meta?.hint,
      keywords: meta?.keywords,
      pixelEvent: item.pixelEvent,
    };
  }),
  ...homeSections,
  ...siteSocialLinks.map((social) => ({
    id: socialHints[social.href]?.id ?? social.label.toLowerCase(),
    label: social.label,
    group: "Elsewhere" as const,
    href: social.href,
    external: social.external,
    hint: socialHints[social.href]?.hint,
  })),
];
