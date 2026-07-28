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
