export type NavItem = {
  num: string;
  label: string;
  href: string;
  external?: boolean;
  pixelEvent?: "ClickHeaderStore" | "ClickHeaderContact";
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
  {
    label: "GitHub",
    href: "https://github.com/LuisAlejandro",
    external: true,
  },
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
  {
    label: "RSS",
    href: "/blog/posts/feed.xml",
    external: false,
  },
];

export type PaletteItem = {
  id: string;
  label: string;
  group: "Go to" | "Elsewhere";
  href: string;
  external?: boolean;
  hint?: string;
  keywords?: string[];
  pixelEvent?: "ClickHeaderStore" | "ClickHeaderContact";
};

export const paletteItems: PaletteItem[] = [
  // Pages
  { id: "home", label: "Home", group: "Go to", href: "/", hint: "/" },
  {
    id: "portfolio",
    label: "Portfolio",
    group: "Go to",
    href: "/portfolio",
    hint: "/portfolio",
  },
  { id: "blog", label: "Blog", group: "Go to", href: "/blog", hint: "/blog" },
  {
    id: "store",
    label: "Store",
    group: "Go to",
    href: "https://store.luisalejandro.org/",
    external: true,
    hint: "store.luisalejandro.org ↗",
    pixelEvent: "ClickHeaderStore",
  },
  {
    id: "contact",
    label: "Contact",
    group: "Go to",
    href: "/contact",
    hint: "/contact",
    pixelEvent: "ClickHeaderContact",
  },
  // Home Sections
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
  // Elsewhere
  {
    id: "ext-github",
    label: "GitHub",
    group: "Elsewhere",
    href: "https://github.com/LuisAlejandro",
    external: true,
    hint: "github.com ↗",
  },
  {
    id: "ext-linkedin",
    label: "LinkedIn",
    group: "Elsewhere",
    href: "https://www.linkedin.com/in/martinezfaneyth",
    external: true,
    hint: "linkedin.com ↗",
  },
  {
    id: "ext-youtube",
    label: "YouTube",
    group: "Elsewhere",
    href: "https://www.youtube.com/@LuisDevelops",
    external: true,
    hint: "youtube.com ↗",
  },
  {
    id: "ext-rss",
    label: "RSS Feed",
    group: "Elsewhere",
    href: "/blog/posts/feed.xml",
    hint: "feed.xml",
  },
];
