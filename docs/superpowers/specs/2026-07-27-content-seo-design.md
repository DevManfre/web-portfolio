# Content + SEO Improvements — Design

Date: 2026-07-27
Status: approved (pending user review)
Scope: sub-project 2 of 5 (page improvement roadmap; #1 LetterGlitch perf shipped)

## Problem

The page is missing content recruiters look for (certifications, spoken
languages, a prominent CV download) and basic SEO/link-preview
infrastructure (OG image, JSON-LD, sitemap, robots, hreflang). The contact
section buries its two actions inside prose links. Several small bugs exist
in the touched areas.

## Goal

Richer, recruiter-friendly single page and correct link previews / search
signals, with all content still driven by `src/data/resume.tsx` (single
source of truth) and every user-facing string bilingual (en/it).

## Non-goals

- No GitHub live data (sub-project 3), no interactive terminal (4), no
  analytics (5).
- No Credly embed yet: no current certification has a badge; the data model
  reserves an optional field for later.
- No contact form; the two CTAs (LinkedIn, email) are the contact actions.
- No visual redesign of existing sections.

## Design

### 1. Data model (`src/data/resume.tsx`)

New top-level fields in `DATA`:

```tsx
certifications: [
    {
        name: "ECDL Full Standard",
        issuer: "AICA",
        href: "https://aicanet.it/",
        logoUrl: "/img/education/aica.webp",
        start: "2014",
        end: "2015",
        badge: "", // optional Credly badge URL, empty for now
    },
],
languages: [
    { name: { en: "Italian", it: "Italiano" }, level: { en: "Native", it: "Madrelingua" } },
    { name: { en: "English", it: "Inglese" }, level: { en: "B2", it: "B2" } },
],
```

Removals/fixes in the same file:

- The AICA entry is REMOVED from `education` (it moves to
  `certifications`; note the typo "ECDL Full Stardard" is fixed to
  "Standard" in the new entry).
- Typo fix in the Sophon project description (en): "insitution" →
  "institution".
- `contact.tel: "+123456789"` stays as-is (placeholder, not rendered —
  explicitly out of scope).

### 2. Page sections (`src/app/[locale]/page.tsx`)

Section order becomes: hero → about → work → education (+ terminal) →
skills → **languages** → **certifications** → projects → contact.

- **Languages** (`<section id="languages">`): heading
  `t("languages-title")`, then a badge row in the same style as skills:
  each badge text `"{name[locale]} — {level[locale]}"` (e.g. "Italiano —
  Madrelingua", "English — B2"). Reuses `Badge` + `BlurFade` exactly like
  the skills section.
- **Certifications** (`<section id="certifications">`): heading
  `t("certifications-title")`, then one `ResumeCard` per entry (same
  usage as education cards: `logoUrl`, `altText={issuer}`, `title={name}`,
  `subtitle={issuer}`, `href`, `start`, `end`). The `badge` field is not
  rendered yet.
- BlurFade delay multipliers continue the existing progression (skills is
  `* 9`/`* 10`; languages uses `* 10`/`* 11`, certifications `* 11`/`* 12`,
  projects shifts from `* 11`/`* 12` to `* 12`/`* 13`, contact from `* 16`
  to `* 16` unchanged).

### 3. Hero CV button + contact CTAs

- **Hero**: under the description text, a `Button` (default variant,
  `size="sm"`) inside a `BlurFade`, linking to
  `/resumes/resume-${locale}.pdf` with the `download` attribute and
  `Icons.cv` icon; label `t("download-cv")`.
- **Contact** section body becomes: shortened lead line
  (`t("contact-lead")`) + two buttons side by side (stacked on mobile,
  `flex-col sm:flex-row`):
  - LinkedIn: `Button` variant `default`, `Icons.linkedin` icon, label
    `t("contact-linkedin")`, href `DATA.contact.social.LinkedIn.url`,
    `target="_blank" rel="noopener noreferrer"`.
  - Email: `Button` variant `outline`, `Icons.email` icon, label
    `t("contact-email")`, href `DATA.contact.social.email.url` (mailto —
    no target).
  - The old three-part prose (`contact-text-1/2/3`) is removed, keys
    deleted from both locale files.

### 4. SEO

All in the App Router idiom:

- **OG image**: `src/app/[locale]/opengraph-image.tsx` — `next/og`
  `ImageResponse`, 1200×630, `runtime = "edge"` NOT set (default node is
  fine on Netlify), dark background `#0a0a0a`, name (`DATA.name`) large,
  role/description (`DATA.description[locale]`) smaller, accent color
  `#61dca3` (glitch green). Default `ImageResponse` font (no custom font
  loading — not worth the complexity). Exports `alt`, `size`,
  `contentType`. Next automatically wires `og:image` for both locales.
- **JSON-LD**: rendered in `src/app/[locale]/layout.tsx` — a
  `<script type="application/ld+json">` with schema.org `Person`:
  `name`, `url`, `jobTitle` ("Full Stack Developer"), `image`
  (`DATA.url + DATA.avatarUrl`), `sameAs` (GitHub, LinkedIn, CodePen
  URLs from `DATA.contact.social`), `alumniOf` ("Università degli Studi
  di Modena e Reggio Emilia"). Serialized from `DATA`, no hardcoded
  duplicates except `jobTitle` and `alumniOf` (single-locale strings are
  acceptable in JSON-LD; use the English values).
- **Sitemap**: `src/app/sitemap.ts` returning entries for `/en` and `/it`
  with `alternates.languages` cross-links, `changeFrequency: "monthly"`,
  `priority: 1`.
- **Robots**: `src/app/robots.ts` — allow all, `sitemap: DATA.url +
  "/sitemap.xml"`.
- **Metadata** (`src/app/layout.tsx` `generateMetadata`):
  - `title.default` changes from `DATA.username` to `DATA.name`.
  - add `alternates: { canonical: "/" + locale, languages: { en: "/en",
    it: "/it", "x-default": "/en" } }`.
  - `openGraph.locale` maps to the full form (`en_US` / `it_IT`).
  - Empty `verification` block removed (dead config).

### 5. i18n keys

Added to `HomePage` in BOTH `public/locales/en.json` and `it.json`
(values: en / it):

| key | en | it |
|---|---|---|
| `languages-title` | Languages | Lingue |
| `certifications-title` | Certifications | Certificazioni |
| `download-cv` | Download CV | Scarica CV |
| `contact-lead` | Want to work together or just say hi? | Vuoi lavorare con me o semplicemente fare due chiacchiere? |
| `contact-linkedin` | Message me on LinkedIn | Scrivimi su LinkedIn |
| `contact-email` | Send me an email | Mandami una email |

Removed from both: `contact-text-1`, `contact-text-2`, `contact-text-3`.
Key sets must stay identical between the two files (repo i18n rule).

### 6. Bug fixes bundled (touched areas only)

- `target="about:blank"` → `target="_blank" rel="noopener noreferrer"`
  everywhere it appears (`navbar.tsx`, `page.tsx` contact links,
  `project-card.tsx` / `resume-card.tsx` if present).
- Navbar CV link: `href={`resumes/resume-${locale}.pdf`}` →
  `href={`/resumes/resume-${locale}.pdf`}` (absolute path; relative
  breaks under trailing-slash variants).

## Files touched

- `src/data/resume.tsx` — new fields, AICA moved, typos.
- `src/app/[locale]/page.tsx` — new sections, hero button, contact CTAs,
  target fixes.
- `src/app/[locale]/layout.tsx` — JSON-LD script.
- `src/app/layout.tsx` — metadata additions.
- `src/app/[locale]/opengraph-image.tsx` — new.
- `src/app/sitemap.ts`, `src/app/robots.ts` — new.
- `src/components/navbar.tsx` — target + href fixes.
- `src/components/project-card.tsx`, `src/components/resume-card.tsx` —
  target fixes if `about:blank` present.
- `public/locales/en.json`, `public/locales/it.json` — keys.

## Error handling

- `opengraph-image.tsx` uses only local data; no fetch, no failure mode
  beyond build-time type errors.
- Sitemap/robots are static functions; no runtime input.

## Testing / verification

No test runner. Verification:

1. `npm run lint`, `npm run typecheck`, `npm run build` green.
2. i18n parity: run the repo's `i18n-check` skill (key sets identical,
   all `resume.tsx` long-form fields bilingual).
3. `npm run dev`:
   - `/en` and `/it`: new sections render, badges correct, cert card ok.
   - Hero CV button downloads the right PDF per locale.
   - Contact CTAs open LinkedIn in new tab / mail client.
   - `curl -s localhost:3000/en | grep 'application/ld+json'` shows the
     Person object; validate at schema.org validator (manual).
   - `localhost:3000/en/opengraph-image` renders the 1200×630 image.
   - `localhost:3000/sitemap.xml` and `/robots.txt` respond correctly.
4. Visual check by user (sections order, dark/light).

## Success criteria

- All new content visible and bilingual; i18n key sets identical.
- OG image renders for both locales; sitemap/robots/JSON-LD served.
- No `about:blank` targets remain in the repo.
- Lint + typecheck + build green; CI green after push.

## Reminder for the user

`public/resumes/resume-en.pdf` / `resume-it.pdf` are exported externally —
after adding certifications/languages to the site, regenerate the PDFs so
CV and site stay consistent (repo gotcha).
