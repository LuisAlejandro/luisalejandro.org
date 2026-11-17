import localFont from "next/font/local";

// Self-hosted so a build never reaches for fonts.googleapis.com: the two
// variable files are the latin subset of each family, which covers the site's
// English and Spanish copy. Loaded here, not in app/layout.tsx, so only pages
// that render SiteShell request them.
export const geistSans = localFont({
  src: "./fonts/Geist-latin.woff2",
  weight: "100 900",
  variable: "--font-geist-sans",
  display: "swap",
});

export const geistMono = localFont({
  src: "./fonts/GeistMono-latin.woff2",
  weight: "100 900",
  variable: "--font-geist-mono",
  display: "swap",
});
