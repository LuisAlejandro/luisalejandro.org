import { createHash } from "crypto";
import { readFileSync } from "fs";
import path from "path";

export const AGENT_SKILLS_INDEX_SCHEMA =
  "https://github.com/cloudflare/agent-skills-discovery-rfc/raw/v0.2.0/schemas/index.schema.json";

type SkillDefinition = {
  name: string;
  description: string;
  relativePath: string;
  urlPath: string;
};

const SKILL_DEFINITIONS: SkillDefinition[] = [
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

function skillSha256(relativePath: string): string {
  const filePath = path.join(process.cwd(), relativePath);
  const content = readFileSync(filePath);
  return createHash("sha256").update(content).digest("hex");
}

export async function buildAgentSkillsIndex(baseUrl: string) {
  const skills = SKILL_DEFINITIONS.map((definition) => ({
    name: definition.name,
    type: "skill-md" as const,
    description: definition.description,
    url: `${baseUrl}${definition.urlPath}`,
    sha256: skillSha256(definition.relativePath),
  }));

  return {
    $schema: AGENT_SKILLS_INDEX_SCHEMA,
    skills,
  };
}
