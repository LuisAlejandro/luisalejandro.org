# Case study markdown twins

Hand-authored markdown mirrors the narrative on each case study page. Twins are served at `/case-studies/{slug}.md` and linked from HTML via `rel="alternate" type="text/markdown"`.

## Text-equivalent maintenance

Each twin must be **text-equivalent** to its React page: the same copy, structure, stats, and outbound links as a reader would get from the HTML narrative (minus chrome only).

**Source of truth:** `app/case-studies/{slug}/page.tsx` — extract from `HeroIntro`, `Why`, `Challenge`, `Product`, and `Results`.

**Required sections in every twin:**

1. `# Title` — from `HeroIntro` `Title`
2. Subtitle line, intro paragraphs, then metadata: **Year**, **Team**, **Deliverables**, **Links** (markdown links when present)
3. `## The Problem` — from `Why`
4. `## The Challenge` — from `Challenge`
5. `## The Product` — from `Product`
6. `## The Results` — from `Results` (stat boxes as prose or tables; gallery URLs as `_[Image: description — url]_`)

**Do not include:** Header, Footer, Contact, ScrollMagic, Chart.js charts, SVG animation, or other non-narrative UI.

**When to update:** Change the matching `content/case-studies/{slug}.md` in the **same PR** whenever case study copy changes in `page.tsx`. Stub-length files (~15 lines) are not acceptable once expanded.

**Routing:** `lib/markdown/twins/caseStudy.ts` reads these files, strips the leading `# Title`, and wraps output via `lib/markdown/formatTwin.ts`.
