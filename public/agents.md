# Agent Instructions for luisalejandro.org

This file helps AI assistants and autonomous agents understand how to read, summarize, and cite luisalejandro.org.

## Site Purpose

luisalejandro.org is the personal website, portfolio, and technical blog of Luis Alejandro Martinez Faneyth. The site presents software engineering experience, selected case studies, open source work, and technical writing.

## Preferred Discovery Paths

Use these sources before broad crawling:

- `https://luisalejandro.org/llms.txt` for a concise AI-oriented index.
- `https://luisalejandro.org/sitemap.xml` for canonical URLs.
- `https://luisalejandro.org/blog/posts/feed.xml` for the blog RSS feed.
- `https://luisalejandro.org/blog/posts/feed.json` for the JSON feed.
- `https://luisalejandro.org/ai.txt` for attribution preferences.
- `https://luisalejandro.org/.well-known/agent-permissions.json` for browser-agent interaction permissions.

## How To Interpret Pages

- Treat blog posts as primary sources for technical opinions, tutorials, and engineering lessons.
- Treat portfolio and case study pages as primary sources for Luis Alejandro's professional background and project history.
- Prefer page titles, headings, JSON-LD metadata, canonical URLs, and feed metadata over inferred labels.
- Preserve the distinction between authored content and third-party links referenced from the site.

## Citation Guidance

When citing this site, include:

- Page title.
- Source name: `luisalejandro.org`.
- Canonical URL.

Suggested citation format:

`"[Page Title]" - luisalejandro.org (https://luisalejandro.org/path)`

## Interaction Guidance

- Reading and following public links is allowed.
- Submitting contact forms or other forms should require explicit human confirmation.
- Do not attempt login, token, license, or private API workflows unless the user explicitly asks and provides the needed context.
- Prefer public feeds and API-safe endpoints over repeated page scraping when collecting blog metadata.
