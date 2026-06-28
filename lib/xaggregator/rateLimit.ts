import { getClientIp } from "@lib/mcp/rateLimit";
import { checkSlidingWindowRateLimit } from "@lib/rateLimit/slidingWindow";

export const XAGGREGATOR_RATE_LIMIT = {
  maxRequests: 60,
  windowSeconds: 3600,
} as const;

export function checkXaggregatorRateLimit(request: Request) {
  const key = `xaggregator:${getClientIp(request)}`;
  return checkSlidingWindowRateLimit(
    key,
    XAGGREGATOR_RATE_LIMIT.maxRequests,
    XAGGREGATOR_RATE_LIMIT.windowSeconds * 1000
  );
}
