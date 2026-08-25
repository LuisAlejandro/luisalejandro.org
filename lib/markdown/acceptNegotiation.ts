export type NegotiatedContentType = "text/html" | "text/markdown";

type AcceptEntry = {
  type: string;
  subtype: string;
  q: number;
};

function parseMediaRange(token: string): AcceptEntry | null {
  const [mediaRange, ...params] = token
    .trim()
    .split(";")
    .map((part) => part.trim());
  if (!mediaRange || mediaRange === "*/*") {
    return { type: "*", subtype: "*", q: 1 };
  }

  const [type, subtype] = mediaRange.split("/");
  if (!type || !subtype) {
    return null;
  }

  let q = 1;
  for (const param of params) {
    const [key, value] = param.split("=").map((part) => part.trim());
    if (key?.toLowerCase() === "q" && value) {
      const parsed = Number.parseFloat(value);
      if (!Number.isNaN(parsed)) {
        q = parsed;
      }
    }
  }

  return { type: type.toLowerCase(), subtype: lowerCaseOrStar(subtype), q };
}

function lowerCaseOrStar(value: string): string {
  return value === "*" ? "*" : value.toLowerCase();
}

export function parseAccept(header: string | null): AcceptEntry[] {
  if (!header) {
    return [];
  }

  return header
    .split(",")
    .map(parseMediaRange)
    .filter((entry): entry is AcceptEntry => entry !== null);
}

function specificity(
  entry: AcceptEntry,
  targetType: string,
  targetSubtype: string
): number {
  if (entry.type === targetType && entry.subtype === targetSubtype) {
    return 3;
  }
  if (entry.type === targetType && entry.subtype === "*") {
    return 2;
  }
  if (entry.type === "*" && entry.subtype === "*") {
    return 1;
  }
  return 0;
}

function bestPreference(
  entries: AcceptEntry[],
  targetType: string,
  targetSubtype: string
): { q: number; specificity: number; order: number } {
  let best = { q: -1, specificity: 0, order: Number.POSITIVE_INFINITY };

  for (let order = 0; order < entries.length; order++) {
    const entry = entries[order];
    if (entry.q <= 0) {
      continue;
    }

    const spec = specificity(entry, targetType, targetSubtype);
    if (spec === 0) {
      continue;
    }

    const isBetter =
      entry.q > best.q ||
      (entry.q === best.q && spec > best.specificity) ||
      (entry.q === best.q && spec === best.specificity && order < best.order);

    if (isBetter) {
      best = { q: entry.q, specificity: spec, order };
    }
  }

  return best;
}

export function preferredType(header: string | null): NegotiatedContentType {
  const entries = parseAccept(header);
  if (entries.length === 0) {
    return "text/html";
  }

  const markdown = bestPreference(entries, "text", "markdown");
  const html = bestPreference(entries, "text", "html");

  if (markdown.q < 0 && html.q < 0) {
    return "text/html";
  }

  if (markdown.q > html.q) {
    return "text/markdown";
  }

  if (html.q > markdown.q) {
    return "text/html";
  }

  if (markdown.specificity > html.specificity) {
    return "text/markdown";
  }

  if (html.specificity > markdown.specificity) {
    return "text/html";
  }

  if (markdown.order < html.order) {
    return "text/markdown";
  }

  return "text/html";
}

export function wantsMarkdown(header: string | null): boolean {
  return preferredType(header) === "text/markdown";
}
