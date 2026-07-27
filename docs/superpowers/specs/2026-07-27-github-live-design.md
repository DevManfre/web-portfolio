# GitHub Live Section — Design

Date: 2026-07-27
Status: approved (pending user review)
Scope: sub-project 3 of 5 (page improvement roadmap; #1 perf and #2 content+SEO shipped)

## Problem

The portfolio shows only hand-curated content. Live GitHub signals
(contribution activity, stars, pinned repos) prove ongoing work without
manual upkeep, but the page has no connection to GitHub beyond static
links.

## Goal

A `#github` section — stats row, contribution graph, pinned repo cards —
rendered server-side from one GitHub GraphQL query, cached ~24h, themed to
match the site's matrix aesthetic. Zero new npm dependencies. If the data
is unavailable for any reason, the section silently disappears; the site
never breaks because of GitHub.

## Non-goals

- No changes to the curated Projects section (`DATA.projects` stays the
  source for it).
- No client-side fetching, no third-party embed images.
- No per-repo language byte statistics (top language = most frequent
  `primaryLanguage` across public repos — cheap and good enough).
- No interactive tooltips on the graph (native `title` attribute only).

## Design

### 1. Data layer — `src/lib/github.ts`

Single exported async function plus exported types:

```ts
export type GithubData = {
    totalContributions: number;
    weeks: { days: { date: string; count: number }[] }[];
    publicRepos: number;
    totalStars: number;
    topLanguage: string | null;
    pinned: {
        name: string;
        description: string | null;
        url: string;
        stars: number;
        language: { name: string; color: string | null } | null;
    }[];
};

export async function getGithubData(): Promise<GithubData | null>;
```

Behavior:

- Reads `process.env.GITHUB_TOKEN`; if unset → return `null` immediately.
- POST `https://api.github.com/graphql` with
  `Authorization: bearer ${token}`, body = one query for user login
  `DATA.username` (GitHub logins are case-insensitive, "devmanfre" works):
  - `contributionsCollection.contributionCalendar`:
    `totalContributions`, `weeks { contributionDays { date contributionCount } }`
  - `pinnedItems(first: 4, types: REPOSITORY)`:
    `name description url stargazerCount primaryLanguage { name color }`
  - `repositories(privacy: PUBLIC, ownerAffiliations: OWNER, isFork: false, first: 100)`:
    `totalCount nodes { stargazerCount primaryLanguage { name } }`
- `fetch` options: `next: { revalidate: 86400 }` (Next data cache, ~24h).
- Aggregations done in the function: `totalStars` = sum of stargazerCount;
  `topLanguage` = most frequent `primaryLanguage.name` (ties broken by
  first encountered; `null` when no repos have a language).
- ANY failure (non-2xx, GraphQL `errors` array, network exception, missing
  fields) → `console.warn` one line + return `null`. Never throws.

### 2. UI — section `#github`

Placed in `src/app/[locale]/page.tsx` between `#certifications` and
`#projects`. The section markup lives in a dedicated async Server
Component so `page.tsx` stays lean:

- **`src/components/github-section.tsx`** (async Server Component):
  calls `getGithubData()`; on `null` returns `null` (section hidden —
  chosen fallback). Otherwise renders:
  1. Heading `t("github-title")` (same `h2` style as other sections).
  2. Stats row: 4 items — public repos, total stars, contributions last
     year, top language — value big + translated label small. Simple
     flex/grid, `text-muted-foreground` labels.
  3. `<ContributionGraph weeks={...} />`.
  4. Pinned repos: `grid grid-cols-1 sm:grid-cols-2 gap-3`, one
     `GithubRepoCard` per pinned repo (max 4).
  5. CTA link `t("github-view-profile")` →
     `DATA.contact.social.GitHub.url`, `target="_blank"
     rel="noopener noreferrer"`, ghost/link Button with `Icons.github`.
  - Wrapped in `BlurFade` blocks. The component accepts a required
    `delay: number` prop (page.tsx passes `BLUR_FADE_DELAY * 12`); the
    heading uses `delay`, the content blocks use `delay + 0.04`.
- **`src/components/contribution-graph.tsx`** (Server Component, pure
  render): props `{ weeks: GithubData["weeks"] }`. Renders a horizontal
  scroll container (`overflow-x-auto`) with a CSS grid: one column per
  week (up to 53), 7 rows, cells `size-[10px] rounded-[2px]`. Intensity
  buckets by count — 0, 1–2, 3–5, 6–9, 10+ — map to cell classes
  `bg-muted`, `bg-[#61dca3]/25`, `bg-[#61dca3]/45`, `bg-[#61dca3]/70`,
  `bg-[#61dca3]`. The zero bucket uses the theme token so it reads in
  both themes; the greens read on dark and light as-is.
  Native `title={`${date}: ${count}`}` per cell. The grid is decorative
  (the stats row already announces the total) → `aria-hidden="true"` on
  the grid container.
- **`src/components/github-repo-card.tsx`** (Server Component): props
  `{ name, description, url, stars, language }`. Card styled like the
  existing shadcn `Card` idiom (border, rounded, p-4): repo name
  (mono/semibold), description (`text-muted-foreground text-sm`,
  line-clamp-2), footer row: language dot (`style={{ backgroundColor:
  language.color ?? "#61dca3" }}`) + language name, star count rendered
  as a `★` character + number (no icon dependency). Whole card is an
  `<a>` with `target="_blank" rel="noopener noreferrer"`.

### 3. i18n keys

Added to `HomePage` in BOTH locale files:

| key | en | it |
|---|---|---|
| `github-title` | GitHub Activity | Attività GitHub |
| `github-stats-repos` | Public repos | Repository pubbliche |
| `github-stats-stars` | Total stars | Stelle totali |
| `github-stats-contributions` | Contributions (last year) | Contributi (ultimo anno) |
| `github-stats-top-language` | Top language | Linguaggio principale |
| `github-view-profile` | View full profile on GitHub | Vedi il profilo completo su GitHub |

Repo names/descriptions from the API stay in English (GitHub content,
same class as proper nouns — allowed by the repo i18n rule's intent).

The label strings are rendered inside the server component via
`getTranslations("HomePage")`.

### 4. Token setup (user, one-time)

- Create a **classic** PAT at https://github.com/settings/tokens with ONLY
  the `read:user` scope (needed for `contributionsCollection`; public repo
  and pinned data need no extra scope). No expiration or 1 year, user's
  choice — on expiry the section silently disappears (accepted trade-off).
- Local dev: `.env.local` (already gitignored) with
  `GITHUB_TOKEN=ghp_...`.
- Production: same env var in Netlify dashboard (Site settings → Environment
  variables), then redeploy.
- CI: NOT configured — `npm run build` in GitHub Actions has no token, the
  section is hidden there; that's fine because CI only gates lint/types.

### 5. Documentation

- CLAUDE.md "Gotchas" gains one line: GitHub section requires
  `GITHUB_TOKEN` env (classic PAT, `read:user`); without it the section
  is silently hidden.

## Files touched

- Create: `src/lib/github.ts`, `src/components/github-section.tsx`,
  `src/components/contribution-graph.tsx`,
  `src/components/github-repo-card.tsx`.
- Modify: `src/app/[locale]/page.tsx` (render `<GithubSection />` between
  certifications and projects), `public/locales/en.json`, `it.json`
  (6 keys), `CLAUDE.md` (gotcha line).

## Error handling

- Missing token, HTTP error, GraphQL errors, malformed payload → `null`
  → hidden section. One `console.warn` for diagnosability in Netlify
  function logs.
- Empty pinned list with otherwise valid data → render section without
  the pinned grid (stats + graph still valuable).

## Testing / verification

No test runner. Verification:

1. `npm run lint`, `npm run typecheck`, `npm run build` green (build runs
   WITHOUT token → also proves the hidden-section path compiles).
2. i18n parity check (node script, keys identical).
3. Dev without token: `#github` absent from HTML.
4. Dev with token (user provides `.env.local`): section renders — stats
   numbers plausible, graph shows ~53 columns, pinned repos ≤ 4, CTA
   link correct; check both locales and both themes.
5. Rate/cache sanity: two consecutive requests don't refetch (Next data
   cache; observable via server log absence of second warn/latency).
6. Visual pass by user.

## Success criteria

- With token: section renders live data in both locales/themes, matrix
  look, no layout shift (server-rendered).
- Without token: page identical to today, build green.
- No new npm dependencies. Lint/typecheck/build/CI green.
