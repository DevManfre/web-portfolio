# LetterGlitch Performance Rewrite Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite the internals of the full-screen "matrix" background so it renders the identical effect at a fraction of the CPU cost.

**Architecture:** Single-file rewrite of `LetterGlitch.tsx`: precomputed RGB palette (no regex in the hot path), dirty-cell redraw (only changed cells repainted), delta-time color fades, simulation limited to the band visible above the disappear-vignette, and pausing on hidden tab / out-of-view / `prefers-reduced-motion`. Public props unchanged; `layout.tsx` gets a sane `glitchSpeed`.

**Tech Stack:** Next.js 15 App Router, React 19, TypeScript strict, Canvas 2D. No new dependencies.

**Spec:** `docs/superpowers/specs/2026-07-27-letterglitch-perf-design.md`

## Global Constraints

- No test runner exists in this repo — verification is `npm run lint`, `npm run typecheck`, and manual browser checks (per spec "Testing / verification").
- 4-space indentation in hand-written files.
- Component public interface must stay exactly: `glitchColors?`, `glitchSpeed`, `centerVignette?`, `outerVignette?`, `disappeareVignette?`, `smooth`, `className?`.
- Visual parity required: same glitch cadence, colors, smooth fades, vignettes.
- Commit messages: Unicode gitmoji prefix + short English message (repo convention).
- Work on the `development` branch.

---

### Task 1: Rewrite LetterGlitch internals

**Files:**
- Modify: `src/components/reactbits/Backgrounds/LetterGlitch/LetterGlitch.tsx` (full replacement)

**Interfaces:**
- Consumes: nothing from other tasks.
- Produces: default export `LetterGlitch` React component with the exact prop type `{ glitchColors?: string[]; glitchSpeed: number; centerVignette?: boolean; outerVignette?: boolean; disappeareVignette?: boolean; smooth: boolean; className?: string }` — Task 2 relies on this signature being unchanged.

- [ ] **Step 1: Replace the entire file content with the rewritten component**

Replace ALL content of `src/components/reactbits/Backgrounds/LetterGlitch/LetterGlitch.tsx` with:

