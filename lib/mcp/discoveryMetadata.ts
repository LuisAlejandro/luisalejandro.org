import { canonicalHostnameUrl } from "@constants/constants";

export function getSiteDiscoveryMetadata() {
  return {
    llms_txt: `${canonicalHostnameUrl}/llms.txt`,
    llms_full_txt: `${canonicalHostnameUrl}/llms-full.txt`,
    agents_md: `${canonicalHostnameUrl}/agents.md`,
    ai_txt: `${canonicalHostnameUrl}/ai.txt`,
    sitemap: `${canonicalHostnameUrl}/sitemap.xml`,
    api_catalog: `${canonicalHostnameUrl}/.well-known/api-catalog`,
    agent_skills: `${canonicalHostnameUrl}/.well-known/agent-skills/index.json`,
    mcp_server_card: `${canonicalHostnameUrl}/.well-known/mcp/server-card.json`,
    feeds: {
      rss: `${canonicalHostnameUrl}/blog/posts/feed.xml`,
      atom: `${canonicalHostnameUrl}/blog/posts/atom.xml`,
      json: `${canonicalHostnameUrl}/blog/posts/feed.json`,
    },
    blog_search: `${canonicalHostnameUrl}/api/search-posts?q={query}`,
    mcp_endpoint: `${canonicalHostnameUrl}/api/mcp`,
  };
}
