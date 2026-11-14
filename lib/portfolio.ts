import { GalleryList } from "@constants/constants";

export type PortfolioProject = (typeof GalleryList)[number];

// Native sort is stable: projects from the same year retain editorial order.
export const portfolioProjects = [...GalleryList].sort(
  (a, b) => b.year - a.year
);

export const portfolioDescription =
  "A project archive of web products, developer tools, automation, and open-source work by Luis Alejandro. Explore the original screenshots, technologies, and project stories.";
