# Thirty-five schedules and one approver

Tetra Incubator system

Tetra is a two-host agent incubator: one machine researches and synthesises, the other implements through a six-stage pipeline, and Discord is the bus where a single human approves the work. It has no employees and it runs on cron.

**Year:** 2026

**Team:**

- Luis Alejandro Martínez

**Deliverables:**

- Two-host agent architecture
- 35 scheduled jobs
- Product and editorial councils
- Six-stage pipeline
- Discord approval gate

## The Problem

Eleven application repositories, one person, and a backlog that generates itself: competitor moves to watch, debt to pay down, user feedback to read, topics to research, releases to cut, dependencies to tidy. Every one of those is worth an hour a week and none of them is worth the hour you have.

The usual answer is to hire, and the reason that answer fails here is not budget: it is that none of those jobs needs a person to **decide** anything. They need to be read, synthesised, and turned into a proposal. What needs a person is the approving, and that is one action a day at most.

## The Challenge

Two machines means two truths. The research host is Linux under WSL and the implementation host is a Mac, so absolute paths differ, schedulers differ, and a document written on one describes a world the other cannot see. The system had to be designed so that **each host owns its own map** and neither is a copy of the other, while the artefacts they exchange travel through a shared git repository rather than through the machines.

Then there is the bus. Discord is where work is dispatched, and Discord is public to the team: anyone who can post in a channel can paste YAML or an approval the bots will act on. That is a trust boundary, and it had to be stated as one: only the two bot accounts post executable YAML, only I approve, reject, vote or postpone, and consumers ignore instruction-shaped messages from anyone else.

The third problem is that agents fail in ways cron does not expect. A run can hang, loop on a broken test, or produce a task that never finishes. So every task carries an attempt budget and a status report, and a task that exhausts its retries is escalated into a channel a human actually reads instead of dying silently in a log. Ownership boundaries matter just as much: the research host writes briefs and never writes the feature catalog, because a second writer would silently fork the truth.

Finally, the system had to survive its own history. Earlier agent generations were retired mid-flight, and the retirement had to be real: one scheduler, no dead paths, nothing recreated by a helpful agent that found an old document promising otherwise.

## The Product

Tetra is two cooperating hosts. The Linux one runs **product intelligence and editorial**: a monthly market scan, a weekly debt scan and feedback pass over product reviews, competitor radar, topic radar, trend and influencer radar, a lab notebook that harvests what I actually built that week, and two synthesis councils, one that writes the product brief and one that writes the editorial brief. Around those sit the operational jobs: a job-hunt scanner, an idea forge, a task digest, weekly search performance, an editorial audit, and a captain's log compiled nightly from the day's evidence.

The Mac runs **implementation**. A dispatch arrives as YAML in a Discord channel and a consumer picks it up: brainstorm, plan, work, quality review, lint, pull request — six stages, the same one every time, with the branch, the tests and the review built in. Alongside it run a debug pipeline for bug reports, a design pipeline that collects candidate screens, holds a vote, and implements the winner, a release pipeline, a catalog reconciler that keeps each repo's feature index true and mirrors it back for the next week's brief, and a watchdog that reports anything stuck.

The glue is deliberately boring: **fenced YAML for tasks** in one direction, status YAML back in the other, and a git-backed second brain where briefs, catalogs and the nightly log accumulate so the next run starts with memory instead of amnesia. Every schedule is written down with its cron expression, and the two maps cross-reference each other without ever being synced, which is what keeps them honest.

## The Results

The outcome I feel first is time: about **fourteen hours a week** of reading, scanning, synthesising and drafting now happen on schedules, and what reaches me is a proposal with evidence attached and a single decision to make.

| Metric                        | Value |
| ----------------------------- | ----- |
| Hours a year returned to me   | 700+  |
| Hours per week returned to me | 14    |
| Scheduled jobs running        | 35    |

I will not claim all of that throughput as machine work. In the 90 days to 15 November 2026 the eleven target repositories merged **179 pull requests**; 111 of them were Dependabot updates. Of the other 68, about **half came from the pipeline**, identified by the model badge it signs its pull requests with or by the planner task they close; the rest are mine.

The failure modes are part of the result too. Runs that hang escalate instead of vanishing, a task that cannot be finished stops after its attempts and lands in the escalation channel, and the catalog has one writer so two agents cannot disagree about what exists. The next step is having the pipeline label its own pull requests, so that split is counted rather than inferred.
