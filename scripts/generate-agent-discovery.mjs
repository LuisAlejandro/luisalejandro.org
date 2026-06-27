import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const CANONICAL_URL =
  process.env.CANONICAL_SITE_URL || "https://luisalejandro.org";

const AGENT_SKILLS_INDEX_SCHEMA =
  "https://github.com/cloudflare/agent-skills-discovery-rfc/raw/v0.2.0/schemas/index.schema.json";

const MCP_SERVER_CARD_SCHEMA =
  "https://static.modelcontextprotocol.io/schemas/mcp-server-card/v1.json";

const SKILL_DEFINITIONS = [
  {
    name: "site-discovery",
    description:
      "Discover canonical luisalejandro.org surfaces — llms.txt, sitemap, feeds, API catalog, Agent Skills, and MCP.",
    relativePath: "public/.well-known/agent-skills/site-discovery/SKILL.md",
    urlPath: "/.well-known/agent-skills/site-discovery/SKILL.md",
  },
  {
    name: "blog-search",
    description:
      "Read-only blog post search via GET /api/search-posts?q= (128 character query cap).",
    relativePath: "public/.well-known/agent-skills/blog-search/SKILL.md",
    urlPath: "/.well-known/agent-skills/blog-search/SKILL.md",
  },
  {
    name: "citation",
    description:
      "Citation and attribution rules for luisalejandro.org content in AI answers.",
    relativePath: "public/.well-known/agent-skills/citation/SKILL.md",
    urlPath: "/.well-known/agent-skills/citation/SKILL.md",
  },
];

async function skillSha256(relativePath) {
  const content = await readFile(path.join(ROOT, relativePath));
  return createHash("sha256").update(content).digest("hex");
}

async function buildAgentSkillsIndex() {
  const skills = await Promise.all(
    SKILL_DEFINITIONS.map(async (definition) => ({
      name: definition.name,
      type: "skill-md",
      description: definition.description,
      url: `${CANONICAL_URL}${definition.urlPath}`,
      sha256: await skillSha256(definition.relativePath),
    }))
  );

  return {
    $schema: AGENT_SKILLS_INDEX_SCHEMA,
    skills,
  };
}

function buildMcpServerCard(version) {
  const endpoint = `${CANONICAL_URL}/api/mcp`;

  return {
    $schema: MCP_SERVER_CARD_SCHEMA,
    version: "1.0",
    protocolVersion: "2025-06-18",
    serverInfo: {
      name: "luisalejandro.org",
      title: "Luis Alejandro — Read-only Agent API",
      version,
    },
    description:
      "Read-only discovery and blog search for luisalejandro.org. No authenticated or transactional tools.",
    documentationUrl: `${CANONICAL_URL}/agents.md`,
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
        name: "get_latest_posts",
        title: "Get latest blog posts",
        description:
          "Returns the most recent published blog posts (read-only).",
        inputSchema: {
          type: "object",
          properties: {
            limit: {
              type: "number",
              description: "Number of posts to return (default: 5, max: 20)",
              minimum: 1,
              maximum: 20,
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

async function writeJson(filePath, value) {
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, `${JSON.stringify(value, null, 2)}\n`);
}

async function main() {
  const packageJson = JSON.parse(
    await readFile(path.join(ROOT, "package.json"), "utf8")
  );

  const skillsIndex = await buildAgentSkillsIndex();
  const skillsIndexPath = path.join(
    ROOT,
    "public",
    ".well-known",
    "agent-skills",
    "index.json"
  );
  await writeJson(skillsIndexPath, skillsIndex);

  const serverCard = buildMcpServerCard(packageJson.version);
  const serverCardPath = path.join(
    ROOT,
    "public",
    ".well-known",
    "mcp",
    "server-card.json"
  );
  await writeJson(serverCardPath, serverCard);

  console.log(
    `generate-agent-discovery: wrote ${path.relative(ROOT, skillsIndexPath)} and ${path.relative(ROOT, serverCardPath)}`
  );
}

main().catch((error) => {
  console.error("generate-agent-discovery: failed", error);
  process.exit(1);
});
