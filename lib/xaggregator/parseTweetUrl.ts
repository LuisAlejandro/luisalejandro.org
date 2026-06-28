const TWEET_ID_PATTERN = /^\d{1,19}$/;

const STATUS_PATH =
  /(?:https?:\/\/)?(?:www\.)?(?:twitter\.com|x\.com)\/[^/]+\/status\/(\d{1,19})/i;

export function parseTweetUrl(
  input: string
): { id: string; canonicalLink: string } | null {
  const trimmed = input.trim();
  if (!trimmed) {
    return null;
  }

  let url: URL;
  try {
    url = new URL(trimmed.startsWith("http") ? trimmed : `https://${trimmed}`);
  } catch {
    const match = trimmed.match(STATUS_PATH);
    if (!match?.[1] || !TWEET_ID_PATTERN.test(match[1])) {
      return null;
    }
    const id = match[1];
    return {
      id,
      canonicalLink: `https://x.com/i/status/${id}`,
    };
  }

  const pathMatch = url.pathname.match(/\/status\/(\d{1,19})/);
  if (!pathMatch?.[1] || !TWEET_ID_PATTERN.test(pathMatch[1])) {
    return null;
  }

  const id = pathMatch[1];
  return {
    id,
    canonicalLink: `https://x.com/i/status/${id}`,
  };
}
