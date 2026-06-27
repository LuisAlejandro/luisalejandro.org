import packageJson from "../../package.json";

import { canonicalHostnameUrl } from "@constants/constants";

const MCP_SERVER_CARD_SCHEMA =
  "https://static.modelcontextprotocol.io/schemas/mcp-server-card/v1.json";

export function buildMcpServerCard() {
  const endpoint = `${canonicalHostnameUrl}/api/mcp`;

  return {
    $schema: MCP_SERVER_CARD_SCHEMA,
    version: "1.0",
    protocolVersion: "2025-06-18",
    serverInfo: {
      name: "luisalejandro.org",
      title: "Luis Alejandro — Read-only Agent API",
      version: packageJson.version,
    },
    description:
      "Read-only discovery and blog search for luisalejandro.org. No authenticated or transactional tools.",
    documentationUrl: `${canonicalHostnameUrl}/agents.md`,
    transport: {
      type: "streamable-http",
      endpoint,
    },
    capabilities: {
      tools: {},
    },
    authentication: {
      required: false,
      schemes: [],
    },
    tools: [
      {
        name: "search_blog_posts",
        title: "Search blog posts",
        description:
          "Search published blog posts by title, teaser, or category. Read-only; max query length 128 characters.",
        inputSchema: {
          type: "object",
          properties: {
            q: {
              type: "string",
              description: "Search query",
              maxLength: 128,
            },
          },
        },
      },
      {
        name: "get_site_discovery",
        title: "Site discovery metadata",
        description:
          "Returns canonical discovery URLs for llms.txt, sitemap, feeds, API catalog, and MCP.",
        inputSchema: {
          type: "object",
          properties: {},
          additionalProperties: false,
        },
      },
    ],
  };
}
