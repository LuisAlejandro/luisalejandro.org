const UNSAFE_SEGMENT = /^(?:\.|%2e)$/i;

export function isSafePathSegment(segment: string): boolean {
  if (!segment || segment === ".." || UNSAFE_SEGMENT.test(segment)) {
    return false;
  }
  if (segment.includes("\\") || segment.includes("\0")) {
    return false;
  }
  try {
    const decoded = decodeURIComponent(segment);
    if (
      decoded === ".." ||
      decoded.includes("/") ||
      decoded.includes("\\") ||
      decoded.includes("\0")
    ) {
      return false;
    }
  } catch {
    return false;
  }
  return true;
}

export function assertSafePathSegments(segments: string[]): boolean {
  return segments.length > 0 && segments.every(isSafePathSegment);
}
