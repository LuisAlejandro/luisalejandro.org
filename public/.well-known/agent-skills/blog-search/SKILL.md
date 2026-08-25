---
name: blog-search
description: Read-only blog post search for luisalejandro.org via GET /api/search-posts?q=
---

# Blog Search

Search published blog posts by title, teaser, or category.

## HTTP API

```
GET https://luisalejandro.org/api/search-posts?q={query}
```

## Contract

- Empty or whitespace `q` → `{"response":[]}`
- `q` longer than 128 characters → HTTP 400 `{"error":"Query too long"}` (MCP: tool `isError` with `{"error":"Query too long"}`)
- Cosmic/upstream failure → MCP tool `isError` with `{"error":"upstream_search_unavailable","message":"Blog search is temporarily unavailable"}` (HTTP search-posts still returns `{"response":[]}`)
- Success → `{"response":[...]}` with post metadata

## MCP

The MCP tool `search_blog_posts` exposes the same read-only semantics at `https://luisalejandro.org/api/mcp`.

MCP HTTP requests are rate-limited to 120 per hour per client IP (see `agent-permissions.json`). Over limit → HTTP 429 JSON-RPC error with `Retry-After`.

Do not use this API for spam or high-frequency automated scraping beyond `agent-permissions.json` rate limits.
