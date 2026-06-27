import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import * as z from "zod/v4";

import { searchPosts } from "@lib/api";
import { logError } from "@lib/logger";
import { getSiteDiscoveryMetadata } from "@lib/mcp/discoveryMetadata";
import { MAX_SEARCH_QUERY_LENGTH } from "@lib/searchQuery";

import packageJson from "../../package.json";

export function createMcpServer() {
  const server = new McpServer(
    {
      name: "luisalejandro.org",
      version: packageJson.version,
    },
    { capabilities: { tools: {} } }
  );

  server.registerTool(
    "search_blog_posts",
    {
      title: "Search blog posts",
      description:
        "Search published blog posts by title, teaser, or category (read-only).",
      inputSchema: {
        q: z.string().max(MAX_SEARCH_QUERY_LENGTH).describe("Search query"),
      },
    },
    async ({ q }) => {
      const query = q?.trim() ?? "";
      if (!query) {
        return {
          content: [{ type: "text", text: JSON.stringify({ response: [] }) }],
        };
      }

      if (query.length > MAX_SEARCH_QUERY_LENGTH) {
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({ error: "Query too long" }),
            },
          ],
          isError: true,
        };
      }

      try {
        const posts = await searchPosts(query, { signalUpstreamFailure: true });
        const response = posts.map((post: any) => ({
          title: post.title,
          slug: post.slug,
          metadata: {
            teaser: post.metadata?.teaser ?? "",
            categories: post.metadata?.categories ?? [],
            published_at: post.metadata?.published_at ?? null,
          },
        }));

        return {
          content: [{ type: "text", text: JSON.stringify({ response }) }],
        };
      } catch (error) {
        logError("mcp-search", error);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({
                error: "upstream_search_unavailable",
                message: "Blog search is temporarily unavailable",
              }),
            },
          ],
          isError: true,
        };
      }
    }
  );

  server.registerTool(
    "get_site_discovery",
    {
      title: "Site discovery metadata",
      description:
        "Returns canonical discovery URLs for feeds, llms.txt, API catalog, and MCP.",
      inputSchema: {},
    },
    async () => {
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(getSiteDiscoveryMetadata()),
          },
        ],
      };
    }
  );

  return server;
}
