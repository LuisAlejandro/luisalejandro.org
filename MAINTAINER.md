# Maintainer Guide

Quick reminders for Luisalejandro. Procedures live in `.cursor/skills/`; fleet
setup lives in **rosey-maintainer-tools**.

## Feature work

1. `rosey-lfg-code` — brainstorm → plan → implement.
2. `rosey-lfg-quality` — QA, lint/build, open/update PR to `develop`.

Repeat until ready to ship.

## Release

From **clean** `develop`:

| Step | Command / skill |
|------|-----------------|
| Interactive | `rosey-release` (default **patch**; `minor` / `major` when needed) |
| Manual | `make release-preflight` then `make release-patch` (or `-minor` / `-major`) |
| Rollback | `VERSION=<version> make undo-release` |

Preflight: `make image`, `make dependencies`, `make build`, `make format`, `make lint`, `make test`.
Gate details, milestones, and workflow verification: `.cursor/skills/rosey-release/`.
Post-bump hooks: `.bumpversion.cfg` → `[rosey-maintainer]`.

## PR CI (pointers)

- **Pull Request** — `.github/workflows/pr.yml` on PRs to `develop`.
- **Auto-merge** — `pr-auto-merge.yml` after that workflow is green; head
  `feature/**` or `dependabot/**` only. `rosey-lfg-quality` / `rosey-pr` do not merge or fix CI.
- **Cursor CI fixes** — **rosey-maintainer-tools** `docs/cursor-pr-ci-automation.md`.

## Before `make release-*`

- Tools: `git`, git-flow, Docker (running), `make`, `gh`, bumpversion, GPG (`user.signingkey`).
- Clean working tree (release stops if format mutates files).

## One-time GitHub setup

- `develop` — PR + checks from `pr.yml`; `rosey-maintain protect-github --apply`.
- `master` — restrict pushes.
- `release/*` — `push.yml` lists `release/**` and ends with **Release Gate** (manual patch).
- Tags — restrict creation to maintainers.
