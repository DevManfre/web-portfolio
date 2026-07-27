# Content + SEO Improvements Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add recruiter-facing content (certifications, languages, hero CV button, contact CTAs) and SEO infrastructure (OG image, JSON-LD, sitemap, robots, hreflang) to the portfolio, all driven by `src/data/resume.tsx`.

**Architecture:** New `certifications` and `languages` fields in the `DATA` const feed two new page sections that reuse existing components (`ResumeCard`, `Badge`, `BlurFade`). SEO lives in App Router idioms: `opengraph-image.tsx` under `[locale]`, `sitemap.ts`/`robots.ts` at app root, JSON-LD in the locale layout, metadata additions in the root layout. Small `target="about:blank"` bugs fixed in touched areas.

**Tech Stack:** Next.js 15 App Router, React 19, TypeScript strict, next-intl, next/og, Tailwind, shadcn/ui.

**Spec:** `docs/superpowers/specs/2026-07-27-content-seo-design.md`

## Global Constraints

- No test runner — verification is `npm run lint`, `npm run typecheck`, `npm run build`, manual browser checks.
- 4-space indentation in hand-written files.
- Every user-facing string MUST exist in both English and Italian: content in `resume.tsx` as `{ en, it }` objects; UI strings as the same key in both `public/locales/en.json` and `it.json` — key sets must stay identical.
- Commit messages: Unicode gitmoji prefix + short English message (✨ feature · 🗃️ data · 💄 UI · 🌐 i18n · 🐛 fix).
- Work on the `development` branch.
- `@/` path alias → `src/`. Server Components by default.

---

### Task 1: Data model in resume.tsx

**Files:**
- Modify: `src/data/resume.tsx`

**Interfaces:**
- Consumes: nothing.
- Produces: `DATA.certifications` — readonly array of `{ name: string; issuer: string; href: string; logoUrl: string; start: string; end: string; badge: string }`; `DATA.languages` — readonly array of `{ name: { en: string; it: string }; level: { en: string; it: string } }`. Tasks 2 uses both. The AICA entry no longer exists in `DATA.education`.

- [ ] **Step 1: Remove the AICA entry from `education`**

In `src/data/resume.tsx`, delete this whole object from the `education` array (including its trailing comma):

```tsx
        {
            school: "AICA",
            href: "https://aicanet.it/",
            degree: {
                it: "ECDL Full Stardard",
                en: "ECDL Full Stardard",
            },
            logoUrl: "/img/education/aica.webp",
            start: "2014",
            end: "2015",
        },
```

- [ ] **Step 2: Add `certifications` and `languages` fields**

Immediately after the `education: [ ... ],` array's closing `],` and before `projects: [`, insert:

```tsx
    certifications: [
        {
            name: "ECDL Full Standard",
            issuer: "AICA",
            href: "https://aicanet.it/",
            logoUrl: "/img/education/aica.webp",
            start: "2014",
            end: "2015",
            badge: "",
        },
    ],
    languages: [
        { name: { en: "Italian", it: "Italiano" }, level: { en: "Native", it: "Madrelingua" } },
        { name: { en: "English", it: "Inglese" }, level: { en: "B2", it: "B2" } },
    ],
```

Note: `badge` is a reserved field for a future Credly URL — intentionally empty and unrendered for now (spec §1).

- [ ] **Step 3: Fix the Sophon typo**

In the Sophon project's `description.en`, change `insitution` to `institution`:

```tsx
                en: `Sophon is a software that allows you to store, execute, and optionally share your research in a secure cloud hosted by your institution.
                It was a research project developed by the University of Modena and Reggio Emilia.`,
```

- [ ] **Step 4: Verify**