```tsx
/*
    Installed from https://reactbits.dev/ts/default/
    Internals rewritten locally for performance: precomputed RGB palette,
    dirty-cell redraw, delta-time color fades, visibility/reduced-motion
    pausing, and simulation limited to the band visible above the
    disappear-vignette. Public props are unchanged.
*/

"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

type RGB = { r: number; g: number; b: number };

interface Cell {
    char: string;
    base: RGB;
    target: RGB;
    progress: number;
}

const FONT_SIZE = 16;
const CHAR_WIDTH = 10;
const CHAR_HEIGHT = 20;
const SMOOTH_FADE_MS = 300;
// The disappear-vignette is fully opaque below 45% of the container height,
// so nothing below ~50% (45% + safety margin) can ever be seen.
const VIGNETTE_VISIBLE_FRACTION = 0.5;

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$&*()-_+=/[]{};:<>,0123456789";

const hexToRgb = (hex: string): RGB => {
    const shorthand = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthand, (_m, r, g, b) => r + r + g + g + b + b);
    const match = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return match
        ? { r: parseInt(match[1], 16), g: parseInt(match[2], 16), b: parseInt(match[3], 16) }
        : { r: 0, g: 0, b: 0 };
};

const mix = (a: RGB, b: RGB, t: number): string =>
    `rgb(${Math.round(a.r + (b.r - a.r) * t)}, ${Math.round(a.g + (b.g - a.g) * t)}, ${Math.round(a.b + (b.b - a.b) * t)})`;

const LetterGlitch = ({
    glitchColors = ["#2b4539", "#61dca3", "#61b3dc"],
    glitchSpeed = 50,
    centerVignette = false,
    outerVignette = false,
    disappeareVignette = false,
    smooth = true,
    className = "",
}: {
    glitchColors?: string[];
    glitchSpeed: number;
    centerVignette?: boolean;
    outerVignette?: boolean;
    disappeareVignette?: boolean;
    smooth: boolean;
    className?: string;
}) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const { theme } = useTheme();
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        setHydrated(true);
    }, []);

    // Stable dependency: the default array literal above would otherwise
    // recreate on every render (e.g. theme changes) and restart the effect.
    const colorsKey = glitchColors.join(",");

    useEffect(() => {
        const container = containerRef.current;
        const canvas = canvasRef.current;
        if (!container || !canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const palette = glitchColors.map(hexToRgb);
        const randChar = () => CHARS[Math.floor(Math.random() * CHARS.length)];
        const randColor = () => palette[Math.floor(Math.random() * palette.length)];
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        let cells: Cell[] = [];
        let columns = 0;
        const dirty = new Set<number>();
        let rafId: number | null = null;
        let lastGlitch = 0;
        let lastFrame = 0;
        let inView = true;

        const drawCell = (i: number) => {
            const cell = cells[i];
            const x = (i % columns) * CHAR_WIDTH;
            const y = Math.floor(i / columns) * CHAR_HEIGHT;
            ctx.clearRect(x, y, CHAR_WIDTH, CHAR_HEIGHT);
            ctx.fillStyle = mix(cell.base, cell.target, cell.progress);
            ctx.fillText(cell.char, x, y);
        };

        const resize = () => {
            const dpr = window.devicePixelRatio || 1;
            const rect = container.getBoundingClientRect();
            if (rect.width === 0 || rect.height === 0) return;
            const height = disappeareVignette ? rect.height * VIGNETTE_VISIBLE_FRACTION : rect.height;

            canvas.width = Math.floor(rect.width * dpr);
            canvas.height = Math.floor(height * dpr);
            canvas.style.width = `${rect.width}px`;
            canvas.style.height = `${height}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            ctx.font = `${FONT_SIZE}px monospace`;
            ctx.textBaseline = "top";

            columns = Math.ceil(rect.width / CHAR_WIDTH);
            const rows = Math.ceil(height / CHAR_HEIGHT);
            cells = Array.from({ length: columns * rows }, () => {
                const color = randColor();
                return { char: randChar(), base: color, target: color, progress: 1 };
            });
            dirty.clear();
            for (let i = 0; i < cells.length; i++) drawCell(i);
        };

        const glitch = () => {
            const count = Math.max(1, Math.floor(cells.length * 0.05));
            for (let n = 0; n < count; n++) {
                const i = Math.floor(Math.random() * cells.length);
                const cell = cells[i];
                cell.char = randChar();
                if (smooth) {
                    // Restart the fade from the currently displayed color.
                    cell.base = {
                        r: Math.round(cell.base.r + (cell.target.r - cell.base.r) * cell.progress),
                        g: Math.round(cell.base.g + (cell.target.g - cell.base.g) * cell.progress),
                        b: Math.round(cell.base.b + (cell.target.b - cell.base.b) * cell.progress),
                    };
                    cell.target = randColor();
                    cell.progress = 0;
                } else {
                    const color = randColor();
                    cell.base = color;
                    cell.target = color;
                    cell.progress = 1;
                }
                dirty.add(i);
            }
        };

        const step = (now: number) => {
            rafId = requestAnimationFrame(step);
            const dt = Math.min(lastFrame ? now - lastFrame : 16, 100);
            lastFrame = now;

            if (now - lastGlitch >= glitchSpeed) {
                lastGlitch = now;
                glitch();
            }

            if (smooth) {
                for (let i = 0; i < cells.length; i++) {
                    const cell = cells[i];
                    if (cell.progress < 1) {
                        cell.progress = Math.min(1, cell.progress + dt / SMOOTH_FADE_MS);
                        dirty.add(i);
                    }
                }
            }

            if (dirty.size > 0) {
                dirty.forEach(drawCell);
                dirty.clear();
            }
        };

        const stop = () => {
            if (rafId !== null) {
                cancelAnimationFrame(rafId);
                rafId = null;
            }
        };

        const start = () => {
            if (rafId === null && inView && !document.hidden && !reducedMotion) {
                lastFrame = 0;
                rafId = requestAnimationFrame(step);
            }
        };

        resize();
        start();

        const onVisibility = () => (document.hidden ? stop() : start());
        document.addEventListener("visibilitychange", onVisibility);

        const observer = new IntersectionObserver(([entry]) => {
            inView = entry.isIntersecting;
            if (inView) start();
            else stop();
        });
        observer.observe(container);

        let resizeTimeout: ReturnType<typeof setTimeout>;
        const onResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(resize, 100);
        };
        window.addEventListener("resize", onResize);

        return () => {
            stop();
            observer.disconnect();
            document.removeEventListener("visibilitychange", onVisibility);
            window.removeEventListener("resize", onResize);
            clearTimeout(resizeTimeout);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [colorsKey, glitchSpeed, smooth, disappeareVignette]);

    const containerStyle: React.CSSProperties = {
        position: "absolute",
        width: "100%",
        height: "100%",
        backgroundColor: "transparent",
        overflow: "hidden",
    };

    const outerVignetteStyle: React.CSSProperties = {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        background: "radial-gradient(circle, rgba(0,0,0,0) 60%, rgba(0,0,0,1) 100%)",
    };

    const centerVignetteStyle: React.CSSProperties = {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        background: "radial-gradient(circle, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 60%)",
    };

    const disappeareVignetteStyle: React.CSSProperties = {
        position: "absolute",
        top: "0px",
        left: "0px",
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        background: hydrated
            ? `linear-gradient(to bottom, ${
                  theme === "dark" ? "rgba(0,0,0, 0.2)" : "rgba(255,255,255, 0.2)"
              } 0%, ${theme === "dark" ? "rgba(0,0,0, 1)" : "rgba(255,255,255, 1)"} 45%)`
            : "transparent",
    };

    return (
        <div ref={containerRef} style={containerStyle} className={className}>
            <canvas ref={canvasRef} style={{ display: "block" }} />
            {outerVignette && <div style={outerVignetteStyle} />}
            {centerVignette && <div style={centerVignetteStyle} />}
            {disappeareVignette && <div style={disappeareVignetteStyle} />}
        </div>
    );
};

