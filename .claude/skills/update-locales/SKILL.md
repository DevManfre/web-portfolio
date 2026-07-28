---
name: update-locales
description: Add, edit, rename, or remove UI strings in public/locales/en.json and it.json. Use when changing navbar labels, buttons, section titles, or any next-intl message key.
---

# Update Locales

Edits the next-intl message files `public/locales/en.json` and
`public/locales/it.json`. Key sets MUST stay identical between the two files —
every change is applied to both in the same edit session.

## Scope check first

- UI chrome strings (labels, buttons, headings, 404 text) → locale JSON. ✅
- Portfolio content (bio, job descriptions, project text) → `{ en, it }`
  objects in `src/data/resume.tsx`, NOT here. Use the `update-cv` or
  `add-project` skill instead.

## Namespaces

| Namespace | Consumer |
|---|---|
| `HomePage` | `src/app/[locale]/page.tsx` (`getTranslations("HomePage")`) |
| `CardResume` | `src/components/resume-card.tsx` |
| `PageNotFound` | `src/app/not-found.tsx` |

New namespace = also wire `useTranslations("Name")` (client) or
`getTranslations("Name")` (server) in the consuming component.

## Checklist

1. Make the change in `en.json` AND `it.json` together. If the user provides
   only one language, translate the other and show both for confirmation.
2. Renaming or removing a key: grep `src/` for `t("key")` usages and update
   every caller — next-intl fails at runtime on missing keys, not at build.
3. Verify parity: run the key-set comparison from the `i18n-check` skill
   (no output = OK).
4. If a component changed, `npm run typecheck` must pass; spot-check the
   string on both `/en` and `/it` in the dev server when visible.
5. Commit on `development`: `🌐 <short message>` (e.g. `🌐 Add hero CTA labels`).
