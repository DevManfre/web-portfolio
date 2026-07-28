![header](https://capsule-render.vercel.app/api?type=waving&color=898380&text=web-portfolio&height=250&desc=Sito%20portfolio%20%2F%20CV%20personale%20di%20Alessio%20Manfredini%20(DevManfre)&fontAlignY=25&descAlignY=50)

[![Netlify Status](https://api.netlify.com/api/v1/badges/20aaaf4a-1edf-47e9-96e1-a093ed4e427b/deploy-status)](https://app.netlify.com/sites/devmanfre/deploys)
[![CI](https://github.com/DevManfre/web-portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/DevManfre/web-portfolio/actions/workflows/ci.yml)
[![GitHub release](https://img.shields.io/github/release/devmanfre/web-portfolio.svg)](https://github.com/DevManfre/web-portfolio/releases/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

[English](README.md) · **Italiano**

Online su **[devmanfre.netlify.app](https://devmanfre.netlify.app)** — un sito portfolio/CV a pagina singola, bilingue (inglese/italiano), con tema scuro di default, costruito con Next.js.

---

## Indice

**Il sito**
- [Funzionalità](#funzionalità)
- [Il terminale interattivo](#il-terminale-interattivo)

**Sviluppo**
- [Stack tecnologico](#stack-tecnologico)
- [Struttura del progetto](#struttura-del-progetto)
- [Per iniziare](#per-iniziare)
- [Variabili d'ambiente](#variabili-dambiente)

**Gestione e operazioni**
- [Gestione dei contenuti](#gestione-dei-contenuti)
- [Internazionalizzazione (i18n)](#internazionalizzazione-i18n)
- [Analytics](#analytics)
- [Servizi esterni](#servizi-esterni)
- [Deploy e CI](#deploy-e-ci)
- [Flusso Git](#flusso-git)
- [Manutenzione assistita da AI](#manutenzione-assistita-da-ai)
- [Licenza](#licenza)

## Il sito

### Funzionalità

- **Pagina singola, completamente bilingue** — locale nel percorso (`/en`, `/it`) con [next-intl](https://next-intl.dev) e fallback `x-default` sull'inglese. Ogni stringa visibile all'utente esiste in entrambe le lingue.
- **Tema scuro di default** — switch chiaro/scuro (toggle in alto a destra) via [next-themes](https://github.com/pacocoursey/next-themes); i token del tema sono variabili CSS in `globals.css` mappate su colori semantici Tailwind.
- **Sfondo animato "letter glitch"** — effetto canvas in stile Matrix ([ReactBits](https://reactbits.dev) `LetterGlitch`) che si mette in pausa quando esce dallo schermo o la tab è nascosta, e rispetta `prefers-reduced-motion`.
- **Hero** — nome, tagline, avatar, download del CV in un click (PDF nella lingua corrente) e fila di icone social (GitHub, LinkedIn, CodePen, email) con tooltip.
- **Sezioni CV** — About, Esperienza lavorativa, Formazione, Competenze, Lingue, Certificazioni, tutte renderizzate da un unico oggetto dati tipizzato (`src/data/resume.tsx`) con animazioni di ingresso blur-fade scaglionate ([Magic UI](https://magicui.design)).
- **Terminale interattivo** — una finta shell con comandi veri ed easter egg nascosti. Vedi [sotto](#il-terminale-interattivo).
- **Sezione GitHub Activity** — statistiche renderizzate lato server dalla API GraphQL di GitHub: repository pubbliche, stelle totali, contributi nell'ultimo anno, linguaggio principale, heatmap del calendario contributi e fino a 4 repository in evidenza (pinned). Dati in cache per 24 ore (`revalidate: 86400`) con timeout di fetch di 5 secondi. L'intera sezione sparisce silenziosamente se manca `GITHUB_TOKEN` o se una chiamata API fallisce — la build non si rompe mai per questo.
- **Sezione CodePen Experiments** — pen curati a mano, incorporati come iframe lazy-load il cui tema segue quello del sito. Curati a mano perché CodePen non ha una API pubblica (il feed RSS è bloccato da Cloudflare); la sezione si nasconde se la lista è vuota.
- **Griglia progetti** — card con immagine/video, badge delle tecnologie e link per progetto (GitHub, articoli, demo live).
- **Sezione contatti** — pulsanti call-to-action diretti per LinkedIn ed email.
- **Pagina 404 animata** — "404 / Page not found" con l'animazione di messa a fuoco `TrueFocus` di ReactBits.
- **SEO** — metadata e tag Open Graph per locale, immagine OG generata, alternates `hreflang`, schema JSON-LD `Person` (con link social in `sameAs`), `sitemap.xml` e `robots.txt`.
- **Analytics rispettosa della privacy** — [Umami](https://umami.is) con eventi custom, caricata solo se configurata ([dettagli](#analytics)).
- **Accessibilità** — log del terminale `aria-live`, `aria-label` sui controlli a sola icona, supporto reduced-motion, input del terminale usabile da tastiera.

### Il terminale interattivo

La sezione Formazione termina con un terminale (`src/components/interactive-terminal.tsx`). Al caricamento riproduce un'intro scriptata con effetto digitazione (definita in `DATA.terminal`):

```
> get-graduation --spec IT
✔ IT graduation getted.
> get-degree --spec CS
✔ CS degree getted.
> sudo work --mode hard ...
```

Dopo l'intro (~durata intro + 500 ms) compare un prompt interattivo: `visitor@devmanfre:~$`. I comandi sono case-insensitive; la cronologia è limitata a 50 voci. Digitare `clear` rimuove anche l'intro.

### Comandi documentati (`help`)

| Comando | Effetto |
|---|---|
| `help` | Elenca i comandi qui sotto |
| `whoami` | Nome e ruolo |
| `skills` | Competenze tecniche da `DATA.skills` |
| `languages` | Lingue parlate con livello |
| `certs` | Certificazioni |
| `projects` | Nomi dei progetti con link |
| `contact` | Link cliccabili email / LinkedIn / GitHub |
| `cv` | Scarica il PDF del CV nella lingua corrente |
| `clear` | Pulisce la cronologia **e** l'intro |

### Easter egg (spoiler!)

<details>
<summary>Comandi non documentati — clicca per rivelare</summary>

| Comando | Effetto |
|---|---|
| `sudo matrix` | **Il pezzo forte.** Stampa "Wake up, Neo…", emette un evento browser `matrix-burst` e il canvas `LetterGlitch` di sfondo va a schermo intero per 5 secondi, poi svanisce in 0,7 s. Saltato del tutto con `prefers-reduced-motion`. Tracciato come evento analytics `matrix-egg`. |
| `sudo <qualsiasi altra cosa>` | "visitor is not in the sudoers file. This incident will be reported." |
| `rm -rf /` | "nope. this portfolio is read-only :)" |
| `exit` | "nice try. you can check out any time you like, but you can never leave." (Hotel California) |
| `ls` | "just a portfolio here — try `help`" |
| `pwd` | `/home/visitor/devmanfre` |
| qualsiasi altro input | `command not found: <cmd> — try 'help'` |

L'evento `matrix-burst` è un `CustomEvent` a livello di `window`: un contratto tra il terminale (che lo emette) e `LetterGlitch` (che lo ascolta) — nessuno stato condiviso, quindi ciascun componente funziona anche senza l'altro.

</details>

## Sviluppo

### Stack tecnologico

| Livello | Scelta |
|---|---|
| Framework | [Next.js 15](https://nextjs.org) (App Router, dev server Turbopack) |
| Libreria UI | [React 19](https://react.dev) — Server Components di default, `"use client"` solo dove serve |
| Linguaggio | TypeScript (strict) |
| Stile | [Tailwind CSS 3.4](https://tailwindcss.com) + token del tema come variabili CSS |
| Primitive UI | [shadcn/ui](https://ui.shadcn.com) (Radix UI) — gestite dalla CLI shadcn, non modificate a mano |
| Animazioni | [Motion / Framer Motion](https://motion.dev), componenti vendorizzati [Magic UI](https://magicui.design) e [ReactBits](https://reactbits.dev) (questi ultimi via [jsrepo](https://jsrepo.dev), vedi `jsrepo.json`) |
| i18n | [next-intl 4](https://next-intl.dev) |
| Temi | [next-themes](https://github.com/pacocoursey/next-themes) |
| Hosting | [Netlify](https://netlify.com) |
| Analytics | [Umami Cloud](https://umami.is) (opzionale) |

### Struttura del progetto

```
src/
├── app/
│   ├── [locale]/              # route localizzate (en / it)
│   │   ├── layout.tsx         # JSON-LD, sfondo glitch, toggle tema
│   │   ├── page.tsx           # LA pagina — tutte le sezioni sono qui
│   │   └── opengraph-image.tsx
│   ├── layout.tsx             # root: metadata, ThemeProvider, next-intl, Umami
│   ├── not-found.tsx          # 404 animata
│   ├── globals.css            # token del tema (variabili CSS)
│   ├── robots.ts / sitemap.ts
├── components/
│   ├── ui/                    # primitive shadcn/ui (gestite da CLI — non a mano)
│   ├── magicui/               # componenti di animazione vendorizzati (terminal, blur-fade)
│   ├── reactbits/             # vendorizzati via jsrepo (LetterGlitch, TrueFocus)
│   └── *.tsx                  # componenti custom (interactive-terminal,
│                              #   github-section, codepen-*, project-card, …)
├── data/
│   └── resume.tsx             # ⭐ unica fonte di verità per TUTTI i contenuti
├── i18n/                      # config routing / request di next-intl
├── lib/                       # cn() + formatDate(), fetcher GitHub, helper Umami
└── middleware.ts              # middleware di rilevamento locale
public/
├── locales/en.json, it.json   # stringhe UI (i set di chiavi devono coincidere)
├── resumes/resume-{en,it}.pdf # CV scaricabili (esportati esternamente)
└── img/                       # avatar, loghi lavoro/formazione, screenshot progetti
```

### Per iniziare

Richiede **Node.js 20+** e npm.

```bash
git clone https://github.com/DevManfre/web-portfolio.git
cd web-portfolio
npm install
npm run dev          # dev server con Turbopack → http://localhost:3000
```

| Script | Scopo |
|---|---|
| `npm run dev` | Server di sviluppo (Turbopack) |
| `npm run build` | Build di produzione |
| `npm run start` | Serve la build di produzione |
| `npm run lint` | ESLint (`next/core-web-vitals` + `next/typescript`) |
| `npm run typecheck` | `tsc --noEmit` |

Non ci sono test. Lint + typecheck + build in CI fanno da quality gate.

### Variabili d'ambiente

Entrambe le variabili sono **opzionali** — il sito si builda e funziona senza; le funzionalità collegate semplicemente si spengono.

| Variabile | Dove | Scopo |
|---|---|---|
| `GITHUB_TOKEN` | `.env.local` in locale, dashboard Netlify in produzione | PAT classic con scope `read:user`. Abilita la sezione GitHub Activity (API GraphQL). Mancante/non valido → sezione nascosta in silenzio. La CI builda senza, by design. |
| `NEXT_PUBLIC_UMAMI_WEBSITE_ID` | Dashboard Netlify (opzionalmente `.env.local` per test) | ID del sito Umami. Se assente, lo `<script>` di analytics non viene proprio renderizzato — nessun tracking in dev/CI. |

## Gestione e operazioni

### Gestione dei contenuti

Quasi tutto ciò che si vede in pagina viene da **`src/data/resume.tsx`** (la const `DATA`, tipizzata `as const`):

| Cosa | Dove | Note |
|---|---|---|
| Nome, tagline, summary, avatar | `DATA.name/description/summary/avatarUrl` | I campi lunghi sono oggetti `{ en, it }` |
| Script intro del terminale | `DATA.terminal` | Righe alternate: indici pari digitati, dispari mostrati come output verde |
| Competenze | `DATA.skills` | Ordinate alfabeticamente in automatico |
| Social e contatti | `DATA.contact` | Alimenta icone hero, comando `contact` del terminale, `sameAs` del JSON-LD |
| Lavoro / formazione / certificazioni | `DATA.work/education/certifications` | Loghi in `public/img/…` (webp) |
| Lingue parlate | `DATA.languages` | Nome + livello bilingui |
| Progetti | `DATA.projects` | Immagine in `public/img/projects/`, badge tecnologie, array di link |
| Pen di CodePen | `DATA.codepens` | `{ title, slug }` — lo slug è l'ultimo segmento di `codepen.io/devmanfre/pen/<slug>`. Curati a mano (nessuna API pubblica CodePen). |
| Stringhe UI | `public/locales/en.json` + `it.json` | Messaggi next-intl — i set di chiavi devono restare identici |

**Dopo aver modificato i dati del CV, rigenerare `public/resumes/resume-en.pdf` e `resume-it.pdf`** — sono esportati esternamente, non generati dalla build.

Le skill [Claude Code](https://claude.com/claude-code) specifiche del repo automatizzano le modifiche più comuni — vedi [Manutenzione assistita da AI](#manutenzione-assistita-da-ai).

### Internazionalizzazione (i18n)

- Locale: `en` (default) e `it`, con prefisso nel percorso (`/en`, `/it`); il middleware reindirizza `/` in base ad `Accept-Language`.
- **Regola: ogni stringa visibile all'utente deve esistere in entrambe le lingue** — contenuti come oggetti `{ en, it }` in `resume.tsx`, stringhe UI con la stessa chiave in entrambi i file di locale.
- La SEO segue: alternates `hreflang`, metadata OG per locale (`en_US` / `it_IT`), entrambe le locale nella sitemap.

### Analytics

Umami (senza cookie, GDPR-friendly) si carica solo quando `NEXT_PUBLIC_UMAMI_WEBSITE_ID` è impostata. Eventi custom:

| Evento | Generato da |
|---|---|
| `cv-download` (`source: hero \| terminal`) | Pulsante CV nella hero / comando `cv` del terminale |
| `social-github` / `social-linkedin` / `social-codepen` / `social-email` | Fila di icone social nella hero |
| `contact-linkedin` / `contact-email` | Pulsanti della sezione contatti |
| `codepen-view-profile` | Link al profilo CodePen |
| `theme-toggle` | Switch chiaro/scuro |
| `terminal-used` | Primo comando del terminale in una visita |
| `matrix-egg` | Easter egg `sudo matrix` |

Gli elementi statici usano attributi `data-umami-event`; gli eventi programmatici passano dal wrapper sicuro `trackEvent()` in `src/lib/analytics.ts` (no-op se Umami è assente).

### Servizi esterni

| Servizio | Ruolo | Config in |
|---|---|---|
| **Netlify** | Hosting + deploy di `production` — config di deploy solo nella dashboard Netlify, niente di committato | Dashboard Netlify |
| **API GraphQL GitHub** | Dati per la sezione GitHub Activity | Variabile `GITHUB_TOKEN` |
| **Umami Cloud** | Analytics (`cloud.umami.is/script.js`) | Variabile `NEXT_PUBLIC_UMAMI_WEBSITE_ID` |
| **CodePen** | Iframe dei pen incorporati (`codepen.io/<user>/embed/preview/<slug>`) | `DATA.codepens` |
| **GitHub Actions** | Quality gate CI | `.github/workflows/ci.yml` |
| **capsule-render / shields.io** | Header grafico e badge del README | questo file |

### Deploy e CI

- **Branch:** si lavora su `development`; `production` è il branch di release, aggiornato solo mergiando `development` al suo interno. Netlify deploya il sito da `production`.
- **CI (GitHub Actions):** a ogni push/PR su `development` o `production` — `npm ci` → `lint` → `typecheck` → `build` (Node 20).
- ⚠️ Gli errori ESLint sono **ignorati durante le build** (`ignoreDuringBuilds: true` in `next.config.ts`), quindi il lint in CI è il vero gate — tenerlo verde.

### Flusso Git

I messaggi di commit usano un prefisso gitmoji Unicode + un breve messaggio in inglese:

| Emoji | Significato |
|---|---|
| ✨ | feature |
| 🔧 | config |
| 🗃️ | dati (`resume.tsx`) |
| 💄 | UI / stile |
| 🌐 | i18n |
| 🐛 | fix |
| ♻️ | refactor |
| 📝 | docs |
| 🚧 | WIP |

### Manutenzione assistita da AI

Il repo include un playbook `CLAUDE.md` e skill [Claude Code](https://claude.com/claude-code) di progetto in `.claude/skills/`:

| Skill | Uso |
|---|---|
| `add-project` | Aggiungere un progetto al portfolio |
| `update-cv` | Aggiornare esperienze, formazione o competenze |
| `update-resume-data` | Modificare gli altri contenuti di `DATA` (bio, social, intro terminale, …) |
| `update-locales` | Aggiungere/modificare/rimuovere stringhe UI in entrambi i file di locale |
| `i18n-check` | Verificare la parità inglese/italiano |
| `update-readme` | Tenere questo README e `README.md` allineati al codice |
| `release` | Controlli pre-flight, poi merge `development` → `production` |

### Licenza

[MIT](LICENSE) © Alessio Manfredini

![footer](https://capsule-render.vercel.app/api?type=waving&color=898380&section=footer)
