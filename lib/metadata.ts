import { config } from "@constants/constants";

export type PreviewImage = {
  url: string;
  alt: string;
  width?: number;
  height?: number;
};

/**
 * The card every link preview falls back to: the ink-and-paper drawing at
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
  return { openGraph: [image], twitter: [image.url] };
}
