# Contributing

Thank you for your interest in luisalejandro.org. Contributions are welcome, and credit is given to everyone who helps improve the project.

## Types of Contributions

You can help by:

- Reporting bugs
- Fixing bugs
- Implementing features
- Improving documentation
- Submitting feedback on existing behavior

## Report Bugs

Report bugs through [GitHub Issues](https://github.com/LuisAlejandro/luisalejandro.org/issues).

Please include:

- Your operating system and version
- Node.js / npm versions (or confirm you used Docker)
- Steps to reproduce the problem
- Expected vs. actual behavior
- Relevant logs, screenshots, or browser console output

## Suggest Features

Before opening a feature request, check whether a similar issue already exists. Describe the problem you are solving, the behavior you want, alternatives you considered, and the scope you have in mind.

## Local Development

1. Fork and clone the repository.
2. Create a branch from `develop`.
3. Copy environment variables and fill in secrets (Cosmic CMS keys are required for content pages):

   ```bash
   cp .env.example .env
   ```

4. Build and start the Docker development environment:

   ```bash
   make image
   make dependencies
   make serve
   ```

   The app runs at [http://localhost:3101](http://localhost:3101).

5. Open a shell in the container when you need to run project commands inside Docker:

   ```bash
   make console
   ```

Package layout highlights:

- `app/` — Next.js App Router pages and API routes
- `components/` — React UI
- `lib/` — shared helpers and integrations
- `constants/` — public config and constants
- `content/` — static content (case studies, llms surfaces)
- `public/` — static assets and agent-discovery files

## Quality Checks

Before opening a pull request, run:

```bash
make lint
make format
make test
```

These targets run inside the development container:

- `make lint` — ESLint (`npm run lint`)
- `make format` — Prettier write (`npm run format`)
- `make test` — TypeScript type check (`npm run type-check`)

CI builds the Docker image and runs `make dependencies`, `make build`, `make lint`, and `make test` on pull requests to `develop` (see `.github/workflows/pr.yml`), plus a Semgrep **Code Quality** job.

## Pull Request Guidelines

- Include tests or type-safe coverage for behavior changes when applicable.
- Update documentation when user-facing behavior changes.
- Keep changes focused and easy to review.
- Link related issues when applicable.
- Do not commit secrets, `.env` files, or local credentials.

## Maintainer Notes

Releases are handled by maintainers using the git-flow release scripts (`make release-patch`, `make release-minor`, `make release-major`, and `make undo-release`). Contributors should not publish packages, push release tags, or cut GitHub releases unless asked to do so by a maintainer.

See [MAINTAINER.md](MAINTAINER.md) for maintainer release workflow details.
