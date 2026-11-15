# One workspace for every project

Shoky

Shoky is a reusable meta-workspace for small multi-repo projects: a forkable template that brings the agent workflow, per-repo memory and a local container stack with it. Around 25 engineers at Shokworks work from it, across five client projects.

**Year:** 2026

**Team:**

- Luis Alejandro Martínez

**Deliverables:**

- Forkable workspace template
- Agent workflow skills
- Memory Bank contract
- Docker stack scaffolding

**Links:**

- [Shokworks](https://www.shokworks.com)

## The Problem

Shokworks had two phases of the same problem. First, the teams were not using AI at all. Then, once they started, each developer used their own personal account and their own habits, so every project began with a different setup and nobody could say what a good one looked like. Rules were copied from repo to repo, there was no shared memory between sessions, and there was no agreed path from an idea to a merged pull request.

The projects make this worse. They are **small multi-repo systems**, typically two or three sibling services on GitHub Enterprise, where one change spans a backend, a frontend and the contract between them. A single-repository assistant setup does not fit that shape: it loses the other repos, it forgets what the last session learned, and it cannot open one pull request per repo with a coherent story.

Onboarding was the visible cost. A new engineer joined, was told the project has an AI workflow, and then spent their first week rediscovering the setup instead of shipping.

## The Challenge

The deliverable is a **template, so everything has to survive a fork**. That rules out a platform team, a hosted service or an internal tool that needs maintenance: the answer has to be files and bash scripts inside the repo, readable and editable by whoever inherits the project.

It also has to run on three hosts. macOS and Linux are straightforward; Windows is supported only through **WSL2**, because bind mounts and file watching on a Windows path break the container stack and there is no native PowerShell port of the scripts. The clone has to live inside the Linux filesystem, and the documentation has to say so before an engineer discovers it by losing an afternoon.

Memory was the subtle one. Agents need durable knowledge per repository, but the meta-repo that coordinates them is not itself a project, so its memory has no target. Memory Bank files are generated from git history and then curated, which means the pipeline has to distinguish ingestion from curation and never let the coordinator's own notes leak into a client repository.

Finally, the workflow has to be opinionated enough to be repeatable and honest enough to be useful: design, PRD, plan with a topology baseline, implementation, code review plus a minimalism review, then multi-repo pull requests. Every step needs a skill an agent will actually follow, and every skill needs the same shared contract for topology and for memory.

## The Product

Shoky is one repository you fork per project. Two files describe the project: **repos.list** holds the sibling repositories, and **project.env** the project name and any branch overrides. From there, **init-template.sh** writes the workspace file, **clone-repos.sh** puts the siblings under **packages/**, and a small set of scripts covers the daily loop: status, checkout, pull, and memory ingest.

The workflow lives in agent skills: design a feature, write the PRD, plan the implementation with a topology baseline, execute it, review it with both a correctness and a minimalism reviewer, then open coordinated pull requests for every repo the change touches. Two more skills cover the parts teams always skip: onboarding a machine end to end, and scaffolding the local stack.

**Memory Bank** keeps three files per clone (system patterns, technical context, progress), written from git history and curated down to what is still true. **Sentrux** supplies the structural view used in planning and QA, called through its MCP server so a scan never blocks a terminal. The container stack is generated, not hand-written: thin development Dockerfiles per repo, a compose file, a manifest and secrets examples, so a new project has a working local environment without a compose file being edited by hand. Nothing about a client's data, credentials or repository names lives in the template itself.

## The Results

Shoky is the standard at Shokworks, where I lead AI-first implementation. Around **25 engineers** work from forks of it, and it has been the starting point for **five client projects**. The engineers are not the only ones affected: the clients get a project whose conventions are written down from the first commit instead of living in one person's head.

| Metric | Value |
| ------------------------------------------- | ----- |
| Engineers working from forks | ~25 |
| Client projects using it | 5 |
| Time from induction to a merged change | 1 week |
| Hosts supported | macOS, Linux, WSL2 |

The measurable result is onboarding: after the induction session, an engineer is landing a useful change on a repository they have never seen in about **one week**, on a project split across several services. Teams also report working faster and with fewer setup mistakes than when the same work was done by hand. I want to be careful with that claim: I have not instrumented it with a controlled study. What I can point at is the induction path shrinking, the setup questions disappearing from team chat, and the same conventions holding across five projects maintained by different people.

The next step is making that evidence quantitative, and keeping the template honest as the models and the tools underneath it change.

**Links:**

- [Shokworks](https://www.shokworks.com)
