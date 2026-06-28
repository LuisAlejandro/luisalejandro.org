import { assertSafePathSegments } from "@lib/markdown/pathSafety";

export function htmlPathToTwinSegments(pathname: string): string[] | null {
  let normalized = pathname;
  if (normalized.length > 1 && normalized.endsWith("/")) {
    normalized = normalized.slice(0, -1);
  }

  if (normalized === "" || normalized === "/") {
    return [];
  }

  const segments = normalized.slice(1).split("/").filter(Boolean);
  if (!assertSafePathSegments(segments)) {
    return null;
  }

  const [first, second, third] = segments;

  if (segments.length === 1 && first === "portfolio") {
    return ["portfolio"];
  }

  if (segments.length === 1 && first === "contact") {
    return ["contact"];
  }

  if (segments.length === 1 && first === "blog") {
    return ["blog"];
  }

  if (segments.length === 2 && first === "blog" && second === "category") {
    return ["blog", "category"];
  }

  if (
    segments.length === 3 &&
    first === "blog" &&
    second === "category" &&
    third
  ) {
    return ["blog", "category", third];
  }

  if (
    segments.length === 3 &&
    first === "blog" &&
    second === "posts" &&
    third
  ) {
    return ["blog", "posts", third];
  }

  if (segments.length === 2 && first === "case-studies" && second) {
    return ["case-studies", second];
  }

  return null;
}

export function twinRewritePath(segments: string[]): string {
  if (segments.length === 0) {
    return "/markdown-twin";
  }

  return `/markdown-twin/${segments.join("/")}`;
}
