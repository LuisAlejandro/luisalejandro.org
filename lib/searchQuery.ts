export const MAX_SEARCH_QUERY_LENGTH = 128;

/**
 * Letters that should match each other when someone types without accents.
 * Spanish is the site's main language, so `analisis` must find "análisis" and
 * `docker` must find "Dócker".
 */
const ACCENT_VARIANTS: Record<string, string> = {
  a: "aàáâãäå",
  c: "cç",
  e: "eèéêë",
  i: "iìíîï",
  n: "nñ",
  o: "oòóôõö",
  u: "uùúûü",
  y: "yÿý",
  s: "sśš",
  z: "zžźż",
  g: "gğ",
  l: "lł",
  r: "rř",
};

const regexEscape = (char: string) =>
  char.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/**
 * A case-insensitive regex source where each plain letter also matches its
 * accented forms. Built here rather than at the call site so the CMS query and
 * any future index share one definition of "fuzzy about accents".
 */
export function accentInsensitivePattern(query: string): string | null {
  const trimmed = query.trim();

  if (!trimmed || trimmed.length > MAX_SEARCH_QUERY_LENGTH) {
    return null;
  }

  return Array.from(trimmed.toLowerCase())
    .map((char) => {
      // Fold the typed character too, so an accented query reaches both the
      // accented and the plain spelling of the word.
      const base = char.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      const variants = ACCENT_VARIANTS[base];
      // A space stays a space; other characters are matched literally.
      if (!variants) return regexEscape(char);
      return `[${variants}]`;
    })
    .join("");
}
