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
