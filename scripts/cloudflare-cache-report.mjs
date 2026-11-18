#!/usr/bin/env node
// Cloudflare cache/error report for this zone, via the GraphQL Analytics API.
//
//   node --env-file=.env scripts/cloudflare-cache-report.mjs [days]
//
// Needs ANALYTICS_CLOUDFLARE_API_TOKEN (falls back to CLOUDFLARE_API_TOKEN)
// and CLOUDFLARE_ZONE_ID. Read-only: no writes, no purge.

const API = "https://api.cloudflare.com/client/v4/graphql";
const token =
  process.env.ANALYTICS_CLOUDFLARE_API_TOKEN ??
  process.env.CLOUDFLARE_API_TOKEN;
const zone = process.env.CLOUDFLARE_ZONE_ID;

if (!token || !zone) {
  console.error(
    "Missing ANALYTICS_CLOUDFLARE_API_TOKEN (or CLOUDFLARE_API_TOKEN) / CLOUDFLARE_ZONE_ID"
  );
  process.exit(1);
}

const days = Number(process.argv[2] ?? 7);
const now = new Date();
const since = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
const iso = (d) => d.toISOString().replace(/\.\d+Z$/, "Z");

// Adaptive datasets reject windows older than ~4w3d; neither call asks beyond that.
const window = `datetime_geq:"${iso(since)}",datetime_leq:"${iso(now)}"`;

async function query(selection, filter, limit = 40) {
  const body = {
    query: `query($z:String!){viewer{zones(filter:{zoneTag:$z}){httpRequestsAdaptiveGroups(limit:${limit},filter:{${filter}},orderBy:[count_DESC])${selection}}}}`,
    variables: { z: zone },
  };
  const res = await fetch(API, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const json = await res.json();
  if (json.errors?.length) {
    throw new Error(JSON.stringify(json.errors[0].message ?? json.errors[0]));
  }
  return json.data.viewer.zones[0].httpRequestsAdaptiveGroups ?? [];
}

const sum = (rows) => rows.reduce((acc, r) => acc + r.count, 0);
const pct = (n, d) => `${((100 * n) / (d || 1)).toFixed(1)}%`;

console.log(`Cloudflare report — zone ${zone}, last ${days}d\n`);

const cache = await query("{count dimensions{cacheStatus}}", window);
const cacheTotal = sum(cache);
console.log("cache status");
for (const r of cache) {
  const status = r.dimensions.cacheStatus ?? "(none)";
  console.log(
    `  ${status.padEnd(12)}${String(r.count).padStart(8)}${pct(r.count, cacheTotal).padStart(8)}`
  );
}

const okOnly = await query(
  "{count dimensions{cacheStatus}}",
  `${window},edgeResponseStatus:200`
);
const okTotal = sum(okOnly);
const okHit =
  okOnly.find((r) => r.dimensions.cacheStatus === "hit")?.count ?? 0;
console.log(
  `\nhit rate: ${pct(cache.find((r) => r.dimensions.cacheStatus === "hit")?.count ?? 0, cacheTotal)} of all requests, ${pct(okHit, okTotal)} of 200s`
);

const status = await query(
  "{count dimensions{edgeResponseStatus}}",
  window,
  25
);
const statusTotal = sum(status);
console.log("\nresponse status");
for (const r of status) {
  console.log(
    `  ${String(r.dimensions.edgeResponseStatus).padEnd(6)}${String(r.count).padStart(8)}${pct(r.count, statusTotal).padStart(8)}`
  );
}

for (const [code, label] of [
  [404, "top 404 paths"],
  [403, "top 403 paths"],
]) {
  const rows = await query(
    "{count dimensions{clientRequestPath}}",
    `${window},edgeResponseStatus:${code}`,
    10
  );
  if (!rows.length) continue;
  const total = sum(rows);
  console.log(`\n${label} (top 10 of ${total} sampled)`);
  for (const r of rows) {
    console.log(
      `  ${r.count.toString().padStart(6)}  ${r.dimensions.clientRequestPath}`
    );
  }
}
