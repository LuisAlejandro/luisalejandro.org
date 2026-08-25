import { logError } from "@lib/logger";

export const TIKTOK_BLOB_STORE = "tiktok-videos";
export const TIKTOK_VIDEO_KEY_RE = /^(?:[a-f0-9]{64}|test)\.mp4$/;

export function isTikTokVideoKey(key: string): boolean {
  return TIKTOK_VIDEO_KEY_RE.test(key);
}

function blobObjectUrl(key: string): string {
  const siteId = process.env.NETLIFY_SITE_ID || "";
  const store = process.env.NETLIFY_BLOBS_STORE || TIKTOK_BLOB_STORE;
  const encodedKey = key.split("/").map(encodeURIComponent).join("/");
  return `https://api.netlify.com/api/v1/blobs/${siteId}/${encodeURIComponent(store)}/${encodedKey}`;
}

function blobToken(): string {
  return (
    process.env.NETLIFY_BLOBS_TOKEN ||
    process.env.NETLIFY_AUTH_TOKEN ||
    process.env.NETLIFY_PURGE_TOKEN ||
    ""
  );
}

export async function getTikTokVideoBlob(
  key: string
): Promise<ArrayBuffer | null> {
  if (!isTikTokVideoKey(key)) {
    return null;
  }
  const siteId = process.env.NETLIFY_SITE_ID;
  const token = blobToken();
  if (!siteId || !token) {
    logError("tiktok-videos", new Error("missing blob credentials"));
    return null;
  }
  try {
    const response = await fetch(blobObjectUrl(key), {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
      redirect: "manual",
    });
    if (response.status === 404) {
      return null;
    }
    if (!response.ok) {
      logError("tiktok-videos", new Error(`blob GET ${response.status}`));
      return null;
    }
    return response.arrayBuffer();
  } catch (error) {
    logError("tiktok-videos", error);
    return null;
  }
}

export const NO_STORE_HEADERS = {
  "Content-Type": "video/mp4",
  "Cache-Control": "no-store",
  "CDN-Cache-Control": "no-store",
  "Netlify-CDN-Cache-Control": "no-store",
  "X-Robots-Tag": "noindex, nofollow",
};
