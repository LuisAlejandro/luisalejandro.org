Current version: 3.1.17

## Made with 💖 and 🍔

![Banner](https://raw.githubusercontent.com/LuisAlejandro/LuisAlejandro/master/images/author-banner.svg)

Personal website and portfolio built with Next.js, TypeScript, and Tailwind CSS. Content is sourced from Cosmic CMS; the site includes a blog, case studies, portfolio pages, and API routes for contact forms, license activation, and integrations.

> Web [luisalejandro.org](http://luisalejandro.org/) · GitHub [@LuisAlejandro](https://github.com/LuisAlejandro) · Twitter [@LuisAlejandro](https://x.com/LuisAlejandro)

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

The app runs at [http://localhost:3000](http://localhost:3000).

## Common commands

| Command | Description |
|---------|-------------|
| `make serve` | Start the Next.js dev server in Docker |
| `make build_production` | Production build inside the container |
| `make lint` | Run ESLint |
| `make test` | Run TypeScript type check |
| `make console` | Open a shell in the app container |

See `make help` for Docker lifecycle and release targets.

## Releases

Release and hotfix workflows are documented in `MAINTAINER.md`. Changelog entries are written to `HISTORY.md`.
