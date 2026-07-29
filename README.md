![header](https://capsule-render.vercel.app/api?type=waving&color=898380&text=web-portfolio&height=250&desc=Personal%20portfolio%20%2F%20CV%20site%20of%20Alessio%20Manfredini%20(DevManfre)&fontAlignY=25&descAlignY=50)

[![Netlify Status](https://api.netlify.com/api/v1/badges/20aaaf4a-1edf-47e9-96e1-a093ed4e427b/deploy-status)](https://app.netlify.com/sites/devmanfre/deploys)
[![CI](https://github.com/DevManfre/web-portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/DevManfre/web-portfolio/actions/workflows/ci.yml)
[![GitHub release](https://img.shields.io/github/release/devmanfre/web-portfolio.svg)](https://github.com/DevManfre/web-portfolio/releases/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**English** · [Italiano](README.it.md)

Live at **[devmanfre.netlify.app](https://devmanfre.netlify.app)** — a single-page, bilingual (English/Italian), dark-first portfolio and CV site built with Next.js.

---

## Table of Contents

**The Site**
- [Features](#features)
- [The Interactive Terminal](#the-interactive-terminal)

**Development**
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)

**Management & Operations**
- [Managing Content](#managing-content)
- [Internationalization (i18n)](#internationalization-i18n)
- [Analytics](#analytics)
- [External Services](#external-services)
- [Deployment & CI](#deployment--ci)
- [Git Workflow](#git-workflow)
- [AI-Assisted Maintenance](#ai-assisted-maintenance)
- [License](#license)

## The Site

### Features

- **Single page, fully bilingual** — path-based locales (`/en`, `/it`) powered by [next-intl](https://next-intl.dev), with `x-default` fallback to English. Every user-facing string exists in both languages.
- **Dark theme by default** — light/dark switch (top-right toggle) via [next-themes](https://github.com/pacocoursey/next-themes); theme tokens are CSS variables in `globals.css` mapped to semantic Tailwind colors.
- **Animated "letter glitch" background** — a canvas matrix-style effect ([ReactBits](https://reactbits.dev) `LetterGlitch`) that pauses when off-screen or when the tab is hidden, and respects `prefers-reduced-motion`.
- **Hero** — name, tagline, avatar, one-click CV download (locale-specific PDF) and a social icon row (GitHub, LinkedIn, CodePen, email) with tooltips.
- **CV sections** — About, Work Experience, Education, Skills, Languages, Certifications, all rendered from a single typed data object (`src/data/resume.tsx`) with staggered blur-fade entrance animations ([Magic UI](https://magicui.design)).
- **Interactive terminal** — a fake shell with real commands and hidden easter eggs. See [below](#the-interactive-terminal).
- **GitHub Activity section** — server-rendered stats fetched from the GitHub GraphQL API: public repo count, total stars, contributions in the last year, top language, a contribution calendar heatmap, and up to 4 pinned repositories. Data is cached for 24 hours (`revalidate: 86400`) with a 5-second fetch timeout. The whole section silently disappears if `GITHUB_TOKEN` is missing or any API call fails — the build never breaks because of it.
- **CodePen Experiments section** — hand-curated pens embedded as lazy-loaded iframes whose embed theme follows the site theme. Curated by hand because CodePen has no public API (its RSS feed is Cloudflare-blocked); the section hides itself when the pen list is empty.
- **Projects grid** — cards with image/video, tech badges, and per-project links (GitHub, articles, live demos).
- **Contact section** — direct LinkedIn and email call-to-action buttons.
- **Animated 404 page** — "404 / Page not found" rendered with the ReactBits `TrueFocus` focus-shift animation.
- **SEO** — per-locale metadata and Open Graph tags, generated OG image, `hreflang` alternates, JSON-LD `Person` schema (with `sameAs` social links), `sitemap.xml`, and `robots.txt`.
- **Privacy-friendly analytics** — [Umami](https://umami.is) with custom events, loaded only when configured ([details](#analytics)).
- **Accessibility touches** — `aria-live` terminal log, `aria-label`s on icon-only controls, reduced-motion support, keyboard-friendly terminal input.

### The Interactive Terminal

The Education section ends with a terminal (`src/components/interactive-terminal.tsx`). On load it plays a scripted typing intro (defined in `DATA.terminal`):

```
> get-graduation --spec IT
✔ IT graduation getted.
> get-degree --spec CS
✔ CS degree getted.
> sudo work --mode hard ...
```

After the intro (~intro length + 500 ms) an interactive prompt appears: `visitor@devmanfre:~$`. Commands are case-insensitive; history is capped at 50 entries. Typing `clear` also removes the intro.

### Documented commands (`help`)

| Command | Effect |
|---|---|
| `help` | Lists the commands below |
| `whoami` | Name and role |
| `skills` | Tech skills from `DATA.skills` |
| `languages` | Spoken languages with levels |
| `certs` | Certifications |
| `projects` | Project names with links |
| `contact` | Clickable email / LinkedIn / GitHub links |
| `cv` | Downloads the CV PDF for the current locale |
| `clear` | Clears history **and** the intro |

### Easter eggs (spoilers!)

<details>
<summary>Undocumented commands — click to reveal</summary>

| Command | Effect |
|---|---|
| `sudo matrix` | **The big one.** Prints "Wake up, Neo…", dispatches a `matrix-burst` browser event, and the background `LetterGlitch` canvas goes fullscreen for 5 seconds before fading out over 0.7 s. Skipped entirely under `prefers-reduced-motion`. Tracked as the `matrix-egg` analytics event. |
| `sudo <anything else>` | "visitor is not in the sudoers file. This incident will be reported." |
| `rm -rf /` | "nope. this portfolio is read-only :)" |
| `exit` | "nice try. you can check out any time you like, but you can never leave." (Hotel California) |
| `ls` | "just a portfolio here — try `help`" |
| `pwd` | `/home/visitor/devmanfre` |
| anything else | `command not found: <cmd> — try 'help'` |

The `matrix-burst` event is a window-level `CustomEvent` contract between the terminal (dispatcher) and `LetterGlitch` (listener) — no shared state, so either component works without the other.

</details>

## Development

### Tech Stack

| Layer | Choice |
|---|---|
| Framework | [Next.js 15](https://nextjs.org) (App Router, Turbopack dev server) |
| UI library | [React 19](https://react.dev) — Server Components by default, `"use client"` only where needed |
| Language | TypeScript (strict) |
| Styling | [Tailwind CSS 3.4](https://tailwindcss.com) + CSS-variable theme tokens |
| UI primitives | [shadcn/ui](https://ui.shadcn.com) (Radix UI) — managed via the shadcn CLI, not hand-edited |
| Animations | [Motion / Framer Motion](https://motion.dev), vendored [Magic UI](https://magicui.design) & [ReactBits](https://reactbits.dev) components (the latter via [jsrepo](https://jsrepo.dev), see `jsrepo.json`) |
| i18n | [next-intl 4](https://next-intl.dev) |
| Theming | [next-themes](https://github.com/pacocoursey/next-themes) |
| Hosting | [Netlify](https://netlify.com) |
| Analytics | [Umami Cloud](https://umami.is) (optional) |

### Project Structure

```
src/
├── app/
│   ├── [locale]/              # localized routes (en / it)
│   │   ├── layout.tsx         # JSON-LD, glitch background, theme toggle
│   │   ├── page.tsx           # THE page — all sections live here
│   │   └── opengraph-image.tsx
│   ├── layout.tsx             # root: metadata, ThemeProvider, next-intl, Umami
│   ├── not-found.tsx          # animated 404
│   ├── globals.css            # theme tokens (CSS variables)
│   ├── robots.ts / sitemap.ts
├── components/
│   ├── ui/                    # shadcn/ui primitives (CLI-managed — don't hand-edit)
│   ├── magicui/               # vendored animation components (terminal, blur-fade)
│   ├── reactbits/             # vendored via jsrepo (LetterGlitch, TrueFocus)
│   └── *.tsx                  # custom components (interactive-terminal,
│                              #   github-section, codepen-*, project-card, …)
├── data/
│   └── resume.tsx             # ⭐ single source of truth for ALL content
├── i18n/                      # next-intl routing / request config
├── lib/                       # pure modules, unit-tested (vitest)
│   ├── utils.ts               # cn() + formatDate()/formatPeriod()
│   ├── terminal/commands.ts   # command registry (thin component adapter)
│   ├── analytics.ts           # typed Umami event catalog (trackEvent, eventAttrs)
│   ├── matrix-burst.ts        # owns the matrix-burst window event
│   ├── github.ts              # GitHub fetcher (disabled | error | ok status)
│   ├── github-stats.ts        # pure GitHub stats aggregations
│   └── section-sequence.ts    # page section order (drives animation delays)
└── middleware.ts              # locale-detection middleware
public/
├── locales/en.json, it.json   # UI chrome strings (key sets must match)
├── resumes/resume-{en,it}.pdf # downloadable CVs (exported externally)
└── img/                       # avatar, work/education logos, project screenshots
```

### Getting Started

Requires **Node.js 20+** and npm.

```bash
git clone https://github.com/DevManfre/web-portfolio.git
cd web-portfolio
npm install
npm run dev          # dev server with Turbopack → http://localhost:3000
```

| Script | Purpose |
|---|---|
| `npm run dev` | Development server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint (`next/core-web-vitals` + `next/typescript`) |
| `npm run typecheck` | `tsc --noEmit` |
| `npm test` | Vitest — unit tests for the pure modules in `src/lib/` |

Unit tests (Vitest) cover the pure modules only (terminal commands, analytics catalog, burst state machine, GitHub stats, section sequence, date formatting). No component/E2E tests. Lint + typecheck + test + build in CI are the quality gate.

### Environment Variables

Both variables are **optional** — the site builds and runs without them; the related features simply switch off.

| Variable | Where | Purpose |
|---|---|---|
| `GITHUB_TOKEN` | `.env.local` locally, Netlify dashboard in production | Classic PAT with the `read:user` scope. Enables the GitHub Activity section (GraphQL API). Missing/invalid → section silently hidden. CI builds without it by design. |
| `NEXT_PUBLIC_UMAMI_WEBSITE_ID` | Netlify dashboard (optionally `.env.local` to test) | Umami website ID. When unset the analytics `<script>` is simply not rendered — no tracking in dev/CI. |

## Management & Operations

### Managing Content

Almost everything you see on the page comes from **`src/data/resume.tsx`** (the `DATA` const, typed `as const`):

| What | Where | Notes |
|---|---|---|
| Name, tagline, summary, avatar | `DATA.name/description/summary/avatarUrl` | Long-form fields are `{ en, it }` objects |
| Terminal intro script | `DATA.terminal` | Alternating lines: even indexes are typed, odd indexes appear as green output |
| Skills | `DATA.skills` | Auto-sorted alphabetically |
| Socials & contact | `DATA.contact` | Feeds hero icons, terminal `contact`, JSON-LD `sameAs` |
| Work / education / certifications | `DATA.work/education/certifications` | Logos in `public/img/…` (webp) |
| Spoken languages | `DATA.languages` | Bilingual name + level |
| Projects | `DATA.projects` | Image in `public/img/projects/`, tech badges, links array |
| CodePen pens | `DATA.codepens` | `{ title, slug }` — the slug is the last path segment of `codepen.io/devmanfre/pen/<slug>`. Hand-curated (no public CodePen API). |
| UI chrome strings | `public/locales/en.json` + `it.json` | next-intl messages — key sets must stay identical |

**After changing CV data, regenerate `public/resumes/resume-en.pdf` and `resume-it.pdf`** — they are exported externally, not generated by the build.

Repo-specific [Claude Code](https://claude.com/claude-code) skills automate the common edits — see [AI-Assisted Maintenance](#ai-assisted-maintenance).

### Internationalization (i18n)

- Locales: `en` (default) and `it`, path-prefixed (`/en`, `/it`); middleware redirects `/` by `Accept-Language`.
- **Rule: every user-facing string must exist in both languages** — content as `{ en, it }` objects in `resume.tsx`, UI strings as the same key in both locale JSON files.
- SEO follows along: `hreflang` alternates, per-locale OG metadata (`en_US` / `it_IT`), both locales in the sitemap.

### Analytics

Umami (cookieless, GDPR-friendly) loads only when `NEXT_PUBLIC_UMAMI_WEBSITE_ID` is set. Custom events:

| Event | Fired by |
|---|---|
| `cv-download` (`source: hero \| terminal`) | CV button in the hero / `cv` terminal command |
| `social-github` / `social-linkedin` / `social-codepen` / `social-email` | Hero social icon row |
| `contact-linkedin` / `contact-email` | Contact section buttons |
| `codepen-view-profile` | CodePen profile link |
| `theme-toggle` | Light/dark switch |
| `terminal-used` | First terminal command of a visit |
| `matrix-egg` | `sudo matrix` easter egg |

Static elements use `data-umami-event` attributes; programmatic events go through the safe `trackEvent()` wrapper in `src/lib/analytics.ts` (no-op when Umami is absent).

### External Services

| Service | Role | Config lives in |
|---|---|---|
| **Netlify** | Hosting + deploys of `production` (site) — deploy config only in the Netlify dashboard, nothing committed | Netlify dashboard |
| **GitHub GraphQL API** | Data for the GitHub Activity section | `GITHUB_TOKEN` env var |
| **Umami Cloud** | Analytics (`cloud.umami.is/script.js`) | `NEXT_PUBLIC_UMAMI_WEBSITE_ID` env var |
| **CodePen** | Embedded pen iframes (`codepen.io/<user>/embed/preview/<slug>`) | `DATA.codepens` |
| **GitHub Actions** | CI quality gate | `.github/workflows/ci.yml` |
| **capsule-render / shields.io** | README header art and badges | this file |

### Deployment & CI

- **Branches:** work happens on `development`; `production` is the release branch, updated only by merging `development` into it. Netlify deploys the site from `production`.
- **CI (GitHub Actions):** on every push/PR to `development` or `production` — `npm ci` → `lint` → `typecheck` → `test` → `build` (Node 20).
- ⚠️ ESLint errors are **ignored during builds** (`ignoreDuringBuilds: true` in `next.config.ts`), so CI lint is the real gate — keep it green.

### Git Workflow

Commit messages use a Unicode gitmoji prefix + a short English message:

| Emoji | Meaning |
|---|---|
| ✨ | feature |
| 🔧 | config |
| 🗃️ | data (`resume.tsx`) |
| 💄 | UI / style |
| 🌐 | i18n |
| 🐛 | fix |
| ♻️ | refactor |
| 📝 | docs |
| 🚧 | WIP |

### AI-Assisted Maintenance

The repo ships with a `CLAUDE.md` playbook and project-scoped [Claude Code](https://claude.com/claude-code) skills in `.claude/skills/`:

| Skill | Use |
|---|---|
| `add-project` | Add a project to the portfolio |
| `update-cv` | Update work experience, education, or skills |
| `update-resume-data` | Edit any other `DATA` content (bio, socials, terminal intro, …) |
| `update-locales` | Add/edit/remove UI strings in both locale files |
| `i18n-check` | Audit English/Italian parity |
| `update-readme` | Keep this README and `README.it.md` in sync with the code |
| `release` | Pre-flight checks, then merge `development` → `production` |

### License

[MIT](LICENSE) © Alessio Manfredini

![footer](https://capsule-render.vercel.app/api?type=waving&color=898380&section=footer)
