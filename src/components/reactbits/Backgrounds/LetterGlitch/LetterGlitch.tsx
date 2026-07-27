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
            if (cells.length === 0) return;
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
