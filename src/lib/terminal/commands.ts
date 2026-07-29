import { DATA } from "@/data/resume";
import type { Locale } from "@/i18n/routing";

// Pure command module: returns data, never touches the DOM, analytics or
// React. The component adapter renders lines and executes effects.

export type TerminalLine =
    | { kind: "text"; text: string }
    | { kind: "i18n"; key: string; params?: Record<string, string> }
    | { kind: "help"; name: string; key: string }
    | { kind: "link"; label: string; href: string; external: boolean };

export type TerminalEffect = "clear" | "matrix-burst" | "download-cv";

export type CommandResult = {
    lines: TerminalLine[];
    effect?: TerminalEffect;
};

type CommandContext = { locale: Locale; args: string[] };

type CommandSpec = {
    // i18n key shown by `help`; entries without helpKey are hidden easter eggs.
    helpKey?: string;
    run: (ctx: CommandContext) => CommandResult;
};

const text = (value: string): TerminalLine => ({ kind: "text", text: value });
const i18n = (key: string, params?: Record<string, string>): TerminalLine => ({ kind: "i18n", key, params });

// Insertion order is the `help` display order.
export const COMMANDS: Record<string, CommandSpec> = {
    whoami: {
        helpKey: "terminal-help-whoami",
        run: () => ({ lines: [text(`${DATA.name} — Full Stack Developer`)] }),
    },
    skills: {
        helpKey: "terminal-help-skills",
        run: () => ({ lines: [text(DATA.skills.join(", "))] }),
    },
    languages: {
        helpKey: "terminal-help-languages",
        run: ({ locale }) => ({ lines: DATA.languages.map((language) => text(`${language.name[locale]} — ${language.level[locale]}`)) }),
    },
    certs: {
        helpKey: "terminal-help-certs",
        run: () => ({ lines: DATA.certifications.map((cert) => text(`${cert.name} (${cert.issuer}, ${cert.start}–${cert.end})`)) }),
    },
    projects: {
        helpKey: "terminal-help-projects",
        run: () => ({ lines: DATA.projects.map((project) => text(`${project.title} — ${project.href}`)) }),
    },
    contact: {
        helpKey: "terminal-help-contact",
        run: () => ({
            lines: [
                { kind: "link", label: DATA.contact.email, href: DATA.contact.social.email.url, external: false },
                { kind: "link", label: "LinkedIn", href: DATA.contact.social.LinkedIn.url, external: true },
                { kind: "link", label: "GitHub", href: DATA.contact.social.GitHub.url, external: true },
            ],
        }),
    },
    cv: {
        helpKey: "terminal-help-cv",
        run: () => ({ lines: [i18n("terminal-cv-ok")], effect: "download-cv" }),
    },
    clear: {
        helpKey: "terminal-help-clear",
        run: () => ({ lines: [], effect: "clear" }),
    },
    ls: { run: () => ({ lines: [i18n("terminal-ls")] }) },
    pwd: { run: () => ({ lines: [text("/home/visitor/devmanfre")] }) },
    exit: { run: () => ({ lines: [i18n("terminal-exit")] }) },
};

function helpResult(): CommandResult {
    const entries = Object.entries(COMMANDS).flatMap(([name, spec]): TerminalLine[] =>
        spec.helpKey ? [{ kind: "help", name, key: spec.helpKey }] : []
    );
    return { lines: [i18n("terminal-help-intro"), ...entries] };
}

export function runCommand(raw: string, locale: Locale): CommandResult {
    const trimmed = raw.trim();
    const lower = trimmed.toLowerCase();
    const [cmd, ...args] = lower.split(/\s+/);
    const typedCmd = trimmed.split(/\s+/)[0] ?? "";

    if (lower === "rm -rf /") return { lines: [i18n("terminal-rm")] };
    if (cmd === "sudo") {
        if (args[0] === "matrix") return { lines: [text("Wake up, Neo…")], effect: "matrix-burst" };
        return { lines: [i18n("terminal-sudo")] };
    }
    if (cmd === "help") return helpResult();

    const spec = COMMANDS[cmd];
    if (!spec) return { lines: [i18n("terminal-not-found", { cmd: typedCmd })] };
    return spec.run({ locale, args });
}
