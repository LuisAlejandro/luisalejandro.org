#!/usr/bin/env bash
set -euo pipefail

BASE_URL="${BASE_URL:-http://localhost:3101}"

fail() {
  echo "FAIL: $1" >&2
  exit 1
}

pass() {
  echo "PASS: $1"
}

echo "Agent readiness smoke against ${BASE_URL}"

# AE1: homepage markdown negotiation
markdown_type=$(curl -sI -H "Accept: text/markdown" "${BASE_URL}/" | tr -d '\r' | awk -F': ' 'tolower($1)=="content-type" {print tolower($2); exit}')
[[ "${markdown_type}" == *"text/markdown"* ]] || fail "homepage Accept markdown Content-Type (${markdown_type:-missing})"
pass "homepage markdown negotiation"

# AE2: browser HTML unchanged
html_type=$(curl -sI "${BASE_URL}/" | tr -d '\r' | awk -F': ' 'tolower($1)=="content-type" {print tolower($2); exit}')
[[ "${html_type}" == *"text/html"* ]] || fail "homepage default HTML Content-Type (${html_type:-missing})"
pass "homepage HTML default"

vary_accept=$(curl -sI "${BASE_URL}/" | tr -d '\r' | awk -F': ' 'tolower($1)=="vary" {print tolower($2); exit}')
[[ "${vary_accept}" == *"accept"* ]] || fail "homepage Vary Accept (${vary_accept:-missing})"
pass "homepage Vary Accept"

# Accept q-value preference (markdown wins when q higher)
q_markdown_type=$(curl -sI -H "Accept: text/html;q=0.9, text/markdown;q=1" "${BASE_URL}/" | tr -d '\r' | awk -F': ' 'tolower($1)=="content-type" {print tolower($2); exit}')
[[ "${q_markdown_type}" == *"text/markdown"* ]] || fail "Accept q-value markdown preference (${q_markdown_type:-missing})"
pass "Accept q-value markdown preference"

tie_markdown_type=$(curl -sI -H "Accept: text/markdown, text/html" "${BASE_URL}/" | tr -d '\r' | awk -F': ' 'tolower($1)=="content-type" {print tolower($2); exit}')
[[ "${tie_markdown_type}" == *"text/markdown"* ]] || fail "Accept equal-q tie prefers first listed type (${tie_markdown_type:-missing})"
pass "Accept equal-q tie-break"

q_zero_type=$(curl -sI -H "Accept: text/markdown;q=0" "${BASE_URL}/" | tr -d '\r' | awk -F': ' 'tolower($1)=="content-type" {print tolower($2); exit}')
[[ "${q_zero_type}" == *"text/html"* ]] || fail "Accept q=0 rejects markdown (${q_zero_type:-missing})"
pass "Accept q=0 rejects markdown"

# Secondary negotiated surface
portfolio_type=$(curl -sI -H "Accept: text/markdown" "${BASE_URL}/portfolio" | tr -d '\r' | awk -F': ' 'tolower($1)=="content-type" {print tolower($2); exit}')
[[ "${portfolio_type}" == *"text/markdown"* ]] || fail "portfolio markdown negotiation (${portfolio_type:-missing})"
pass "portfolio markdown negotiation"

# Unsupported path must not fake markdown
unknown_type=$(curl -sI -H "Accept: text/markdown" "${BASE_URL}/this-page-does-not-exist" | tr -d '\r' | awk -F': ' 'tolower($1)=="content-type" {print tolower($2); exit}')
[[ "${unknown_type}" != *"text/markdown"* ]] || fail "unsupported path returned markdown (${unknown_type})"
pass "unsupported path no false markdown"

invalid_blog_status=$(curl -sI -H "Accept: text/markdown" "${BASE_URL}/blog/category/foo/bar" | tr -d '\r' | awk 'tolower($1) ~ /^http/ {print $2; exit}')
invalid_blog_type=$(curl -sI -H "Accept: text/markdown" "${BASE_URL}/blog/category/foo/bar" | tr -d '\r' | awk -F': ' 'tolower($1)=="content-type" {print tolower($2); exit}')
[[ "${invalid_blog_status}" == "404" ]] || fail "invalid blog path status (${invalid_blog_status:-missing})"
[[ "${invalid_blog_type}" == *"text/markdown"* ]] || fail "invalid blog path markdown 404 type (${invalid_blog_type:-missing})"
pass "invalid twin path markdown 404"

