# Claude Code Setup — Design

**Date:** 2026-07-27
**Status:** Approved
**Scope:** Add Claude Code project configuration to the web-portfolio repo: `CLAUDE.md`, four custom skills, a GitHub Actions CI workflow, and persistent memory of conventions.

## Context

Solo personal portfolio (Alessio Manfredini, github.com/DevManfre). Next.js 15 App Router, React 19, TypeScript strict, Tailwind CSS 3.4, shadcn/ui + magicui + reactbits (vendored via jsrepo), next-intl (en/it), next-themes (dark default). Hosted on Netlify (dashboard-only config).

Git history analysis (354 commits, 2023–2025) shows the routine work is: styling tweaks, component refactors, adding projects to `src/data/resume.tsx`, and keeping en/it translations in sync. Branching is `development` → `production` (merge = release). Commits use Unicode gitmoji with English messages.

Current gaps: no tests, no CI, ESLint disabled during builds (`ignoreDuringBuilds: true` in `next.config.ts`), no AI/agent configuration of any kind.

## Deliverables

### 1. `CLAUDE.md` (repo root, English, ~80 lines)

Sections:

- **Overview** — personal portfolio site, single page CV/resume, live at devmanfre.netlify.app.
- **Commands** — `npm run dev` (turbopack), `npm run build`, `npm run lint`, `npm run typecheck` (new script, `tsc --noEmit`). State explicitly that there are no tests.
- **Architecture map**:
  - `src/data/resume.tsx` — single source of truth for all portfolio content (`DATA` const, bilingual `{en, it}` fields).
  - `public/locales/{en,it}.json` — UI chrome strings (next-intl messages).
  - `src/app/[locale]/` — path-based i18n routing; root `layout.tsx` holds ThemeProvider (dark default).
  - `src/components/ui/` — shadcn components (managed via CLI, avoid hand-editing).
  - `src/components/magicui/`, `src/components/reactbits/` — vendored animation components (jsrepo).
  - `src/components/*.tsx` — custom components (navbar, project-card, resume-card, …).
- **Conventions** — kebab-case filenames, `@/` path alias, RSC by default with `"use client"` only where needed, 4-space indent, `cn()` from `@/lib/utils` for class merging.
- **i18n rule** — every new piece of content MUST ship in both English and Italian: `{en, it}` fields in `resume.tsx`, mirrored keys in both `locales/*.json`.
- **Git workflow** — work on `development`; `production` is the release branch, updated only by merging `development`. Commit format: Unicode gitmoji + English message. Emoji map: ✨ feature, 🔧 config, 🗃️ data, 💄 UI/style, 🌐 i18n, 🐛 fix, ♻️ refactor, 📝 docs, 🚧 WIP.
- **Gotchas** — ESLint errors ignored during builds (CI is the quality gate); Netlify deploy config lives only in the dashboard, nothing committed.

### 2. Skills — `.claude/skills/<name>/SKILL.md`

Four skills, English, each a short procedural checklist:

- **add-project** — gather title, href, active dates, technologies, links; require or translate descriptions into both en and it; guide image placement as `.webp` under `public/img/projects/`; append entry to `DATA.projects` in `src/data/resume.tsx` matching the existing shape; commit as `🗃️ Add <name> project to data`.
- **update-cv** — update `work[]` / `education[]` / `skills[]` in `resume.tsx`, both locales required; remind the user that `public/resumes/resume-en.pdf` and `resume-it.pdf` are generated externally and must be re-exported to match; commit as `🗃️`.
- **i18n-check** — diff key sets of `public/locales/en.json` vs `it.json`; scan `resume.tsx` for `{en, it}` objects with a missing or empty locale and for user-facing strings that bypass the bilingual pattern. Report findings only; fix only when asked.
- **release** — pre-flight on `development`: `npm run lint`, `npm run typecheck`, `npm run build` must all pass; abort with a report if anything fails. Then merge `development` into `production` and push both branches.

### 3. CI — `.github/workflows/ci.yml`

- Trigger: `push` and `pull_request` on `development` and `production`.
- Single job, Node 20, `actions/checkout` + `actions/setup-node` with npm cache: `npm ci` → `npm run lint` → `npm run typecheck` → `npm run build`.
- Add `"typecheck": "tsc --noEmit"` to `package.json` scripts.
- `ignoreDuringBuilds` stays in `next.config.ts` so Netlify deploys keep working even if lint regresses; CI is the enforcement point.

### 4. Persistent memory

Save to Claude's user-level memory (not the repo): gitmoji + branching conventions, bilingual-content rule, stack summary, and the user's interaction preferences (Italian, terse/caveman responses).

## Out of scope

- Test framework setup (no tests exist; adding them is a separate project).
- Removing `ignoreDuringBuilds` / fixing any existing lint debt.
- Netlify configuration as code.
- Restructuring the dual i18n mechanism (JSON files vs inline `{en, it}`).

## Error handling

- **release skill**: any red check aborts the merge; report the failing output and stop.
- **i18n-check**: read-only by default; never auto-fixes.
- **CI**: failures block nothing locally (no hooks) but mark the commit red on GitHub — intentional for a solo workflow.

## Testing / verification

- CLAUDE.md: no runtime behavior; verified by review.
- Skills: dry-run each once (e.g. add a throwaway project, run i18n-check, run release pre-flight without pushing).
- CI: verified by the first push to `development` producing a green run.
