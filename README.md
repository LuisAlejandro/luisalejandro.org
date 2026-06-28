Current version: 3.2.9

## Made with 💖 and 🍔

![Banner](https://raw.githubusercontent.com/LuisAlejandro/LuisAlejandro/master/images/author-banner.svg)

Personal website and portfolio built with Next.js, TypeScript, and Tailwind CSS. Content is sourced from Cosmic CMS; the site includes a blog, case studies, portfolio pages, and API routes for contact forms, license activation, and integrations.

> Web [luisalejandro.org](http://luisalejandro.org/) · GitHub [@LuisAlejandro](https://github.com/LuisAlejandro) · Twitter [@LuisAlejandro](https://x.com/LuisAlejandro)

## Stack

- **Framework:** Next.js 16 (App Router), React 19, TypeScript
- **Styling:** Tailwind CSS 4, Sass
- **Content:** Cosmic CMS (`@cosmicjs/sdk`)
- **Monitoring:** Sentry (`@sentry/nextjs`)
- **Package manager:** Yarn 1.x (Docker and local workflows)

## Features

- Portfolio, blog, and case-study pages with Cosmic-backed content
- Contact form with reCAPTCHA, AWS SES, Mailchimp, and Google Sheets integrations
- License activation APIs for Wholmaster and Gymcontrol apps
- Disqus comments, analytics, and on-demand revalidation API routes

## Local development

Copy environment variables and fill in secrets:

```bash
cp .env.example .env
```

Build and start the Docker development environment:

```bash
make image
make dependencies
make serve
```

The app runs at [http://localhost:3101](http://localhost:3101).

Use `make console` for a shell inside the app container.

## Commands

| Command                 | Description                                   |
| ----------------------- | --------------------------------------------- |
| `make serve`            | Start the Next.js dev server in Docker        |
| `make build_production` | Production build inside the container         |
| `make lint`             | Run ESLint (`yarn lint`)                      |
| `make format`           | Run Prettier (`yarn format`)                  |
| `make test`             | Run TypeScript type check (`yarn type-check`) |
| `make console`          | Open a shell in the app container             |
| `make dependencies`     | `yarn install` inside the app container       |

Docker lifecycle targets (`make image`, `make start`, `make stop`, `make down`, `make destroy`, `make cataplum`) are provided by Rosey maintainer managed blocks. See `make help` for release targets.

## Testing and quality

```bash
make lint
make format
make test
```

Release preflight runs these three targets via `make release-preflight` before tagging.

## CI

Pull requests to `develop` run a Docker build and production build plus a Semgrep **Code Quality** job in `.github/workflows/pr.yml`. Auto-approve and merge run in `.github/workflows/pr-auto-merge.yml` after the **Pull Request** workflow succeeds.

## Releases

Release workflows are documented in `MAINTAINER.md`. Changelog entries are written to `HISTORY.md`.
