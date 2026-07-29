"use client";

import { AnimatedSpan, Terminal, TypingAnimation } from "@/components/magicui/terminal";
import { trackEvent } from "@/lib/analytics";
import { runCommand, type TerminalEffect, type TerminalLine } from "@/lib/terminal/commands";
import { DATA } from "@/data/resume";
import type { Locale } from "@/i18n/routing";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useRef, useState } from "react";

type HistoryEntry = {
    input: string;
    lines: TerminalLine[];
};

const HISTORY_CAP = 50;
const PROMPT = "visitor@devmanfre:~$";

function LineContent({ line }: { line: TerminalLine }) {
    const t = useTranslations("HomePage");
    switch (line.kind) {
        case "text":
            return <>{line.text}</>;
        case "i18n":
            return <>{t(line.key, line.params)}</>;
        case "help":
            return <>{`  ${line.name.padEnd(11)}${t(line.key)}`}</>;
        case "link":
            return (
                <a
                    href={line.href}
                    target={line.external ? "_blank" : undefined}
                    rel={line.external ? "noopener noreferrer" : undefined}
                    className="underline"
                >
                    {line.label}
                </a>
            );
    }
}

export function InteractiveTerminal({ locale }: { locale: Locale }) {
    const [ready, setReady] = useState(false);
    const [history, setHistory] = useState<HistoryEntry[]>([]);
    const [input, setInput] = useState("");
    const [introCleared, setIntroCleared] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const endRef = useRef<HTMLDivElement | null>(null);
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const trackedUseRef = useRef(false);
    const [shellHeight, setShellHeight] = useState<number | "auto">("auto");

    // Scripted intro, moved verbatim from page.tsx (accumulated delays).
    const { intro, totalIntroDelay } = useMemo(() => {
        let delayCount = 0;
        const nodes = DATA.terminal.map((text, id) => {
            const delay = delayCount;
            if (id % 2 === 0) {
                delayCount += text.length * 100;
                return (
                    <TypingAnimation key={id} delay={delay}>
                        {text}
                    </TypingAnimation>
                );
            }
            delayCount += 300;
            return (
                <AnimatedSpan key={id} delay={delay} className="dark:text-green-400 text-green-700">
                    {text}
                </AnimatedSpan>
            );
        });
        return { intro: nodes, totalIntroDelay: delayCount };
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => setReady(true), totalIntroDelay + 500);
        return () => clearTimeout(timer);
    }, [totalIntroDelay]);

    useEffect(() => {
        if (history.length === 0) return;
        endRef.current?.scrollIntoView({ block: "nearest" });
    }, [history]);

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;
        const observer = new ResizeObserver(() => setShellHeight(el.offsetHeight));
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    const runEffect = (effect: TerminalEffect) => {
        switch (effect) {
            case "clear":
                setHistory([]);
                setIntroCleared(true);
                return;
            case "matrix-burst":
                // "matrix-burst" event contract: see docs/superpowers/specs/2026-07-28-interactive-terminal-design.md
                window.dispatchEvent(new CustomEvent("matrix-burst"));
                trackEvent("matrix-egg");
                return;
            case "download-cv": {
                const anchor = document.createElement("a");
                anchor.href = `/resumes/resume-${locale}.pdf`;
                anchor.download = "";
                document.body.appendChild(anchor);
                anchor.click();
                anchor.remove();
                trackEvent("cv-download", { source: "terminal" });
                return;
            }
        }
    };

    const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key !== "Enter" || event.nativeEvent.isComposing) return;
        const value = input;
        setInput("");
        if (value.trim() === "") {
            setHistory((prev) => [...prev, { input: value, lines: [] }].slice(-HISTORY_CAP));
            return;
        }
        if (!trackedUseRef.current) {
            trackedUseRef.current = true;
            trackEvent("terminal-used");
        }
        const result = runCommand(value, locale);
        if (result.effect === "clear") {
            runEffect("clear");
            return;
        }
        if (result.effect) runEffect(result.effect);
        setHistory((prev) => [...prev, { input: value, lines: result.lines }].slice(-HISTORY_CAP));
    };

    return (
        <div
            onClick={() => {
                if (window.getSelection()?.toString()) return;
                inputRef.current?.focus();
            }}
        >
            <Terminal className="min-w-[300px] min-h-[192px] mt-4 cursor-text">
                <motion.div initial={false} animate={{ height: shellHeight }} transition={{ duration: 0.3, ease: "easeOut" }} style={{ overflow: "hidden" }}>
                    <div ref={scrollRef} className="grid gap-y-1 max-h-[320px] overflow-y-auto select-text text-sm font-normal tracking-tight">
                        {!introCleared && intro}
                        {ready && (
                            <div role="log" aria-live="polite">
                                {history.map((entry, id) => (
                                    <div key={id}>
                                        <div>
                                            <span className="dark:text-green-400 text-green-700">{PROMPT}</span> {entry.input}
                                        </div>
                                        {entry.lines.map((line, lineId) => (
                                            <div key={lineId}>
                                                <LineContent line={line} />
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        )}
                        {ready && (
                            <AnimatedSpan delay={0} className="flex items-center gap-2">
                                <span className="dark:text-green-400 text-green-700">{PROMPT}</span>
                                <input
                                    ref={inputRef}
                                    value={input}
                                    onChange={(event) => setInput(event.target.value)}
                                    onKeyDown={onKeyDown}
                                    aria-label="Terminal input"
                                    className="flex-1 bg-transparent text-sm tracking-tight outline-none border-none caret-green-500 select-text"
                                    enterKeyHint="go"
                                    autoCapitalize="none"
                                    autoComplete="off"
                                    autoCorrect="off"
                                    spellCheck={false}
                                />
                            </AnimatedSpan>
                        )}
                        <div ref={endRef} />
                    </div>
                </motion.div>
            </Terminal>
        </div>
    );
}
