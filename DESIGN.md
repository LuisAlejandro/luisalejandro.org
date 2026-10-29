# Design System

## Overview

Personal website and portfolio for Luis Alejandro Martínez Faneyth (`luisalejandro.org`). The product combines a marketing home page, portfolio showcase, long-form blog, case-study storytelling pages, contact form, and small app landing pages. Content is sourced from Cosmic CMS; the UI is implemented in Next.js with a warm gold-and-orange brand palette, skeuomorphic blog surfaces, and large display typography.

## 0. Scope & Stack

- **App/product:** `luisalejandro.org` — personal site, portfolio, blog, case studies, contact, and app pages.
- **UI surface:** Next.js 16 App Router, React 19, TypeScript.
- **App root:** repository root (`.`).
- **Styling:** Tailwind CSS v4 via `@import "tailwindcss"` in `styles/tailwind.css`; `@theme` block defines custom tokens; component-layer utility classes for 3D buttons and blog/post chrome; `classnames` for conditional classes; `@tailwindcss/forms` for form defaults.
- **Component model:** React function components and `forwardRef` primitives under `components/`; route shells in `app/`; side-effect wrappers in `side-effects/`.
- **Source paths:**
  - Global tokens and component CSS: `styles/tailwind.css`
  - Root layout, fonts, metadata: `app/layout.tsx`
  - Shared layout primitives: `components/common/Layout/`
  - Portfolio UI: `components/Portfolio/`
  - Blog UI: `components/Blog/`
  - Case-study UI: `components/CaseStudies/`
  - App landing UI: `components/Apps/`
  - Home page: `app/page.tsx`, `components/Home/`
  - Brand assets: `public/images/`, `public/favicon/`

## 1. Design Tokens

### Colors

Custom theme colors in `styles/tailwind.css` `@theme`:

| Token | Value | Usage |
| --- | --- | --- |
| `orange` | `#da8244` | Accent sections (`Section accent2`) |
| `gold` | `#f8d983` | Accent sections (`Section accent1`), theme color |
| `gold-dark` | `#d0bb57` | Supporting gold tone |
| `bright-gold` | `#f5cc6a` | Default page background (`body`) |
| `custom-beige` | `#f2d9a0` | Inline link base |
| `custom-beige-light` | `#ede4ce` | `StyledLink` background |
| `blue-gray` | `#abb7b7` | Primary CTA background (`ResumeLink`) |
| `blue-gray-light` | `#c0cece` | CTA hover |
| `gray-1` | `#3c3c3c` | Dark text accents |
| `gray-2` | `#222222` | Default body text |
| `gray-3` | `#5a5a5a` | Button label text |
| `gray-4` | `#303030` | Case-study dark surfaces |
| `gray-5` | `#aaaaaa` | Contact dark section background |
| `gray-6` | `#ddd` | Utility gray |
| `accent-2` | `#eaeaea` | Neutral accent |
| `accent-7` | `#333333` | Neutral accent |
| `orange-2` | `#e68449` | Orange variant |
| `orange-3` | `#f1b161` | Orange variant |
| `teal-custom` | `#1abc9c` | Blog/post link accent in prose |

Blog-specific hard-coded accents in components:

- Featured-post green rail: `rgba(0,177,106,0.9)`
- Blog data container inset green: `rgb(0, 177, 106)`
- Category pill gray: `rgb(210,210,210)` on `rgb(90,90,90)` text

Case-study dark mode uses `gray-4` (`#303030`) header fill and muted `text-gray-400` nav links.

### Typography

Loaded in `app/layout.tsx` via `next/font/google`:

| Role | Font | CSS variable | Tailwind utility |
| --- | --- | --- | --- |
| Display | League Gothic | `--font-league-gothic` | `font-display` |
| Titles / highlights | Poppins | `--font-poppins` | `font-title` |
| Body / UI | Roboto | `--font-roboto` | `font-main` |

Body defaults: `text-2xl font-main` on `<body>` with `bg-bright-gold text-gray-2`.

Heading scale examples:

- `SectionTitle` main: mobile `text-5xl` → md `text-6xl` → lg `text-7xl`, gradient text `from-gray-900 to-gray-800/60`
- `SectionText`: mobile `text-md` → md `text-xl` → lg `text-2xl font-light`
- Home `Heading` / `SubHeading`: large intro copy in `components/common/Layout/Heading.tsx` and `SubHeading.tsx`
- `HighlightText`: `font-black font-title`

Extended display sizes in theme: `text-10xl` through `text-18xl` for hero-scale typography.