Run: `npm run lint && npm run typecheck`
Expected: both pass (new fields are unused so far — that's fine).

- [ ] **Step 5: Commit**

```bash
git add src/data/resume.tsx
git commit -m "🗃️ Add certifications and languages data, fix typos"
```

---

### Task 2: Languages and Certifications sections

**Files:**
- Modify: `src/app/[locale]/page.tsx`
- Modify: `public/locales/en.json`, `public/locales/it.json`

**Interfaces:**
- Consumes: `DATA.certifications` and `DATA.languages` from Task 1 (shapes listed there); existing `ResumeCard`, `Badge`, `BlurFade` components; `t()` from `useTranslations`/`getTranslations` scope `"HomePage"`.
- Produces: sections `#languages` and `#certifications` between `#skills` and `#projects`; i18n keys `languages-title`, `certifications-title` in both locale files.

- [ ] **Step 1: Add i18n keys**

In `public/locales/en.json`, inside `"HomePage"` after `"skills-title":"Skills",` add:

```json
"languages-title":"Languages","certifications-title":"Certifications",
```

In `public/locales/it.json`, inside `"HomePage"` after `"skills-title":"Linguaggi e Tecnologie",` add:

```json
"languages-title":"Lingue","certifications-title":"Certificazioni",
```

(The files are single-line JSON; keep them that way.)

- [ ] **Step 2: Insert the two sections in page.tsx**

In `src/app/[locale]/page.tsx`, immediately after the closing `</section>` of `<section id="skills">` and before `<section id="projects">`, insert:

```tsx
            <section id="languages">
                <div className="flex min-h-0 flex-col gap-y-3">
                    <BlurFade delay={BLUR_FADE_DELAY * 10}>
                        <h2 className="text-xl font-bold">{t("languages-title")}</h2>
                    </BlurFade>
                    <div className="flex flex-wrap gap-1">
                        {DATA.languages.map((language, id) => (
                            <BlurFade key={language.name.en} delay={BLUR_FADE_DELAY * 11 + id * 0.05}>
                                <Badge className="select-none">{`${language.name[locale]} — ${language.level[locale]}`}</Badge>
                            </BlurFade>
                        ))}
                    </div>
                </div>
            </section>
            <section id="certifications">
                <div className="flex min-h-0 flex-col gap-y-3">
                    <BlurFade delay={BLUR_FADE_DELAY * 11}>
                        <h2 className="text-xl font-bold">{t("certifications-title")}</h2>
                    </BlurFade>
                    {DATA.certifications.map((certification, id) => (
                        <BlurFade key={certification.name} delay={BLUR_FADE_DELAY * 12 + id * 0.05}>
                            <ResumeCard
                                href={certification.href}
                                logoUrl={certification.logoUrl}
                                altText={certification.issuer}
                                title={certification.name}
                                subtitle={certification.issuer}
                                start={certification.start}
                                end={certification.end}
                            />
                        </BlurFade>
                    ))}
                </div>
            </section>
```

- [ ] **Step 3: Shift the projects section delays**

Still in `page.tsx`, in `<section id="projects">`: change `BLUR_FADE_DELAY * 11` to `BLUR_FADE_DELAY * 12` (heading block) and `BLUR_FADE_DELAY * 12 + id * 0.05` to `BLUR_FADE_DELAY * 13 + id * 0.05` (project cards). The contact section's `* 16` stays unchanged.

- [ ] **Step 4: Verify**

Run: `npm run lint && npm run typecheck`
Expected: both pass.

- [ ] **Step 5: Commit**

```bash
git add "src/app/[locale]/page.tsx" public/locales/en.json public/locales/it.json
git commit -m "✨ Add languages and certifications sections"
```

---

### Task 3: Hero CV download button

**Files:**
- Modify: `src/app/[locale]/page.tsx`
- Modify: `public/locales/en.json`, `public/locales/it.json`

**Interfaces:**
- Consumes: `Icons.cv` from `@/components/icons`; `Button` (shadcn, supports `asChild`); existing `locale` variable in `Page()`.
- Produces: i18n key `download-cv` in both locale files; a download CTA in `#hero`.

- [ ] **Step 1: Add i18n keys**

`public/locales/en.json`, in `"HomePage"` after `"certifications-title":"Certifications",`:

```json
"download-cv":"Download CV",
```

`public/locales/it.json`, after `"certifications-title":"Certificazioni",`:

```json
"download-cv":"Scarica CV",
```

- [ ] **Step 2: Import Icons in page.tsx**

`src/app/[locale]/page.tsx` has no `Icons` import. Add with the other imports:

```tsx
import { Icons } from "@/components/icons";
```

- [ ] **Step 3: Add the button in the hero**

Inside `<section id="hero">`, in the `<div className="flex-col flex flex-1 space-y-1.5">` block, immediately after the description `<BlurFadeText ... text={DATA.description[locale]} />` line, insert:

```tsx
                            <BlurFade delay={BLUR_FADE_DELAY * 2}>
                                <Button asChild size="sm" className="mt-2 w-fit">
                                    <a href={`/resumes/resume-${locale}.pdf`} download>
                                        <Icons.cv className="mr-2 size-4" />
                                        {t("download-cv")}
                                    </a>
                                </Button>
                            </BlurFade>
```

- [ ] **Step 4: Verify**

Run: `npm run lint && npm run typecheck`
Expected: both pass.

- [ ] **Step 5: Commit**

```bash
git add "src/app/[locale]/page.tsx" public/locales/en.json public/locales/it.json
git commit -m "✨ Add CV download button to hero"
```

---

### Task 4: Contact section CTAs

**Files:**
- Modify: `src/app/[locale]/page.tsx`
- Modify: `public/locales/en.json`, `public/locales/it.json`

**Interfaces:**
- Consumes: `Icons.linkedin`, `Icons.email` from `@/components/icons` (import added in Task 3); `Button`; `DATA.contact.social.LinkedIn.url`, `DATA.contact.social.email.url`.
- Produces: i18n keys `contact-lead`, `contact-linkedin`, `contact-email` added; `contact-text-1`, `contact-text-2`, `contact-text-3` REMOVED from both files.

- [ ] **Step 1: Update i18n keys**

`public/locales/en.json`, in `"HomePage"`: DELETE the three entries
`"contact-text-1":"Want to chat? Just shoot me a"`, `"contact-text-2":"on Linkedin or send me an"`, `"contact-text-3":"and I'll respond whenever I can."` and ADD after `"contact-subtitle":"Get in Touch",`:

```json
"contact-lead":"Want to work together or just say hi?","contact-linkedin":"Message me on LinkedIn","contact-email":"Send me an email",
```

`public/locales/it.json`: DELETE `"contact-text-1":"Mandami un"`, `"contact-text-2":"su Linkedin o mandami una"`, `"contact-text-3":"e ti risponderò appena potrò."` and ADD after `"contact-subtitle":"Contattami sui social",`:

```json
"contact-lead":"Vuoi lavorare con me o semplicemente fare due chiacchiere?","contact-linkedin":"Scrivimi su LinkedIn","contact-email":"Mandami una email",
```

(Mind trailing commas — keep the JSON valid.)

- [ ] **Step 2: Replace the contact prose with CTAs**

In `src/app/[locale]/page.tsx`, `<section id="contact">`, replace the entire `<p className="mx-auto max-w-[600px] ...`>…`</p>` block (the one containing `contact-text-1`, the LinkedIn `<a>`, and the email `<a>`) with:

```tsx
                            <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                {t("contact-lead")}
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                                <Button asChild>
                                    <a href={DATA.contact.social.LinkedIn.url} target="_blank" rel="noopener noreferrer">
                                        <Icons.linkedin className="mr-2 size-4" />
                                        {t("contact-linkedin")}
                                    </a>
                                </Button>
                                <Button asChild variant="outline">
                                    <a href={DATA.contact.social.email.url}>
                                        <Icons.email className="mr-2 size-4" />
                                        {t("contact-email")}
                                    </a>
                                </Button>
                            </div>
```

(The email link is a `mailto:` — no `target`.)

- [ ] **Step 3: Verify**

Run: `npm run lint && npm run typecheck`
Expected: both pass. Also confirm no `contact-text-` reference remains: `grep -rn "contact-text" src public/locales` → no matches.

- [ ] **Step 4: Commit**

```bash
git add "src/app/[locale]/page.tsx" public/locales/en.json public/locales/it.json
git commit -m "💄 Replace contact prose with LinkedIn and email CTAs"
```

---

### Task 5: target=_blank fixes + navbar CV href

**Files:**
- Modify: `src/components/navbar.tsx:25,39`
- Modify: `src/components/project-card.tsx:30`
- Modify: `src/components/resume-card.tsx:37`

**Interfaces:**
- Consumes: nothing from other tasks (page.tsx's `about:blank` instances were already removed by Task 4).
- Produces: zero `about:blank` occurrences in the repo.

- [ ] **Step 1: Fix navbar.tsx**

Line 25 — social links: change

```tsx
<Link href={social.url} aria-label={social.name} target="about:blank" className={...}>
```

to

```tsx
<Link href={social.url} aria-label={social.name} target="_blank" rel="noopener noreferrer" className={...}>
```

(keep the existing `className` exactly as is).

Line 39 — CV link: change

```tsx
<Link href={`resumes/resume-${locale}.pdf`} download target="about:blank" className={...} aria-label="Download Curriculum Vitae">
```

to

```tsx
<Link href={`/resumes/resume-${locale}.pdf`} download target="_blank" rel="noopener noreferrer" className={...} aria-label="Download Curriculum Vitae">
```

(note the leading `/` in the href — the relative path breaks under trailing-slash URL variants).

- [ ] **Step 2: Fix project-card.tsx line 30 and resume-card.tsx line 37**

In both, change `target="about:blank"` to `target="_blank" rel="noopener noreferrer"`. Touch nothing else on those lines.

- [ ] **Step 3: Verify**

Run: `grep -rn "about:blank" src` → no matches.
Run: `npm run lint && npm run typecheck` → both pass.

- [ ] **Step 4: Commit**

```bash
git add src/components/navbar.tsx src/components/project-card.tsx src/components/resume-card.tsx
git commit -m "🐛 Use _blank targets with noopener and absolute CV path"
```

---

### Task 6: SEO — metadata, JSON-LD, OG image, sitemap, robots

**Files:**
- Modify: `src/app/layout.tsx` (generateMetadata only)
- Modify: `src/app/[locale]/layout.tsx` (JSON-LD)
- Create: `src/app/[locale]/opengraph-image.tsx`
- Create: `src/app/sitemap.ts`
- Create: `src/app/robots.ts`

**Interfaces:**
- Consumes: `DATA` (`name`, `url`, `description`, `avatarUrl`, `contact.social.{GitHub,LinkedIn,CodePen}.url`).
- Produces: routes `/sitemap.xml`, `/robots.txt`, `/{locale}/opengraph-image`; `Person` JSON-LD in every page; hreflang alternates. Note: `src/middleware.ts` matcher already excludes dot-paths (`/((?!api|trpc|_next|_vercel|.*\\..*).*)`), so `/sitemap.xml` and `/robots.txt` bypass the i18n middleware — no middleware change needed.

- [ ] **Step 1: Update generateMetadata in src/app/layout.tsx**

Replace the whole `generateMetadata` function with:

```tsx
export async function generateMetadata(): Promise<Metadata> {
    const locale = (await getLocale()) as keyof typeof DATA.description;

    return {
        metadataBase: new URL(DATA.url),
        title: {
            default: DATA.name,
            template: `%s | ${DATA.name}`,
        },
        description: DATA.description[locale],
        alternates: {
            canonical: `/${locale}`,
            languages: {
                en: "/en",
                it: "/it",
                "x-default": "/en",
            },
        },
        openGraph: {
            title: `${DATA.name}`,
            description: DATA.description[locale],
            url: DATA.url,
            siteName: `${DATA.name}`,
            locale: locale === "it" ? "it_IT" : "en_US",
            type: "website",
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                "max-video-preview": -1,
                "max-image-preview": "large",
                "max-snippet": -1,
            },
        },
    };
}
```

Changes vs current: `title.default` `DATA.username` → `DATA.name`; new `alternates` block; `openGraph.locale` mapped to `it_IT`/`en_US`; the empty `verification` block is removed (dead config).

- [ ] **Step 2: Add JSON-LD to src/app/[locale]/layout.tsx**

Add the import:

```tsx
import { DATA } from "@/data/resume";
```

Inside `RootLayout`, before the `return`, add:

```tsx
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Person",
        name: DATA.name,
        url: DATA.url,
        jobTitle: "Full Stack Developer",
        image: `${DATA.url}${DATA.avatarUrl}`,
        sameAs: [DATA.contact.social.GitHub.url, DATA.contact.social.LinkedIn.url, DATA.contact.social.CodePen.url],
        alumniOf: "Università degli Studi di Modena e Reggio Emilia",
    };
```

In the JSX, as the first child of `<TooltipProvider ...>` (before `<LetterGlitch ... />`), add:

```tsx
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
```

(English values for `jobTitle`/`alumniOf` are intentional — spec §4.)

- [ ] **Step 3: Create src/app/[locale]/opengraph-image.tsx**

```tsx
import { ImageResponse } from "next/og";
import { DATA } from "@/data/resume";

export const alt = `${DATA.name} — Full Stack Developer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const description = DATA.description[(locale === "it" ? "it" : "en") as keyof typeof DATA.description];

    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    padding: "80px",
                    backgroundColor: "#0a0a0a",
                }}
            >
                <div style={{ fontSize: 72, fontWeight: 700, color: "#ffffff" }}>{DATA.name}</div>
                <div style={{ fontSize: 36, color: "#61dca3", marginTop: 24 }}>{description}</div>
                <div style={{ fontSize: 28, color: "#888888", marginTop: 48 }}>{DATA.url.replace("https://", "")}</div>
            </div>
        ),
        { ...size }
    );
}
```

- [ ] **Step 4: Create src/app/sitemap.ts**

```ts
import type { MetadataRoute } from "next";
import { DATA } from "@/data/resume";

