# Claude Code Setup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add Claude Code project configuration to the web-portfolio repo: `CLAUDE.md`, four custom skills, a GitHub Actions CI workflow, and persistent memory of conventions.

**Architecture:** Pure configuration/documentation change — no runtime code except a 2-line type fix in `src/components/mdx.tsx` (required so the new CI lint gate starts green). All work happens on the `development` branch. CI enforces lint + typecheck + build; `ignoreDuringBuilds` in `next.config.ts` is intentionally left untouched.

**Tech Stack:** Next.js 15 (App Router), TypeScript 5 strict, ESLint (flat config, `next/core-web-vitals` + `next/typescript`), GitHub Actions, Claude Code skills (`.claude/skills/*/SKILL.md`).

## Global Constraints

- All deliverables written in **English** (repo is public).
- All commits on branch `development`, message format: Unicode gitmoji + short English message (✨ feature, 🔧 config, 🗃️ data, 💄 UI, 🌐 i18n, 🐛 fix, ♻️ refactor, 📝 docs).
- 4-space indentation in hand-written files; 2-space in YAML and JSON.
- No new npm dependencies.
- Do NOT remove `eslint.ignoreDuringBuilds: true` from `next.config.ts` (out of scope per spec).
- No test framework exists and none is added; verification = `npm run lint`, `npm run typecheck`, `npm run build`.
- Baseline state (verified 2026-07-27): `npx tsc --noEmit` exits 0; `npm run lint` fails with exactly 2 errors (`@typescript-eslint/no-explicit-any` in `src/components/mdx.tsx` at 27:28 and 45:30).

---

### Task 1: Fix the two `no-explicit-any` lint errors in mdx.tsx

CI (Task 2) runs `npm run lint`; it currently fails. Minimal typing fix, no behavior change.

**Files:**
- Modify: `src/components/mdx.tsx:1` (import), `src/components/mdx.tsx:27-47` (two function signatures)

**Interfaces:**
- Consumes: nothing from other tasks.
- Produces: a green `npm run lint`, which Task 2's CI and Task 4's release skill rely on.

- [ ] **Step 1: Update the Image import**

In `src/components/mdx.tsx`, change line 1:

```tsx
import Image, { ImageProps } from "next/image";
```

- [ ] **Step 2: Type CustomLink**

Replace line 27 (`function CustomLink(props: any) {`) and the `href` line with:

```tsx
function CustomLink(props: React.ComponentPropsWithoutRef<"a">) {
    const href = props.href ?? "";
```

Leave the rest of the function body unchanged.

- [ ] **Step 3: Type RoundedImage**

Replace lines 45-47 with:

```tsx
function RoundedImage(props: ImageProps) {
    return <Image className="rounded-lg" {...props} />;
}
```

(The old explicit `alt={props.alt}` becomes redundant: `ImageProps` makes `alt` required and it arrives via the spread.)

- [ ] **Step 4: Verify lint and typecheck pass**

Run: `npm run lint && npx tsc --noEmit`
Expected: lint prints `✔ No ESLint warnings or errors` (or no output) and exits 0; tsc exits 0.

- [ ] **Step 5: Commit**

```bash
git add src/components/mdx.tsx
git commit -m "♻️ Replace explicit any with proper types in mdx components"
```

---

### Task 2: Add `typecheck` script and GitHub Actions CI workflow

**Files:**
- Modify: `package.json` (scripts block, currently lines 5-10)
- Create: `.github/workflows/ci.yml`

**Interfaces:**
- Consumes: green lint from Task 1.
- Produces: `npm run typecheck` command (used by Task 4's release skill and referenced in Task 3's CLAUDE.md); CI on pushes/PRs to `development` and `production`.

- [ ] **Step 1: Add typecheck script to package.json**

In `package.json`, add to the `"scripts"` object after `"lint"`:

```json
"typecheck": "tsc --noEmit"
```

Resulting scripts block:

```json
"scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit"
}
```

- [ ] **Step 2: Create the workflow**

Create `.github/workflows/ci.yml`:

```yaml
name: CI

on:
  push:
    branches: [development, production]
  pull_request:
    branches: [development, production]

jobs:
  checks:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run lint
      - run: npm run typecheck
      - run: npm run build
```

- [ ] **Step 3: Verify locally**

Run: `npm run typecheck && npm run build`
Expected: both exit 0 (build prints the Next.js route summary table).

- [ ] **Step 4: Commit**

```bash
git add package.json .github/workflows/ci.yml
git commit -m "🔧 Add typecheck script and GitHub Actions CI workflow"
```

