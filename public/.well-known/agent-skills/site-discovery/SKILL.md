---
name: site-discovery
description: Discover canonical luisalejandro.org surfaces for AI agents — llms.txt, sitemap, feeds, API catalog, Agent Skills, and MCP.
---

# Site Discovery

Use these read-only discovery endpoints before broad crawling:

- `https://luisalejandro.org/llms.txt` — curated site index for agents
- `https://luisalejandro.org/llms-full.txt` — single-request markdown corpus snapshot
- `https://luisalejandro.org/agents.md` — agent instructions and API contracts
- `https://luisalejandro.org/ai.txt` — AI attribution policy
- `https://luisalejandro.org/.well-known/agent-permissions.json` — interaction policy
- `https://luisalejandro.org/sitemap.xml` — canonical URLs
- `https://luisalejandro.org/.well-known/api-catalog` — RFC 9727 machine API catalog
- `https://luisalejandro.org/.well-known/agent-skills/index.json` — Agent Skills index
- `https://luisalejandro.org/.well-known/mcp/server-card.json` — MCP server card
- `https://luisalejandro.org/api/mcp` — read-only MCP transport
- `https://luisalejandro.org/blog/posts/feed.xml` — RSS
- `https://luisalejandro.org/blog/posts/atom.xml` — Atom
- `https://luisalejandro.org/blog/posts/feed.json` — JSON Feed

Canonical page URLs also support `Accept: text/markdown` content negotiation (same twins as `*.md` alternates).

Prefer feeds, `llms.txt`, and MCP `get_site_discovery` over repeated HTML scraping.
