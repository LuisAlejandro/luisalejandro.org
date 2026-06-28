import { getSyndicationToken } from "@lib/xaggregator/getSyndicationToken";
import { normalizePhotoUrl } from "@lib/xaggregator/normalizePhotoUrl";
import type { FetchTweetResult } from "@lib/xaggregator/types";

const SYNDICATION_URL = "https://cdn.syndication.twimg.com/tweet-result";
const FETCH_TIMEOUT_MS = 60_000;

type SyndicationPhoto = { url?: string };
type SyndicationTweet = {
  __typename?: string;
  text?: string;
  photos?: SyndicationPhoto[];
  mediaDetails?: { media_url_https?: string }[];
};

function extractPhotoUrls(tweet: SyndicationTweet): string[] {
  const urls: string[] = [];

  for (const photo of tweet.photos ?? []) {
    if (photo?.url) {
      const normalized = normalizePhotoUrl(photo.url);
      if (normalized) {
        urls.push(normalized);
      }
    }
  }

  if (urls.length === 0) {
    for (const media of tweet.mediaDetails ?? []) {
      if (media?.media_url_https) {
        const normalized = normalizePhotoUrl(media.media_url_https);
        if (normalized) {
          urls.push(normalized);
        }
      }
    }
  }

  return urls.slice(0, 4);
}

export async function fetchTweet(
  id: string,
  canonicalLink: string
): Promise<FetchTweetResult> {
  const url = new URL(SYNDICATION_URL);
  url.searchParams.set("id", id);
  url.searchParams.set("lang", "en");
  url.searchParams.set("token", getSyndicationToken(id));

  let response: Response;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    response = await fetch(url.toString(), {
      headers: { Accept: "application/json" },
      next: { revalidate: 0 },
      signal: controller.signal,
    });
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      return {
        ok: false,
        error: "upstream",
        message: "Tiempo de espera agotado",
      };
    }
    return {
      ok: false,
      error: "upstream",
      message: "No se pudo contactar el servicio de sindicación",
    };
  } finally {
    clearTimeout(timeout);
  }

  if (!response.ok) {
    const contentType = response.headers.get("content-type") ?? "";
    if (!contentType.includes("application/json")) {
      return {
        ok: false,
        error: "upstream",
        message: "Error del servicio de sindicación",
      };
    }
  }

  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return {
      ok: false,
      error: response.ok ? "upstream" : "notFound",
      message: response.ok
        ? "Error del servicio de sindicación"
        : "Tweet no encontrado",
    };
  }

  let data: SyndicationTweet;
  try {
    data = await response.json();
  } catch {
    return {
      ok: false,
      error: "upstream",
      message: "Respuesta del servicio no válida",
    };
  }

  if (data?.__typename === "TweetTombstone") {
    return { ok: false, error: "tombstone", message: "Tweet no disponible" };
  }

  if (!response.ok || !data || Object.keys(data).length === 0) {
    return { ok: false, error: "notFound", message: "Tweet no encontrado" };
  }

  const text = typeof data.text === "string" ? data.text : "";
  const images = extractPhotoUrls(data);

  return {
    ok: true,
    data: {
      link: canonicalLink,
      text,
      images,
    },
  };
}
