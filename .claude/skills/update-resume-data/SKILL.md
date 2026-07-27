---
name: update-resume-data
description: Edit the DATA object in src/data/resume.tsx — bio, summary, contact info, social links, certifications, languages, avatar, site URL, terminal intro. Use when portfolio content changes outside of work/education/skills or projects.
---

# Update Resume Data

Edits `src/data/resume.tsx`, the single source of truth for all portfolio
content (`DATA` const, TypeScript strict).

## Scope check first

- `work[]`, `education[]`, `skills[]` → use the `update-cv` skill.
- `projects[]` → use the `add-project` skill.
- UI chrome strings (labels, buttons) → use the `update-locales` skill.
- Everything else in `DATA` → this skill.

## Field map

| Field | Shape | Notes |
|---|---|---|
| `name`, `initials`, `username`, `url` | plain string | `url` feeds metadata, sitemap, robots, OG image — check those after changing it |
| `description`, `summary` | `{ en, it }` | both languages required |
| `terminal` | `string[]` | fake terminal intro lines, NOT translated |
| `avatarUrl` | path string | file under `public/img/` |
| `contact.email`, `contact.tel` | plain string | `email` is duplicated in `contact.social.email.url` (`mailto:`) — keep in sync |
| `contact.social.*` | `{ name, url, icon, navbar }` | `icon` from `Icons.*` (`@/components/icons`) — new platform = add icon there first; `navbar: true` shows it in the navbar |
| `certifications[]` | `{ name, issuer, href, logoUrl, start, end, badge }` | monolingual; logos under `public/img/education/` |
| `languages[]` | `{ name: {en,it}, level: {en,it} }` | both languages required |

## Checklist

1. Locate the field and match the existing entry shape exactly.
2. Every translatable field is a `{ en, it }` object — if the user provides
   one language, translate the other and show both for confirmation.
3. `DATA` is consumed by `navbar.tsx`, `page.tsx`, `layout.tsx` (metadata/
   JSON-LD), `sitemap.ts`, `robots.ts`, `opengraph-image.tsx` — grep
   `DATA.<field>` when unsure who reads a changed field.
4. Verify: `npm run typecheck` passes; spot-check `/en` and `/it` in the dev
   server when the change is visible.
5. If the change belongs on the CV (contact, certifications, languages),
   remind the user: `public/resumes/resume-en.pdf` and `resume-it.pdf` are
   exported externally and now out of date.
6. Commit on `development`: `🗃️ <short message>` (e.g. `🗃️ Update bio and contact email`).