# AE4: API catalog
catalog_json=$(curl -s "${BASE_URL}/.well-known/api-catalog")
echo "${catalog_json}" | grep -q "search-posts" || fail "api-catalog missing search-posts"
echo "${catalog_json}" | grep -q "feed.xml" || fail "api-catalog missing RSS"
echo "${catalog_json}" | grep -q "atom.xml" || fail "api-catalog missing Atom"
echo "${catalog_json}" | grep -q "feed.json" || fail "api-catalog missing JSON feed"
echo "${catalog_json}" | grep -q "/api/mcp" || fail "api-catalog missing MCP transport"
pass "api-catalog completeness"

# AE3: Agent skills index
skills_json=$(curl -s "${BASE_URL}/.well-known/agent-skills/index.json")
echo "${skills_json}" | grep -q '"site-discovery"' || fail "agent-skills missing site-discovery"
echo "${skills_json}" | grep -q '"blog-search"' || fail "agent-skills missing blog-search"
echo "${skills_json}" | grep -q '"citation"' || fail "agent-skills missing citation"
echo "${skills_json}" | grep -q '"sha256"' || fail "agent-skills missing sha256"
pass "agent-skills index"

# AE5: MCP server card
card_json=$(curl -s "${BASE_URL}/.well-known/mcp/server-card.json")
echo "${card_json}" | grep -q '"serverInfo"' || fail "mcp card missing serverInfo"
echo "${card_json}" | grep -q '"endpoint"' || fail "mcp card missing endpoint"
echo "${card_json}" | grep -q 'search_blog_posts' || fail "mcp card missing search_blog_posts tool"
pass "mcp server card"

# MCP initialize + tools/list
mcp_headers=(-H "Content-Type: application/json" -H "Accept: application/json, text/event-stream")
init_response=$(curl -s -X POST "${BASE_URL}/api/mcp" "${mcp_headers[@]}" -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-06-18","capabilities":{},"clientInfo":{"name":"smoke","version":"1.0.0"}}}')
echo "${init_response}" | grep -q '"result"' || fail "mcp initialize (${init_response})"
pass "mcp initialize"

tools_response=$(curl -s -X POST "${BASE_URL}/api/mcp" "${mcp_headers[@]}" -d '{"jsonrpc":"2.0","id":2,"method":"tools/list","params":{}}')
echo "${tools_response}" | grep -q 'search_blog_posts' || fail "mcp tools/list missing search_blog_posts (${tools_response})"
echo "${tools_response}" | grep -q 'get_site_discovery' || fail "mcp tools/list missing get_site_discovery (${tools_response})"
pass "mcp tools/list"

discovery_call=$(curl -s -X POST "${BASE_URL}/api/mcp" "${mcp_headers[@]}" -d '{"jsonrpc":"2.0","id":3,"method":"tools/call","params":{"name":"get_site_discovery","arguments":{}}}')
echo "${discovery_call}" | grep -q '"result"' || fail "mcp get_site_discovery (${discovery_call})"
echo "${discovery_call}" | grep -q 'llms.txt' || fail "mcp get_site_discovery missing llms.txt (${discovery_call})"
pass "mcp get_site_discovery"

search_call=$(curl -s -X POST "${BASE_URL}/api/mcp" "${mcp_headers[@]}" -d '{"jsonrpc":"2.0","id":4,"method":"tools/call","params":{"name":"search_blog_posts","arguments":{"q":"docker"}}}')
echo "${search_call}" | grep -q '"result"' || fail "mcp search_blog_posts (${search_call})"
if echo "${search_call}" | grep -q 'upstream_search_unavailable'; then
  echo "${search_call}" | grep -q '"isError":true' || fail "mcp search_blog_posts upstream error missing isError (${search_call})"
  pass "mcp search_blog_posts upstream error signaling"
elif echo "${search_call}" | grep -q 'response'; then
  pass "mcp search_blog_posts"
else
  fail "mcp search_blog_posts unexpected payload (${search_call})"
fi

echo "All agent-readiness smoke checks passed."
