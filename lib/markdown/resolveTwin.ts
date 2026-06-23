import { assertSafePathSegments } from "@lib/markdown/pathSafety";
import { buildBlogCategoryTwin } from "@lib/markdown/twins/blogCategory";
import { buildBlogPostTwin } from "@lib/markdown/twins/blogPost";
import { buildCaseStudyTwin } from "@lib/markdown/twins/caseStudy";
import {
  buildBlogCategoryIndexTwin,
  buildBlogIndexTwin,
  buildContactTwin,
  buildHomeTwin,
  buildPortfolioTwin,
} from "@lib/markdown/twins/marketing";

export async function resolveTwinMarkdown(
  pathSegments: string[]
): Promise<string | null> {
  if (!assertSafePathSegments(pathSegments)) {
    return null;
  }

  const [first, second, third] = pathSegments;

  if (pathSegments.length === 1 && first === "index") {
    return buildHomeTwin();
  }

  if (pathSegments.length === 1 && first === "portfolio") {
    return buildPortfolioTwin();
  }

  if (pathSegments.length === 1 && first === "contact") {
    return buildContactTwin();
  }

  if (pathSegments.length === 1 && first === "blog") {
    return buildBlogIndexTwin();
  }

  if (pathSegments.length === 2 && first === "blog" && second === "category") {
    return buildBlogCategoryIndexTwin();
  }

  if (
    pathSegments.length === 3 &&
    first === "blog" &&
    second === "category" &&
    third
  ) {
    return buildBlogCategoryTwin(third);
  }

  if (
    pathSegments.length === 3 &&
    first === "blog" &&
    second === "posts" &&
    third
  ) {
    return buildBlogPostTwin(third);
  }

  if (pathSegments.length === 2 && first === "case-studies" && second) {
    return buildCaseStudyTwin(second);
  }

  return null;
}
