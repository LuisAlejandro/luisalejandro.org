# Design System

## Overview

Personal website and portfolio for Luis Alejandro Martínez Faneyth (`luisalejandro.org`). The product combines a marketing home page, portfolio showcase, long-form blog, case-study storytelling pages, contact form, and small app landing pages. Content is sourced from Cosmic CMS; the UI is Next.js rendering an ink-and-paper system: a 12-column grid, hairline rules, mono labels, a single crimson accent, and drawings rather than screenshots.

## 0. Scope & Stack

- **App/product:** `luisalejandro.org` — personal site, portfolio, blog, case studies, contact, and app pages.
- **UI surface:** Next.js 16 App Router, React 19, TypeScript.
- **App root:** repository root (`.`).
- **Styling:** Tailwind CSS v4 via `@import "tailwindcss"` in `styles/tailwind.css`; the `@theme` block defines the paper/ink palette, the fluid type scale, spacing and easings; the `site-` class layer carries the design system's structure; `classnames` for conditional classes; `@tailwindcss/forms` for form defaults.
- **Component model:** React function components and `forwardRef` primitives under `components/`; route shells in `app/`; side-effect wrappers in `side-effects/`.
- **Source paths:**
  - Global tokens and all component CSS: `styles/tailwind.css`
  - Root layout, metadata, analytics: `app/layout.tsx`
  - The system's primitives and page furniture: `components/common/Site/`
  - Home page and its drawings: `app/page.tsx`, `components/Home/`, `components/Home/work-art/`
  - Portfolio: `app/portfolio/page.tsx`, `components/common/Site/ProjectArchive.tsx`, `ProjectShots.tsx`
  - Case studies: `app/case-studies/*/page.tsx`, `components/common/Site/CaseStudy*.tsx`
  - Blog: `app/blog/`, `components/Blog/` (toc, topic cards, year archive)
  - Brand assets: `public/images/`, `public/favicon/`

## 1. The gold-era system (removed)

Until late 2026 the site rendered a warm gold-and-orange palette with skeuomorphic 3D buttons, inset blog surfaces, a dark case-study variant and Roboto/Poppins/League Gothic display type. That system is gone, not just unused: its components (`components/Portfolio/`, `components/Apps/`, `components/CaseStudies/`), its palette tokens, its `font-main` / `font-title` / `font-display` utilities and its three Google Fonts were deleted, and `<body>` no longer carries a gold background or a 24px default type size.

Two small pieces of that era survive on purpose:

- `components/Blog/{ArticleToc,PaletteSearchButton,TopicCards,YearArchive}.tsx` are still imported by the redesigned blog pages.
- `components/common/Layout/SkipToContentLink.tsx` is used by `SiteHeader` as the shell's skip link.

Anything else you find in the tree wearing those old class names is a stale reference worth deleting rather than reviving.

## 2. The system in use

Every route renders this system. The old one is described, and dismissed, in section 1.

### Scoping rule

- The layout is carried by `SiteShell` (`components/common/Site/SiteShell.tsx`), whose wrapper holds the `.site-shell` class. Every page renders it except the three Agoras pages, which keep their own self-contained white layout.
- `.site-shell` sets the page's ground and type; `<body>` only cancels the default cursor, hides horizontal overflow and turns on antialiasing.
- Type comes from Geist and Geist Mono, loaded in `components/common/Site/fonts.ts` (next/font/google) and applied on the shell — not on `<html>`.
- Pages use only the tokens below: no one-off hex value, no re-introduced gold-era class.

### Tokens (`styles/tailwind.css`)

| Utility | Use |
| --- | --- |
| `bg-paper` | Page background (`#f4f4f0`) |
| `bg-paper-raised` | Raised surface: cards, dialogs (`#ecece6`) |
| `text-ink` | Body and heading text (`#0e0e0d`) |
| `text-ink-muted` | Secondary text and labels (`#65655f`) |
| `border-rule`, `border-rule-strong` | Hairline dividers, and the stronger variant for hover or emphasis |
| `text-signal`, `bg-signal` | The single crimson accent (`#d61f3a`: 4.6:1 as text on paper). Not named `accent-*`: `accent-2` and `accent-7` are old greys |
| `text-signal-ink` | Text on a `bg-signal` surface (`#ffffff`, 5.1:1) |
| `bg-ink-strong` | Hover state for an `bg-ink` control (`#000000`) |
| `font-site`, `font-site-mono` | Geist for text, Geist Mono for labels |
| `text-step-n1` | Small labels |
| `text-step-0` | Body text (the shell default) |
| `text-step-1` to `text-step-5` | Headings, up to the largest display size. Each step is fluid and sets its own line-height |
| `px-gutter` | Page side padding |
| `py-section` | Vertical spacing between sections |
| `gap-col-gap` | Grid column gap |
| `ease-site-out`, `ease-site-in-out` | Transition easings, with durations of 400, 800 or 1200 ms |
| `site-note` (class) | Small uppercase mono label in `ink-muted` |