### Spacing, layout, and breakpoints

- Custom breakpoint: `--breakpoint-xs: 450px`
- Content max width: `lg:max-w-260` on sections and titles
- Wide layout: `lg:max-w-[80%]`
- Horizontal padding: `px-8` mobile, `lg:px-12` desktop; home `Container` uses `px-12 md:px-32`
- Section padding variants via `Section`: default, `smallpadding`, `nopadding`
- 16-column grid token: `--grid-template-columns-16`

### Radius, shadows, motion

- Shadows: `--shadow-small`, `--shadow-medium`
- Common radii: `rounded-lg`, `rounded-xl`, `rounded-2xl`, `rounded-[5px]` on blog controls
- Transitions: `duration-200`, `duration-300`, `duration-400` with `ease-in`, `ease-in-out`, `ease-out`
- Motion libraries: Framer Motion, GSAP (`@gsap/react`), ScrollMagic on select portfolio surfaces
- Background animation: `components/Portfolio/BackgroundAnimation/BackgroundAnimation.tsx`

### Dark / variant behavior

No sitewide dark theme. Two explicit visual modes:

1. **Portfolio/home default:** bright gold background, dark text, dark logo (`/images/logomin.svg`)
2. **Case-study variant:** dark header (`Header variant="case-studies"`), white logo (`/images/logomin-white.svg`), gray nav links, decorative SVG wave divider

## 2. Core Components

### Layout primitives (`components/common/Layout/`)

- **`Section`:** primary page section wrapper. Props: `grid`, `row`, `nopadding`, `accent1` (`bg-gold`), `accent2` (`bg-orange`), `wide`, `fullwidth`, `oneColumn`, `nomargin`, `overflowVisible`, `color`.
- **`SectionTitle`:** gradient heading; `main` prop enlarges hero titles.
- **`SectionText`:** supporting paragraph with responsive type scale.
- **`Container`:** centered content wrapper with responsive horizontal padding.
- **`Heading` / `SubHeading`:** home-page intro typography.
- **`Footer`:** lightweight centered footer text (`text-black/40 font-light text-base`).
- **`ButtonBarContainer` / `GalleryContainer`:** constrained layout wrappers for home CTA/gallery rows.

### Navigation (`components/Portfolio/Header/Header.tsx`, `components/common/Header/`)

- Sticky-style header container with logo, primary nav (`Portfolio`, `Blog`, `Store`, `Contact`), and social icons (`GitHub`, `LinkedIn`, `YouTube`, `X`) via `react-icons/ai`.
- `variant="case-studies"` switches to dark styling and wide container.
- Nav links: `text-lg lg:text-xl font-light` with hover color transitions.

### Links and buttons

- **`StyledLink`:** inline beige pill link with white hover (`bg-custom-beige-light rounded-lg`).
- **`ResumeLink`:** large portfolio CTA; `bg-blue-gray rounded-2xl simple-3d-button-gradient`.
- **`Button1`:** width wrapper for hero CTA placement.
- **3D button utilities** in `styles/tailwind.css`:
  - `.simple-3d-button`
  - `.simple-3d-button-gradient` (used by resume and contact submit)
- **Contact submit button:** stateful colors for default, waiting, success, error, disabled (`components/Portfolio/Contact/Contact.tsx`).

### Portfolio domain components

- **Hero:** `SectionTitle` + `SectionText` + resume CTA (`components/Portfolio/Hero/`)
- **Case studies:** card grid, tags, imagery (`components/Portfolio/CaseStudies/`)
- **Toolbox / accomplishments / journey / other work:** sectioned content blocks with list, gallery, and timeline patterns
- **Contact:** validated form with `react-hook-form`, `yup`, reCAPTCHA, JWT-signed API submit
- **Footer:** multi-column links (`components/Portfolio/Footer/`)

### Blog components (`components/Blog/`)

- **`HeroPost`:** featured post layout with green accent rail, cover image, category pill, share/reaction controls, and data panel using `.blog-data-container-big`.
- **`PostPreview` / `MoreStories` / `SearchBar` / `SearchResultItem`:** listing and search surfaces.
- **Blog chrome classes** in `styles/tailwind.css`:
  - `.blog-category-button`
  - `.blog-data-container`, `.blog-data-container-big`
  - `.blog-post-bg`, `.blog-post-bg-dark`
  - `.blog-socialpop`

### Post content (`components/Post/`, `.post-content` rules)