export default function sitemap(): MetadataRoute.Sitemap {
    const languages = {
        en: `${DATA.url}/en`,
        it: `${DATA.url}/it`,
    };

    return [
        {
            url: `${DATA.url}/en`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 1,
            alternates: { languages },
        },
        {
            url: `${DATA.url}/it`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 1,
            alternates: { languages },
        },
    ];
}
```

- [ ] **Step 5: Create src/app/robots.ts**

```ts
import type { MetadataRoute } from "next";
import { DATA } from "@/data/resume";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
        },
        sitemap: `${DATA.url}/sitemap.xml`,
    };
}
```

- [ ] **Step 6: Verify**

Run: `npm run lint && npm run typecheck && npm run build`
Expected: all pass; build output lists `/sitemap.xml`, `/robots.txt`, and `/[locale]/opengraph-image` routes.

- [ ] **Step 7: Commit**

```bash
git add src/app/layout.tsx "src/app/[locale]/layout.tsx" "src/app/[locale]/opengraph-image.tsx" src/app/sitemap.ts src/app/robots.ts
git commit -m "✨ Add OG image, JSON-LD, sitemap, robots and hreflang metadata"
```

---

### Task 7: Full verification

**Files:**
- None modified (verification only; fixes committed if anything is off).

**Interfaces:**
- Consumes: the running app with Tasks 1–6 applied.
- Produces: verified deliverable; i18n parity confirmed.

- [ ] **Step 1: Static checks**

Run: `npm run lint && npm run typecheck && npm run build`
Expected: all green.

- [ ] **Step 2: i18n parity**

Run:

```bash
diff <(jq -S '.HomePage | keys' public/locales/en.json) <(jq -S '.HomePage | keys' public/locales/it.json)
```

Expected: no output (identical key sets). Also `jq empty public/locales/en.json public/locales/it.json` → no errors (valid JSON).

- [ ] **Step 3: Dev server smoke**

Run: `npm run dev` (note the port it picks), then:

```bash
curl -s localhost:PORT/en | grep -c 'application/ld+json'        # expect ≥ 1
curl -s localhost:PORT/en | grep -o 'id="languages"'              # expect match
curl -s localhost:PORT/en | grep -o 'id="certifications"'         # expect match
curl -s -o /dev/null -w "%{http_code} %{content_type}\n" localhost:PORT/en/opengraph-image   # expect 200 image/png
curl -s localhost:PORT/sitemap.xml | head -3                      # expect XML with devmanfre.netlify.app URLs
curl -s localhost:PORT/robots.txt                                 # expect Allow: / and Sitemap line
curl -s localhost:PORT/it | grep -o 'Scarica CV'                  # expect match
```

- [ ] **Step 4: Report for the human's visual pass**

List for the user: sections order (skills → languages → certifications → projects), hero CV button per locale, contact CTAs (LinkedIn new tab, email mail client), OG image at `/en/opengraph-image` and `/it/opengraph-image`, and the repo gotcha reminder: regenerate `public/resumes/resume-en.pdf` / `resume-it.pdf` externally since site content changed.

- [ ] **Step 5: Fix and commit anything found**

Any failed check: fix within spec constraints, gitmoji commit, re-run the failed step until green.
