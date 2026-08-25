export type CloudflarePurgeByTagsResult = {
  ok: boolean;
  reason?: "missing_env" | "rate_limited" | "upstream_error";
  status?: number;
};

export async function purgeByTags(
  tags: readonly string[]
): Promise<CloudflarePurgeByTagsResult> {
  const token = process.env.CLOUDFLARE_API_TOKEN;
  const zoneId = process.env.CLOUDFLARE_ZONE_ID;

  if (!token || !zoneId) {
    return { ok: false, reason: "missing_env" };
  }

  try {
    const response = await fetch(
      `https://api.cloudflare.com/client/v4/zones/${zoneId}/purge_cache`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tags: [...tags] }),
      }
    );

    if (response.status === 429) {
      return { ok: false, reason: "rate_limited", status: 429 };
    }

    if (!response.ok) {
      return { ok: false, reason: "upstream_error", status: response.status };
    }

    const body = (await response.json()) as { success?: boolean };

    if (!body.success) {
      return { ok: false, reason: "upstream_error", status: response.status };
    }

    return { ok: true };
  } catch {
    return { ok: false, reason: "upstream_error" };
  }
}
