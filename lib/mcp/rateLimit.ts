import { checkSlidingWindowRateLimit } from "@lib/rateLimit/slidingWindow";

/** Matches agent-permissions.json read_content rate_limit. */
export const MCP_RATE_LIMIT = {
  maxRequests: 120,
  windowSeconds: 3600,
} as const;

export function getClientIp(request: Request): string {
  const netlifyIp = request.headers.get("x-nf-client-connection-ip");
  if (netlifyIp) {
    return netlifyIp.trim();
  }

  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) {
      return first;
    }
  }

  const realIp = request.headers.get("x-real-ip");
  if (realIp) {
    return realIp.trim();
  }

  return "unknown";
}

export function checkMcpRateLimit(request: Request) {
  const key = `mcp:${getClientIp(request)}`;
  return checkSlidingWindowRateLimit(
    key,
    MCP_RATE_LIMIT.maxRequests,
    MCP_RATE_LIMIT.windowSeconds * 1000
  );
}