Inside the shell, `::selection` and the `:focus-visible` indicator use `signal`.

Primary calls to action render through `SiteButton` (`components/common/Site/SiteButton.tsx`) in two sizes (`sm` for the header, `md` everywhere else) and two variants (`solid`, `ghost`), so the pill is defined once. Nothing in the shell uses `hover:bg-white`, a raw `text-[…]` size, or a hand-rolled `py-16 lg:py-24` rhythm.

### Parity layer

The shell reproduces the measured geometry of the reference design (see `.mash/qa/parity-2026-11-10/parity-report.md`) through semantic `site-` classes in `styles/tailwind.css`. Every class is prefixed, so no legacy page can pick one up.

| Group | Classes |
| --- | --- |
| Frame | `.site-wrap`, `.site-grid` (12 columns, 4 below 768px), `.site-section` (top padding only), `.site-section-head` (rule above the label), plus the two fixed hairlines drawn by `.site-shell::before/::after` |
| Type roles | `.site-display`, `.site-h1`, `.site-h2`, `.site-h3`, `.site-lead-type` — each sets its own size, tracking and line-height. The base heading rule uses `:where()` so a role class always wins |
| Buttons and links | `.site-btn` (+ `--ghost`, `--sm`), `.site-tool`, `.site-link`, `.site-link--inline` |
| Sections | `.site-hero*`, `.site-wf-*`, `.site-ws*`, `.site-service*`, `.site-claim` / `.site-step*`, `.site-post*`, `.site-footer*` |
| Contact and docs | `.site-contact-head*`, `.site-contact-form*`, `.site-contact-facts`, `.site-doc*` |
| Case studies | `.site-case-head*`, `.site-case-eyebrow`, `.site-case-title`, `.site-case-facts`, `.site-case-hero`, `.site-case-section*`, `.site-case-figure*`, `.site-case-video`, `.site-case-gallery`, `.site-case-stats*`, `.site-case-bars*` |
| Portfolio | `.site-project-head*`, `.site-project-spec`, `.site-project-grid` / `.site-project-card*`, `.site-project-tags`, `.site-project-title`, `.site-project-shot*`, `.site-project-story*`, `.site-project-sources`, `.site-project-end` |
| Selected work | `.site-wgrid` / `.site-wcard*` (the 3-column sheet, its ink curtain and its kept cells), `.site-ws*` (the pinned stage) |
| Project archive | `.site-entries`, `.site-entry*`, `.site-pentry*` (the `details` row, its body, `.site-pentry__track` / `.site-pentry__controls` / `.site-pentry__ticks` / `.site-pentry__nav` for the screenshot filmstrip), `.site-note`, `.site-pill` |
| Blog | `.site-blog-head*`, `.site-kicker`, `.site-spec`, `.site-pills` / `.site-pill`, `.site-feat*`, `.site-year*` / `.site-entry*`, `.site-topic*`, `.site-subscribe`, `.site-article*`, `.site-toc*`, `.site-prose*` / `.site-code` / `.site-fig*`, `.site-author`, `.site-next` |
| Syntax tokens | `--color-syn-keyword`, `--color-syn-string`, `--color-syn-number`, `--color-syn-title`, `--color-syn-attr` (ink code blocks) |
| Effects | `.site-preloader`, `.site-mark` (plotted face mark), `.site-gen-word` / `.site-gen-caret`, `.site-vortex`, `.site-process-line`, `.site-reveal` |

