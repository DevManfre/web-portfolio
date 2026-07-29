# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Project

Personal portfolio / CV site for Alessio Manfredini (DevManfre). Single page,
bilingual (English/Italian), dark theme by default. Live at
https://devmanfre.netlify.app — hosted on Netlify, deploy config lives only in
the Netlify dashboard (nothing committed).

## Commands

- `npm run dev` — dev server (turbopack)
- `npm run build` — production build
- `npm run lint` — ESLint (next/core-web-vitals + next/typescript)
- `npm run typecheck` — `tsc --noEmit`
- `npm test` — vitest (unit tests for the pure modules in `src/lib/`)

Unit tests (vitest) cover the pure modules only (terminal commands, analytics
catalog, burst state machine, GitHub stats, section sequence, date
formatting). No component/E2E tests.

## Architecture

Next.js 15 App Router, React 19, TypeScript strict, Tailwind CSS 3.4.

- `src/data/resume.tsx` — single source of truth for ALL portfolio content
  (`DATA` const). Long-form fields are bilingual objects: `{ en: "...", it: "..." }`.
- `public/locales/en.json` + `it.json` — UI chrome strings (next-intl
  messages). Key sets must stay identical between the two files.
- `src/app/[locale]/` — path-based i18n routing (next-intl; locales `en`/`it`,
  default `en`). Config in `src/i18n/`, middleware in `src/middleware.ts`.
- `src/app/layout.tsx` — root layout: ThemeProvider (next-themes, dark
  default) + NextIntlClientProvider.
- `src/components/ui/` — shadcn/ui primitives. Managed via the shadcn CLI;
  avoid hand-editing.
- `src/components/magicui/` + `src/components/reactbits/` — vendored animation
  components (jsrepo, see `jsrepo.json`).
- `src/components/*.tsx` — custom components (navbar, project-card,
  resume-card, mode-toggle, …).
- `src/lib/utils.ts` — `cn()` (clsx + tailwind-merge) and `formatDate()`.
- `src/lib/` — pure modules with unit tests: `terminal/commands.ts` (command
  registry; the terminal component is a thin adapter), `analytics.ts` (typed
  Umami event catalog: `trackEvent` + `eventAttrs`), `matrix-burst.ts` (owns
  the `matrix-burst` window event), `github.ts` (returns a
  `disabled | error | ok` status union) + `github-stats.ts`,
  `section-sequence.ts` (page order; animation delays derive from it).

## Conventions

- Kebab-case filenames for components (`project-card.tsx`).
- `@/` path alias → `src/`.
- Server Components by default; add `"use client"` only when required.
- 4-space indentation in hand-written files.
- Merge Tailwind classes with `cn()`.
- Theme tokens are CSS variables in `src/app/globals.css`, mapped to semantic
  colors in `tailwind.config.ts`.

## i18n rule (important)

Every user-facing string MUST exist in both English and Italian:

- Content in `resume.tsx` → `{ en, it }` objects.
- UI strings → the same key in both `public/locales/en.json` and `it.json`.

## README maintenance (important)

`README.md` (EN, GitHub default) and `README.it.md` (IT) are mirrored docs.
Whenever a change alters what the site does or how the repo works — features,
page sections, terminal commands/easter eggs, analytics events, env vars,
external services, npm scripts, project structure, Claude skills, or
workflows — and before every release, use the `update-readme` skill to update
BOTH files in sync. Content-only edits (resume data, locale strings, new pens)
do not require it.

## Git workflow

- Work on `development`. `production` is the release branch — updated only by
  merging `development` into it.
- Commit messages: Unicode gitmoji prefix + short English message.
  ✨ feature · 🔧 config · 🗃️ data (resume.tsx) · 💄 UI/style · 🌐 i18n ·
  🐛 fix · ♻️ refactor · 📝 docs · 🚧 WIP

## Gotchas

- ESLint errors are ignored during builds (`ignoreDuringBuilds: true` in
  `next.config.ts`). GitHub Actions CI is the quality gate — keep
  `npm run lint` green.
- `public/resumes/resume-en.pdf` and `resume-it.pdf` are exported externally;
  remind the user to regenerate them whenever CV data changes.
- The GitHub section (`src/components/github-section.tsx`) needs a
  `GITHUB_TOKEN` env var (classic PAT, scope `read:user`) — in `.env.local`
  locally and in the Netlify dashboard in production. Without it (or on any
  API failure) the section is silently hidden; CI builds without it by design.
- Umami analytics load only when `NEXT_PUBLIC_UMAMI_WEBSITE_ID` is set
  (Netlify env var; optionally `.env.local` for testing). Without it the
  script tag is simply not rendered — no tracking in dev/CI.
