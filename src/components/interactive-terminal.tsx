"use client";

import { AnimatedSpan, Terminal, TypingAnimation } from "@/components/magicui/terminal";
import { DATA } from "@/data/resume";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

type HistoryEntry = {
    input: string;
    output: React.ReactNode[];
};

const HISTORY_CAP = 50;
const PROMPT = "visitor@devmanfre:~$";

const HELP: [string, string][] = [
    ["whoami", "terminal-help-whoami"],
    ["skills", "terminal-help-skills"],
    ["languages", "terminal-help-languages"],
    ["certs", "terminal-help-certs"],
    ["projects", "terminal-help-projects"],
    ["contact", "terminal-help-contact"],
    ["cv", "terminal-help-cv"],
    ["clear", "terminal-help-clear"],
];

export function InteractiveTerminal({ locale }: { locale: "en" | "it" }) {
    const t = useTranslations("HomePage");
    const [ready, setReady] = useState(false);
    const [history, setHistory] = useState<HistoryEntry[]>([]);
    const [input, setInput] = useState("");
    const inputRef = useRef<HTMLInputElement | null>(null);
    const endRef = useRef<HTMLDivElement | null>(null);

    // Scripted intro, moved verbatim from page.tsx (accumulated delays).
    let delayCount = 0;
    const intro = DATA.terminal.map((text, id) => {
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
    const totalIntroDelay = delayCount;

    useEffect(() => {
        const timer = setTimeout(() => setReady(true), totalIntroDelay + 500);
        return () => clearTimeout(timer);
    }, [totalIntroDelay]);

    useEffect(() => {
        endRef.current?.scrollIntoView({ block: "nearest" });
    }, [history]);

    const runCommand = (raw: string): React.ReactNode[] | "clear" => {
        const trimmed = raw.trim();
        const lower = trimmed.toLowerCase();
        const [cmd, ...args] = lower.split(/\s+/);

        if (lower === "rm -rf /") return [t("terminal-rm")];
        if (cmd === "sudo") {
            if (args[0] === "matrix") {
                // "matrix-burst" event contract: see docs/superpowers/specs/2026-07-28-interactive-terminal-design.md
                window.dispatchEvent(new CustomEvent("matrix-burst"));
                return ["Wake up, Neo…"];
            }
            return [t("terminal-sudo")];
        }
        switch (cmd) {
            case "help":
                return [t("terminal-help-intro"), ...HELP.map(([name, key]) => `  ${name.padEnd(11)}${t(key)}`)];
            case "whoami":
                return [`${DATA.name} — Full Stack Developer`];
            case "skills":
                return [DATA.skills.join(", ")];
            case "languages":
                return DATA.languages.map((language) => `${language.name[locale]} — ${language.level[locale]}`);
            case "certs":
                return DATA.certifications.map((cert) => `${cert.name} (${cert.issuer}, ${cert.start}–${cert.end})`);
            case "projects":
                return DATA.projects.map((project) => `${project.title} — ${project.href}`);
            case "contact":
                return [
                    <a key="email" href={DATA.contact.social.email.url} className="underline">
                        {DATA.contact.email}
                    </a>,
                    <a key="linkedin" href={DATA.contact.social.LinkedIn.url} target="_blank" rel="noopener noreferrer" className="underline">
                        LinkedIn
                    </a>,
                    <a key="github" href={DATA.contact.social.GitHub.url} target="_blank" rel="noopener noreferrer" className="underline">
                        GitHub
                    </a>,
                ];
            case "cv": {
                const anchor = document.createElement("a");
                anchor.href = `/resumes/resume-${locale}.pdf`;
                anchor.download = "";
                document.body.appendChild(anchor);
                anchor.click();
                anchor.remove();
                return [t("terminal-cv-ok")];
            }
            case "clear":
                return "clear";
            case "ls":
                return [t("terminal-ls")];
            case "pwd":
                return ["/home/visitor/devmanfre"];
            case "exit":
                return [t("terminal-exit")];
            default:
                return [t("terminal-not-found", { cmd })];
        }
    };

    const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key !== "Enter") return;
        const value = input;
        setInput("");
        if (value.trim() === "") {
            setHistory((prev) => [...prev, { input: value, output: [] }].slice(-HISTORY_CAP));
            return;
        }
        const result = runCommand(value);
        if (result === "clear") {
            setHistory([]);
            return;
        }
        setHistory((prev) => [...prev, { input: value, output: result }].slice(-HISTORY_CAP));
    };

    return (
        <div onClick={() => inputRef.current?.focus()}>
            <Terminal className="min-w-[300px] min-h-[192px] mt-4 cursor-text">
                {intro}
                {ready && (
                    <div className="select-text" role="log" aria-live="polite">
                        {history.map((entry, id) => (
                            <div key={id}>
                                <div>
                                    <span className="dark:text-green-400 text-green-700">{PROMPT}</span> {entry.input}
                                </div>
                                {entry.output.map((node, nodeId) => (
                                    <div key={nodeId}>{node}</div>
                                ))}
                            </div>
                        ))}
                    </div>
                )}
                {ready && (
                    <div className="flex items-center gap-2">
                        <span className="dark:text-green-400 text-green-700">{PROMPT}</span>
                        <input
                            ref={inputRef}
                            value={input}
                            onChange={(event) => setInput(event.target.value)}
                            onKeyDown={onKeyDown}
                            aria-label="Terminal input"
                            className="flex-1 bg-transparent text-sm tracking-tight outline-none border-none caret-green-500"
                            autoCapitalize="none"
                            autoComplete="off"
                            autoCorrect="off"
                            spellCheck={false}
                        />
                    </div>
                )}
                <div ref={endRef} />
            </Terminal>
        </div>
    );
}
