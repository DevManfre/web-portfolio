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