export default LetterGlitch;
```

Notes on intentional differences from the old file, for the reviewer:

- The old `hexToRgb` regex ran per letter per frame and choked on the
  `"rgb(...)"` strings it had itself produced (spec bug #4). Colors now live
  as `{r,g,b}` objects for the component's whole life.
- The old `drawLetters()` repainted the entire grid; `drawCell()` repaints
  one 10×20 px box, driven by the `dirty` set.
- The old `useState` re-export hack at the bottom of the file (a local
  function shadowing React's `useState`) is deleted — plain import instead.
- `canvas` inline style loses `width/height: "100%"` because `resize()` sets
  exact pixel sizes; keeping the 100% values would stretch the half-height
  canvas over the full container when `disappeareVignette` is on.
- Vignette overlay styles gain `pointerEvents: "none"` (the old
  disappear-vignette lacked it; harmless safety since these divs sit over the
  page background).

- [ ] **Step 2: Run lint**

Run: `npm run lint`
Expected: passes with no errors (warnings pre-existing elsewhere are fine).

- [ ] **Step 3: Run typecheck**

Run: `npm run typecheck`
Expected: exits 0, no output.

- [ ] **Step 4: Commit**

```bash
git add src/components/reactbits/Backgrounds/LetterGlitch/LetterGlitch.tsx
git commit -m "♻️ Rewrite LetterGlitch internals for performance"
```

---

### Task 2: Sane glitchSpeed in layout

**Files:**
- Modify: `src/app/[locale]/layout.tsx:21`

**Interfaces:**
- Consumes: `LetterGlitch` component from Task 1 (same props as before the rewrite).
- Produces: nothing new — final wiring.

- [ ] **Step 1: Change the prop**

In `src/app/[locale]/layout.tsx` line 21, change:

```tsx
            <LetterGlitch glitchSpeed={0.1} smooth={true} disappeareVignette={true} />
```

to:

```tsx
            <LetterGlitch glitchSpeed={50} smooth={true} disappeareVignette={true} />
```

Rationale: `0.1` ms meant "glitch every frame". `50` ms is the component's
own default cadence; with the 300 ms smooth fade the visual result is the
same continuous shimmer.

- [ ] **Step 2: Run lint and typecheck**

Run: `npm run lint && npm run typecheck`
Expected: both pass.

- [ ] **Step 3: Commit**

```bash
git add "src/app/[locale]/layout.tsx"
git commit -m "♻️ Use default 50ms glitch cadence for LetterGlitch"
```

---

### Task 3: Manual browser verification

**Files:**
- None modified (verification only).

**Interfaces:**
- Consumes: the running app with Tasks 1–2 applied.
- Produces: verified visual parity + measured perf improvement; fixes committed if anything is off.

- [ ] **Step 1: Start dev server**

Run: `npm run dev`
Expected: server on http://localhost:3000, no console errors.

- [ ] **Step 2: Visual parity check**

Open http://localhost:3000 (redirects to `/en`). Verify against production
(https://devmanfre.netlify.app) or memory:

- Glitch background visible behind the hero, same colors (green/blue on dark).
- Letters flicker continuously with smooth color fades (fades now actually
  complete — old code froze them after one step; slight improvement is
  expected, a wholesale different look is not).
- Vignette fade-out toward the bottom unchanged; no visible horizontal seam
  around 50% of the viewport height (canvas edge must be hidden under the
  fully opaque part of the vignette).
- Light theme (toggle in navbar): vignette fades to white, as before.
- Resize the window: grid re-fills the width, no stretching or blur.

- [ ] **Step 3: Performance check**

Chrome DevTools → Performance → record ~10 s idle on the hero:

- Scripting time attributable to the glitch loop drops by roughly an order
  of magnitude vs the same recording on production.
- No long tasks (>50 ms) from the animation loop.

- [ ] **Step 4: Pause behavior check**

- Switch to another tab for a few seconds, come back: animation resumes,
  no burst/jump (dt is clamped at 100 ms).
- DevTools → Rendering → "Emulate CSS media feature prefers-reduced-motion:
  reduce", reload: static glitch frame renders, Performance recording shows
  no recurring rAF work.

- [ ] **Step 5: Fix and commit anything found**

If any check fails, fix within the constraints of the spec and commit with
an appropriate gitmoji message; re-run Steps 2–4 until all pass.
