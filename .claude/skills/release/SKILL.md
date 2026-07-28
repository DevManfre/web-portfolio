---
name: release
description: Release to production — pre-flight checks then merge development into production. Use when the user wants to deploy/release.
---

# Release

Merges `development` into `production`. Netlify deploys from the pushed
result; GitHub Actions runs CI on both branches.

## Pre-flight (all on `development`, all must pass)

1. `git status` — working tree must be clean; stop if not.
2. `git pull --ff-only` on `development`.
3. `npm run lint` — must exit 0.
4. `npm run typecheck` — must exit 0.
5. `npm run build` — must exit 0.
6. README sync — `grep -Ec '^#{2,3} ' README.md README.it.md` and
   `grep -c '^|' README.md README.it.md`: counts must match, and if any
   feature/workflow changed since the last release without a README update,
   run the `update-readme` skill first.

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
