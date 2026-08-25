import { WebStandardStreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js";

import { canonicalHostnameUrl } from "@constants/constants";
import { logError } from "@lib/logger";
import { createMcpServer } from "@lib/mcp/createMcpServer";
import { checkMcpRateLimit } from "@lib/mcp/rateLimit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ALLOWED_ORIGINS = new Set([
  canonicalHostnameUrl,
  "http://localhost:3101",
  "http://127.0.0.1:3101",
]);

function isAllowedOrigin(origin: string | null): boolean {
  if (!origin) {
    return true;
  }

  if (ALLOWED_ORIGINS.has(origin)) {
    return true;
  }

  try {
    const url = new URL(origin);
    return (
      url.hostname === "localhost" ||
      url.hostname === "127.0.0.1" ||
      url.hostname === "luisalejandro.org" ||
      url.hostname.endsWith(".luisalejandro.org")
    );
  } catch {
    return false;
  }
}

async function jsonRpcError(
  request: Request,
  status: number,
  code: number,
  message: string,
  options?: { retryAfterSeconds?: number }
): Promise<Response> {
  let id: string | number | null = null;
  try {
    const body = await request.clone().json();
    if (body && typeof body === "object" && "id" in body) {
      id = (body as { id?: string | number | null }).id ?? null;
    }
  } catch {
    // Non-JSON or empty body — id stays null.
  }

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (options?.retryAfterSeconds !== undefined) {
    headers["Retry-After"] = String(options.retryAfterSeconds);
  }

  return new Response(
    JSON.stringify({
      jsonrpc: "2.0",
      error: { code, message },
      id,
    }),
    {
      status,
      headers,
    }
  );
}

async function handleMcp(request: Request): Promise<Response> {
  const origin = request.headers.get("origin");
  if (!isAllowedOrigin(origin)) {
    return jsonRpcError(request, 403, -32000, "Forbidden origin");
  }

  const rateLimit = checkMcpRateLimit(request);
  if (!rateLimit.allowed) {
    return jsonRpcError(request, 429, -32000, "Rate limit exceeded", {
      retryAfterSeconds: rateLimit.retryAfterSeconds,
    });
  }

  const transport = new WebStandardStreamableHTTPServerTransport({
    sessionIdGenerator: undefined,
    enableJsonResponse: true,
  });
  const server = createMcpServer();

  try {
    await server.connect(transport);
    const response = await transport.handleRequest(request);
    response.headers.set("Cache-Control", "no-store");
    return response;
  } catch (error) {
    logError("mcp-transport", error);
    return new Response(
      JSON.stringify({
        jsonrpc: "2.0",
        error: { code: -32603, message: "Internal server error" },
        id: null,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  } finally {
    await transport.close();
    await server.close();
  }
}

export { handleMcp as DELETE, handleMcp as GET, handleMcp as POST };