---

### Task 3: Write CLAUDE.md

**Files:**
- Create: `CLAUDE.md` (repo root)

**Interfaces:**
- Consumes: `npm run typecheck` from Task 2 (documented in Commands).
- Produces: project guidance file; the skills in Task 4 assume its conventions (gitmoji map, bilingual rule).

- [ ] **Step 1: Create CLAUDE.md with exactly this content**

```markdown
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

There are no tests and no test runner.

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
```

- [ ] **Step 2: Verify accuracy**

Cross-check each command in the Commands section against `package.json` scripts (all five must exist after Task 2). Confirm the paths named in Architecture exist (`src/data/resume.tsx`, `public/locales/en.json`, `src/i18n/`, `src/middleware.ts`).

- [ ] **Step 3: Commit**

```bash
git add CLAUDE.md
git commit -m "📝 Add CLAUDE.md with project guidance for Claude Code"
```

---

### Task 4: Create the four skills

**Files:**
- Create: `.claude/skills/add-project/SKILL.md`
- Create: `.claude/skills/update-cv/SKILL.md`
- Create: `.claude/skills/i18n-check/SKILL.md`
- Create: `.claude/skills/release/SKILL.md`

**Interfaces:**
- Consumes: `npm run typecheck` (Task 2), conventions from CLAUDE.md (Task 3).
- Produces: user-invocable `/add-project`, `/update-cv`, `/i18n-check`, `/release`.

- [ ] **Step 1: Create `.claude/skills/add-project/SKILL.md`**

```markdown
---
name: add-project
description: Add a new project to the portfolio. Use when the user wants to add a project, side project, or work sample to the site.
---

# Add Project

Adds an entry to `DATA.projects` in `src/data/resume.tsx`.

## Checklist

1. Gather from the user: title, href (live URL), dates (format
   `"Month YYYY - Month YYYY"` or `"Month YYYY - Present"`), `active`
   (boolean), technologies (string array), links (website / source URL),
   image and/or video.
2. Descriptions are required in BOTH English and Italian. If the user
   provides only one language, translate to the other and show both for
   confirmation before writing.
3. Image: must be a `.webp` under `public/img/projects/`. If the user
   provides a png/jpg, convert it first (e.g. `cwebp -q 80 in.png -o
   public/img/projects/<name>.webp`) or ask the user to.
4. Open `src/data/resume.tsx`, find `projects:` and copy the exact shape of
   an existing entry — including the `description: { en: "...", it: "..." }`
   object, `technologies: [...]`, and `links: [{ type, href, icon }]` with
   the same icon JSX used by existing entries.
5. Verify: `npm run typecheck` passes; optionally `npm run dev` and check
   both `/en` and `/it` render the new card.
6. Commit on `development`:
   `🗃️ Add <title> project to data`

## Rules

- Never invent content: ask for real descriptions and URLs.
- Keep entry order consistent with the existing list (newest first unless
  the user says otherwise).
```

- [ ] **Step 2: Create `.claude/skills/update-cv/SKILL.md`**

```markdown
---
name: update-cv
description: Update work experience, education, or skills in the portfolio CV. Use when the user changes jobs, finishes a degree, or wants to add/remove skills.
---

# Update CV

Edits `work[]`, `education[]`, or `skills[]` in `src/data/resume.tsx`.

## Checklist

1. Identify which array changes: `work`, `education`, or `skills`.
2. For `work` and `education` entries every translatable field is a
   `{ en, it }` object (e.g. `title`, `description`, degree names). Both
   languages are required — translate and confirm if the user provides one.
3. Match the existing entry shape exactly (company, href, badges, location,
   title, logoUrl, start, end, description for work entries). Logos live
   under `public/img/work/` and `public/img/education/`.
4. `skills` is a flat string array — no translation needed.
5. Verify: `npm run typecheck` passes; check both `/en` and `/it` locally
   if the change is visible.
6. Remind the user: `public/resumes/resume-en.pdf` and `resume-it.pdf` are
   exported externally and now out of date — they must regenerate and
   replace both files.
7. Commit on `development`:
   `🗃️ Update <work|education|skills> in resume data`
```

- [ ] **Step 3: Create `.claude/skills/i18n-check/SKILL.md`**

````markdown
---
name: i18n-check
description: Verify English/Italian translation parity across the site. Use before releases or after content edits.
---

# i18n Check

Read-only audit. Report findings; fix only if the user asks.

## Checks

