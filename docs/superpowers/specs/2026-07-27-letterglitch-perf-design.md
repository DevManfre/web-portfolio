# LetterGlitch Performance Rewrite — Design

Date: 2026-07-27
Status: approved (pending user review)
Scope: sub-project 1 of 5 (page improvement roadmap)

## Problem

`src/components/reactbits/Backgrounds/LetterGlitch/LetterGlitch.tsx` is the
full-screen "matrix" background mounted in `src/app/[locale]/layout.tsx` and it
visibly slows the page down. Root causes:

1. `glitchSpeed={0.1}` (0.1 ms threshold) makes `updateLetters()` +
   `drawLetters()` run on **every** animation frame.
2. `drawLetters()` redraws the **entire** grid each time — on a 1920×1080
   viewport that is ~10,000 `fillText` calls per frame, doubled in device
   pixels on high-DPR screens.
3. With `smooth={true}`, `handleSmoothTransitions()` iterates every letter
   every frame, runs the `hexToRgb` regex per transitioning letter, and can
   trigger a **second** full redraw in the same frame.
4. Bug: after the first interpolation step `letter.color` becomes an
   `"rgb(...)"` string; `hexToRgb` then fails to parse it and returns `null`,
   so smooth transitions silently stop after one step. The per-frame cost
   remains.
5. The `disappeareVignette` gradient is fully opaque from 45% of the viewport
   height downward, yet the bottom ~55% of the canvas is still simulated and
   drawn.
6. The animation never pauses (hidden tab is handled by rAF itself, but there
   is no handling for reduced-motion preferences), and `prefers-reduced-motion`
   is ignored.

## Goal

Identical visual result at a fraction of the CPU cost. No look changes, no new
dependencies, component public interface unchanged.

## Non-goals

- No CSS-only or WebGL replacement (evaluated, rejected: look change /
  needless complexity).
- No changes to other animation components (`BlurFade`, `Terminal`,
  `TrueFocus`).
- No visual redesign of the background.

## Design

Single-file rewrite of the component internals, plus a one-line prop fix in
`layout.tsx`.

### 1. Precomputed palette

- Parse `glitchColors` hex strings to `{r,g,b}` objects **once** (memo on prop
  change). No regex in the hot path.
- Each cell stores `baseColor` and `targetColor` as RGB objects plus a
  `colorProgress` number. The displayed color is derived at draw time.
- This also fixes the `"rgb(...)"` re-parse bug: colors are never round-tripped
  through strings.

### 2. Dirty-cell redraw

- `updateLetters()` marks changed cell indices in a dirty set (~5% of cells
  per tick, as today).
- Smooth transitions add their in-progress cells to the same dirty set.
- Draw pass: for each dirty cell only, `clearRect` its 10×20 px box, then
  `fillText`. Full-grid redraw only on resize/init.

### 3. Frame pacing

- Glitch tick gated at `glitchSpeed` ms as today, but the default usage in
  `layout.tsx` changes from `0.1` to `50` (the component's own default).
- Smooth interpolation advances by elapsed time (delta-time), not by frame
  count, so the animation speed is refresh-rate independent (60 Hz vs 144 Hz).

### 4. Simulate only the visible band

- `disappeareVignette` is fully opaque below 45% of the container height.
  When that prop is set, the grid is computed for the top 50% of the container
  only (5% safety margin). Roughly halves cell count and draw work.
- Without the prop, full-height behavior is preserved.

### 5. Pause when invisible

- `document.visibilitychange`: stop the rAF loop while hidden, resume on
  visible.
- `IntersectionObserver` on the container: stop when scrolled fully out of
  view (defensive; the background is `position: absolute` at the top of the
  page, so it does scroll away on long pages).

### 6. Reduced motion

- If `prefers-reduced-motion: reduce`, draw one static frame and never start
  the loop.

### 7. Unchanged public interface

Props stay exactly: `glitchColors`, `glitchSpeed`, `centerVignette`,
`outerVignette`, `disappeareVignette`, `smooth`, `className`. The vendored
"Installed from reactbits.dev" header comment gains a note that the internals
were rewritten locally for performance (the file is already hand-modified —
theme-aware vignette — so it is no longer a pristine vendor copy).

## Files touched

- `src/components/reactbits/Backgrounds/LetterGlitch/LetterGlitch.tsx` —
  rewrite internals.
- `src/app/[locale]/layout.tsx` — `glitchSpeed={0.1}` → `glitchSpeed={50}`.

## Error handling

- Canvas 2D context unavailable → render nothing (current behavior, kept).
- Zero-size container → skip grid init, retry on resize (guards already
  exist, kept).

## Testing / verification

No test runner in the repo. Verification is manual + tooling:

1. `npm run lint` and `npm run typecheck` stay green.
2. `npm run dev`, open the page: background looks the same (glitch cadence,
   colors, smooth fades, vignette).
3. Chrome DevTools Performance: record 10 s idle on the hero section before
   and after; main-thread time spent in `drawLetters`/scripting should drop by
   an order of magnitude. Long tasks (>50 ms) from the background should
   disappear.
4. Toggle `prefers-reduced-motion` in DevTools rendering tab → static frame,
   no rAF activity.
5. Switch tabs / scroll to page bottom → rAF loop stops (verify via
   Performance panel or a temporary counter).

## Success criteria

- Visual parity with current background (human judgment).
- Order-of-magnitude reduction in scripting time attributable to the
  background during idle.
- Lint + typecheck green.