- Prose styles for headings, lists, blockquotes, tables, and code blocks
- Link color `rgb(26, 188, 156)` (teal-custom family)
- Table headers on beige background with teal underline
- `.post-category-button`, `.post-blockquote`, `.post-related-item`, `.post-keywords-link`

### Case-study storytelling (`components/CaseStudies/`)

- `HeroIntro`, `Product`, `Results`, `Why`, `ScrollTween` for long-form case pages
- Per-case hero background images defined as Tailwind `--background-image-case-studies-*` tokens

### Apps landing (`components/Apps/Hero/`)

- Separate hero/nav pattern for `/apps/*` routes such as Agoras

### Feedback / status

- Contact form: inline validation messages (`text-red-500`), loading spinner, success/error icons from `react-icons/ai`
- `ErrorBoundary` component for client error containment
- Cookie consent wrapper and ad/analytics side effects

## 3. UX Patterns

### Page structure

- **Home (`app/page.tsx`):** centered logo, intro copy with highlighted phrases and inline links, photo gallery, button bar, footer.
- **Portfolio (`app/portfolio/`):** stacked sections on gold background with animated background and multiple content bands.
- **Blog (`app/blog/`):** index with featured hero post, previews, category navigation, and search.
- **Posts (`app/blog/posts/[slug]/`):** cover image, metadata, rendered CMS HTML via `PostContent`, related stories, comments integration.
- **Case studies (`app/case-studies/*/`):** dark header variant and full-width narrative sections.
- **Contact (`app/contact/`):** form-first page using shared `Contact` component.

### Responsive behavior

- Mobile-first Tailwind breakpoints; many portfolio sections switch from column to row at `lg:`.
- Blog hero post compresses image/data columns on smaller screens.
- Header social icons scale (`text-5xl` → `lg:text-2xl`).

### Data loading and errors

- Server components fetch CMS content in route files; client components handle interactive blog/contact behavior.
- Contact form shows temporary success/error feedback and resets reCAPTCHA after timeout.
- `not-found.tsx` and `global-error.tsx` provide route-level fallbacks.

### Accessibility patterns present in code

- Semantic headings and labels on contact form fields
- `alt` text on key images; some decorative images use empty `alt`
- `rel`, `target`, and `title` attributes on external links
- Focus ring styles on form controls via `focus:ring-2 focus:ring-neutral-300`
- Color contrast varies by surface; case-study dark header intentionally uses lighter gray link text on dark background

### Icon and asset conventions

- UI icons: `react-icons/ai` predominantly
- Logos: `public/images/logomin.svg`, `logomin-white.svg`, `logo.svg`
- Favicons and PWA assets under `public/favicon/`
- Theme color metadata: `#f8d983`

## 4. Implementation Rules

- Reuse `Section`, `SectionTitle`, and `SectionText` for new portfolio-style bands before inventing new wrappers.
- Use theme tokens from `styles/tailwind.css` (`bg-gold`, `text-gray-2`, `font-title`, etc.) instead of one-off hex values when a named token exists.
- Prefer `classnames`/`cn` for variant styling, matching `Header` and `Section` patterns.
- For inline text links in marketing copy, use `StyledLink`; for primary CTAs, use `ResumeLink` or the contact submit button pattern with `simple-3d-button-gradient`.
- For blog surfaces, reuse `.blog-category-button` and `.blog-data-container*` classes rather than re-creating inset shadows.
- For post HTML rendered from CMS, extend `.post-content` rules in `styles/tailwind.css` instead of scattering prose styles in components.
- Import shared primitives via path aliases (`@components/...`, `@styles/...`, `@constants/...`).
- Use `next/image` for content imagery and optimized loading.
- When adding case-study pages, follow existing `layout.tsx` + `page.tsx` split and register hero background tokens in `@theme` if new art is introduced.

## 5. Gaps To Revisit

- No centralized `design-tokens.json`; tokens live in Tailwind `@theme` and inline literals (especially blog/post colors).
- Button primitives are inconsistent (`Button1` is a span wrapper; contact button is inline; resume link is anchor-only).
- `Section` `color` prop uses dynamic ``bg-[${color}]`` which may not compile under Tailwind static analysis.
- Dark styling is route-variant based, not token-driven; extracting a `case-studies` theme object would reduce duplication in `Header`.
- Post/content typography relies heavily on custom CSS classes instead of shared React components.
- Accessibility states (focus, aria-expanded, keyboard traps) are not documented uniformly across interactive blog/share controls.
- Apps and portfolio/blog share tokens but do not share a single app-shell abstraction.
