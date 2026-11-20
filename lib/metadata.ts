import type { Metadata } from "next";

import { config } from "@constants/constants";

export type PreviewImage = {
  url: string;
  alt: string;
  width?: number;
  height?: number;
};

/** One name for the site in every preview, so a share never shows two. */
export const SITE_NAME = "Luis Alejandro Martínez Faneyth";

/** Paper and ink: the only two colours browser chrome and tiles may use. */
export const PAPER = "#f4f4f0";
export const INK = "#0e0e0d";

/**
 * The card every link preview falls back to: the vortex drawing at
 * public/images/social-card.png. 1200x630 is the size Open Graph, Twitter,
 * Slack and iMessage crop least, and all of them ignore an SVG.
 */
export const SOCIAL_CARD: PreviewImage = {
  url: `${config.url}/images/social-card.png`,
  width: 1200,
  height: 630,
  alt: "Luis Alejandro — full-stack AI engineer",
};

/**
 * One image for both preview formats, so a page cannot advertise one picture
 * to Open Graph and another to Twitter. Pass the page's own illustration where
 * it has one; otherwise the card answers.
 */
export function preview(image: PreviewImage = SOCIAL_CARD) {
  return {
    openGraph: [image],
    twitter: [{ url: image.url, alt: image.alt }],
  };
}

type PageMetaInput = {
  title: string;
  description: string;
  /** Site-relative path, e.g. "/about". */
  path: string;
  image?: PreviewImage;
  type?: "website" | "article";
  locale?: "en_US" | "es_VE";
};

/**
 * The preview tags a page owns. Next.js replaces a parent's `openGraph` and
 * `twitter` objects instead of merging them, so a page that sets either one
 * must restate the site-wide fields too; this is where they are restated.
 */
export function pageMeta({
  title,
  description,
  path,
  image = SOCIAL_CARD,
  type = "website",
  locale = "en_US",
}: PageMetaInput): Pick<
  Metadata,
  "title" | "description" | "openGraph" | "twitter"
> {
  const url = `${config.url}${path === "/" ? "" : path}`;
  const card = preview(image);
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale,
      type,
      images: card.openGraph,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: card.twitter,
      site: `@${config.blog.twitter}`,
      creator: `@${config.author.twitter}`,
    },
  };
}
