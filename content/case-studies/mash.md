# An IDE you can't be locked out of

Mash

Mash is a desktop workspace for AI-assisted coding. It brings a customized Ghostty terminal, Herdr workspaces, the Fresh editor and Pi into one app, with every external tool pinned, installed and configured. I built it because the editor I depended on stopped working in my country.

**Year:** 2026

**Team:**

- Luis Alejandro Martínez

**Deliverables:**

- macOS and Linux app
- First-launch setup wizard
- Signed APT repository
- 15-language UI

**Links:**

- [Github](https://github.com/LuisAlejandro/mash)
- [Website](https://letsma.sh)

## The Problem

Ten years ago I tried to rebuild the experience I liked from Sublime Text inside the terminal, using **Vim** and a pile of plugins. Everything could be approximated except **search**. The moment I needed to find something across a project the way a GUI editor does it, the illusion broke. I gave up and went back to a graphical editor for another decade.

This year I was working in **Cursor** when it blocked Venezuelan IP addresses. I was not willing to route my work through a VPN to keep using a tool, so I cancelled my account and started looking for a replacement. The closest options were terminal workspaces built on top of someone else's stack, and I never adapted to them. The old idea had a reason to exist again: an IDE I could **own end to end**, in the terminal, where no vendor can decide that my country is out of scope.

## The Challenge

A terminal cannot pretend to be a GUI. Search, file browsing, editing and agent sessions are separate programs with separate ideas about keys, windows and state. The work is making them behave like **one application** without forking all of them: one terminal window, one set of tab and pane chords, one shared editor, one menu bar.

The environment is the other half. Each external tool has to be pinned by version and checksum for four targets, staged inside the app, and started with variables that keep **~/.mash separate** from the user's own configuration, credentials and Pi sessions. That isolation cannot come from changing **HOME**, because the same tools are used outside Mash and their real homes must stay untouched. It has to be done with environment variables only, and the app has to seed a working setup on first launch without ever overwriting something the user edited.

Then comes trust. A macOS app has to be signed and notarized on two architectures. Linux gets an Ubuntu package plus an **APT repository** that keeps verifying updates after installation. Users are expected to install this once and keep working, so releases have to be boring and reversible.

## The Product

Mash works by wrapping a set of excellent terminal programs instead of reimplementing them. The macOS app is a customized **Ghostty** build whose executable calls Mash's launcher: the launcher seeds **~/.mash**, exports the isolation variables and hands control to the terminal. Linux uses the packaged launcher for the same job, and both platforms open exactly one window, no matter how many workspaces are running inside.

**Herdr** supplies the workspace model: tabs, panes, sessions and agents, plus a command menu bound to terminal chords. **Pi** runs inside panes as the coding agent, and **Fresh** is the editor shared by the whole workspace, reachable from a pane, from the command palette and from the agent itself. Tabs are named after the work they hold, and the ones waiting on you are marked. Because it is a TUI, the keyboard is the fast path, and the layout rewards learning a few chords instead of reaching for the mouse.

A first-launch wizard asks for a language and configures the workspace. The interface itself is translated into **15 languages**; the bundled tools and language servers keep their own English interfaces. Around 65 components, from the terminal fork to the Python runtime, are recorded in a single pin manifest with their source, version and SHA-256 hash, so a release is reproducible instead of hopeful. **Batteries are included**: skills, themes, plugins and a working editor/agent setup arrive with the app, so a new machine becomes a usable environment in one install.

## The Results

Mash's first public release shipped on 26 October 2026 and it is still measured in days, not months. I am not going to dress that up with download numbers that do not exist yet. What is real today: ten releases in three weeks, a launch announcement read **12,000 times**, and an app that became the environment I do all of my work in.

| Metric | Value |
| -------------------------- | ----------------------------------- |
| Views on the launch post | 12K |
| Releases in the first 3 weeks | 10 (one every 2 days) |
| Components in the pin manifest | 65 |
| Languages in the app's UI | 15 |

The part I find worth telling is not the current version number. It is that a project I abandoned for **ten years** for a missing search experience ended up being finished by the arrival of the right terminal workspace, and by a vendor deciding my country was out of scope. The next milestone is adoption I can measure, and the feedback loop that comes with it.

**Links:**

- [Github](https://github.com/LuisAlejandro/mash)
- [Website](https://letsma.sh)