1. **Locale JSON parity** — compare key sets recursively:

   ```bash
   diff <(jq -S 'paths(scalars) | join(".")' public/locales/en.json | sort) \
        <(jq -S 'paths(scalars) | join(".")' public/locales/it.json | sort)
   ```

   Any diff line = missing key in one locale.

2. **Bilingual fields in resume.tsx** — read `src/data/resume.tsx` and check
   every `{ en: ..., it: ... }` object has BOTH keys non-empty. Grep helper
   to find candidates:

   ```bash
   grep -n "en:" src/data/resume.tsx
   grep -n "it:" src/data/resume.tsx
   ```

   Counts should match; then eyeball each object for empty strings.

3. **Monolingual leaks** — scan `resume.tsx` for user-facing string fields
   that are plain strings where sibling entries use `{ en, it }` objects
   (e.g. a `description` set to a bare string).

## Output

A short report: ✅ per check, or a list of `file → missing locale/key`.
Do not modify anything unless the user asks for fixes afterwards.
````

- [ ] **Step 4: Create `.claude/skills/release/SKILL.md`**

````markdown
---
name: release
description: Release to production — pre-flight checks then merge development into production. Use when the user wants to deploy/release.
---

# Release

Merges `development` into `production`. Netlify deploys from the pushed
result; GitHub Actions runs CI on both branches.

## Pre-flight (all on `development`, all must pass)

1. `git status` — working tree must be clean; stop if not.
2. `git pull` on `development` (fast-forward only).
3. `npm run lint` — must exit 0.
4. `npm run typecheck` — must exit 0.
5. `npm run build` — must exit 0.

If ANY step fails: STOP. Report the failing command and its output. Do not
merge.

## Release

```bash
git checkout production
git pull --ff-only
git merge development --no-edit
git push origin production
git checkout development
git push origin development
```

## After

- Confirm the CI run on `production` is green (`gh run watch` or the
  Actions tab).
- Netlify picks up the push automatically; nothing else to do.
````

- [ ] **Step 5: Verify skill files**

Run: `ls .claude/skills/*/SKILL.md`
Expected: the four paths print. Check each file's frontmatter has `name` and `description`.

- [ ] **Step 6: Commit**

```bash
git add .claude/skills
git commit -m "🔧 Add Claude Code skills: add-project, update-cv, i18n-check, release"
```

---

### Task 5: Save persistent memory (not committed — lives outside the repo)

**Files:**
- Create: `/home/devmanfre/.claude/projects/-home-devmanfre-Progetti-web-portfolio/memory/user-preferences.md`
- Modify: `/home/devmanfre/.claude/projects/-home-devmanfre-Progetti-web-portfolio/memory/MEMORY.md` (append index line)

**Interfaces:**
- Consumes: nothing.
- Produces: cross-session recall of user preferences. (Repo conventions are NOT duplicated here — CLAUDE.md from Task 3 records those.)

- [ ] **Step 1: Write the memory file**

Create `user-preferences.md` in the memory directory:

```markdown
---
name: user-preferences
description: How Alessio prefers Claude to communicate and work in this repo
metadata:
  type: user
---

Alessio Manfredini (DevManfre) — Italian solo dev, portfolio repo owner.

- Speaks Italian; asks questions in Italian. Reply in Italian unless writing
  repo artifacts (code, commits, docs are English — repo is public).
- Uses the caveman plugin (terse responses); keep answers compact.
- Repo conventions (gitmoji, development→production flow, bilingual en/it
  rule) are recorded in the repo's CLAUDE.md — follow it, don't duplicate.
```

- [ ] **Step 2: Update MEMORY.md index**

Append line:

```markdown
- [User preferences](user-preferences.md) — Italian replies, terse style, repo artifacts in English
```

- [ ] **Step 3: Verify**

Read both files back; index line points at an existing file. Nothing to commit (memory lives outside the repo).

---

### Task 6: Push and verify CI

**Files:** none (git + GitHub only).

**Interfaces:**
- Consumes: all commits from Tasks 1-4.
- Produces: green CI run on `development` — the spec's acceptance criterion.

- [ ] **Step 1: Push development**

```bash
git push origin development
```

- [ ] **Step 2: Watch the CI run**

```bash
gh run watch --exit-status
```

Expected: the `CI` workflow completes with conclusion `success` (lint, typecheck, build all green). If `gh` is unavailable, check the Actions tab and report the URL.

- [ ] **Step 3: Report**

Tell the user: commits pushed, CI green (link), setup complete. Releasing to `production` stays manual via `/release`.