**Motion is CSS-first.** The header compacts, draws its ruler and fills its progress bar through `animation-timeline: scroll(root)`, with a `@supports` fallback that hides the progress bar. The work stage pins with `position: sticky`, and only a scroll listener picking the active index runs in JavaScript (`WorkSection`). Reveals stay in `Reveal` (IntersectionObserver). The preloader is pure CSS and is removed entirely under `prefers-reduced-motion`.

**The pinned work stage degrades to a list.** `data-pinned` is set from `useSyncExternalStore` over `(min-width: 768px)` and `prefers-reduced-motion`; when it is false the same markup renders as stacked cards, so there is no second copy of the DOM.

**The theme is light only.** Paper, ink and hairline values are the reference's own light palette; the accent is crimson rather than any of the reference's three accents.

**The hero background is a vortex, not terrain.** `HeroVortex` is a WebGL2 reproduction of the spiral on contentarchitecture.dev, with our ink-on-paper colours and Go source in place of their text. Rings alternate direction, turn faster toward the eye, and carry text only inside a soft-edged band with dots elsewhere; there are as many rings as the viewport needs to cover every corner (capped at 64) and they are rebuilt when that reach moves by 3%. The pointer dissolves nearby glyphs into dots, click-and-hold charges and freezes the rings, release sends a ripple outward, and a ripple also plays on load.

**The vortex is a page layer, not a hero child.** It is `position: fixed` at `z-index: 4`, so the next section can rise *through* its dissolving centre instead of appearing under a blank screen. The stack is: section 01 (`z-index: 2`, pulled up one screen so it arrives during the dissolve), the vortex (4), the pinned hero (6, so its paper strips cover the rings), the header (50). The header band is always opaque — the reference fades it in over 80px, but here the rings are a layer above the page and the nav must stay legible. The hero's own bottom row carries a full-bleed paper strip for the same reason. Without WebGL2 the hero is plain paper; reduced motion draws one still frame and drops the pin and the overlap.

**Project panels are drawn, not screenshotted.** `components/Home/WorkArtwork.tsx` renders one technical collage per project, keyed by slug: outlined UI fragments with micro mono labels, dimension and leader lines with arrowheads, elements that overlap and run past the sheet edge, and exactly one accent element per panel (the project's own figure where one exists). Everything is vector and hand-placed on a 1600×900 sheet, one scene per file under `components/Home/work-art/`, sharing the primitives in `work-art/shared.tsx` (`Obj`, `Win`, `Note`, `Leader`, `Check`, `Stamp`, `Figure`, the sheet palette).

The same drawing plays in three places: on the home page's sheet (`WorkGrid`, where hover replays it through `--art-progress`), on the portfolio's pinned stage (`WorkSection`, where scroll drives it), and never as a screenshot. A `layer="front"` part of each scene crosses in front of the stage's title. Anything without an entry in the `ART` map falls back to the `image` in `ProjectList`; the two lists (`RecentProjectList` and `ProjectList`) supply the slugs, and the site banner stands in for the six newer case studies until they have thumbnails.

**The project archive's screenshots are a ghosted filmstrip.** `ProjectShots` keeps every project's screenshots in one fixed 16:10 frame (a scroll-snap track), so a row's height comes from its text rather than its image count. Each frame is painted on a canvas as a lifted, two-tone Bayer dither in near-white; hover wipes the dither off along the X axis to reveal the real image, and touch devices (no hover) show the real image. The canvas is a layer over the real, lazy-loaded `next/image`, so alt text, loading strategy and the fallback when the canvas never paints are unchanged.

**The face mark is `public/images/logomin.svg`, plotted.** `SiteMark` reuses its four paths: hair and glasses trace as outlines and then fill, the brows drop in, and the right brow lifts once in the accent. It replays when the pointer enters the brand link, and the preloader shows it large.

**Only the shell carries `.site-shell`.** The `site-` classes and the `--text-step-*` scale belong to it; a page outside the shell (only the Agoras trio) must not depend on them.

### Two rules that look odd on purpose

- **Fonts sit in `@theme inline`.** The Geist CSS variables are set on the shell element by `components/common/Site/fonts.ts`, not on `<html>`. A normal theme token would resolve on `:root`, where those variables do not exist; `inline` makes the utility emit the font stack at the point of use.
- **`body:has(.site-shell)` is outside every `@layer`.** It paints the page ground and the overscroll area, and only an unlayered rule outranks the utilities layer.
