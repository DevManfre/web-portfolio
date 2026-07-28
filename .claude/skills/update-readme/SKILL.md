---
name: update-readme
description: Use after any change that alters what the site does or how the repo works — features, sections, terminal commands/easter eggs, analytics events, env vars, external services, npm scripts, project structure, Claude skills, or workflows — and before releases, to keep README.md (English) and README.it.md (Italian) accurate and in sync.
---

# Update README

`README.md` (EN, GitHub default) and `README.it.md` (IT) are mirrors: same
sections in the same order, same tables with the same rows. Every edit lands
in **both** files. The IT file is a translation, not a rewrite — code
identifiers, event names, commands, paths, and URLs stay byte-identical.

Structure: three H2 blocks — The Site / Development / Management & Operations
(IT: Il sito / Sviluppo / Gestione e operazioni) — with H3 sections inside;
the grouped TOC mirrors them. New sections go inside the right block, in both
files and both TOCs.

## Procedure

1. Diff the change (or `git diff production...development` before a release).
2. Find the affected rows in the mapping table below.
3. Edit the EN section, then apply the mirrored edit to the IT section.
4. Run the sync checks.

## Change → section mapping

| Change touches | Update sections (both files) |
|---|---|
| New/removed page section, visual or UX behavior | Features |
| `interactive-terminal.tsx` `runCommand()` | Terminal — documented-commands table and/or easter-eggs table; intro block if `DATA.terminal` changed |
| `data-umami-event` attributes or `trackEvent()` calls | Analytics events table |
| `process.env.*` usage | Environment Variables + External Services |
| New external API/embed/service | External Services; Features if user-visible |
| `package.json` scripts or major deps | Getting Started scripts table; Tech Stack |
| Files/dirs added, moved, removed | Project Structure tree |
| `DATA` shape in `resume.tsx` (new field, e.g. `codepens`) | Managing Content table |
| `.claude/skills/` added/renamed/removed | AI-Assisted Maintenance table |
| CI workflow, branch model, deploy config | Deployment & CI |
| Locale routing or i18n rules | Internationalization |

Content-only edits (new job entry, new pen, translated string) do **not**
require a README update — the READMEs document mechanisms, not content.

## Source of truth per section

Regenerate from code, never from memory:

- Terminal commands: `runCommand()` in `src/components/interactive-terminal.tsx`
- Analytics events: `grep -rn "data-umami-event\|trackEvent(" src`
- Env vars: `grep -rn "process.env" src next.config.ts`
- Skills table: `ls .claude/skills/`
- Scripts table: `package.json`

## Sync checks

```bash
# Same heading skeleton, blocks + sections (counts must match)
grep -Ec '^#{2,3} ' README.md README.it.md
# Same table shape (row counts must match)
grep -c '^|' README.md README.it.md
```

Counts differ → find the missing mirror edit before committing.

Commit with the 📝 gitmoji prefix (or fold into the feature commit).
