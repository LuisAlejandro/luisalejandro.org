const PBS_HOST = "pbs.twimg.com";

export function isAllowedTwimgUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:" && parsed.hostname === PBS_HOST;
  } catch {
    return false;
  }
}

export function normalizePhotoUrl(url: string): string | null {
  if (!isAllowedTwimgUrl(url)) {
    return null;
  }
  try {
    const parsed = new URL(url);
    parsed.searchParams.set("name", "orig");
    return parsed.toString();
  } catch {
    return null;
  }
}
