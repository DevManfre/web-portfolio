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
