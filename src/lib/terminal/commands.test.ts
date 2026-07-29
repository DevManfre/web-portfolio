import { describe, expect, it } from "vitest";
import { COMMANDS, runCommand } from "@/lib/terminal/commands";

describe("runCommand", () => {
    it("derives help entries from the registry", () => {
        const { lines } = runCommand("help", "en");
        expect(lines[0]).toEqual({ kind: "i18n", key: "terminal-help-intro" });
        const helpNames = lines.flatMap((line) => (line.kind === "help" ? [line.name] : []));
        const documented = Object.entries(COMMANDS)
            .filter(([, spec]) => spec.helpKey)
            .map(([name]) => name);
        expect(helpNames).toEqual(documented);
        expect(helpNames.length).toBeGreaterThanOrEqual(8);
    });

    it("is case-insensitive on the command but preserves typed case in not-found", () => {
        expect(runCommand("PWD", "en").lines).toEqual([{ kind: "text", text: "/home/visitor/devmanfre" }]);
        expect(runCommand("FooBar", "en").lines).toEqual([
            { kind: "i18n", key: "terminal-not-found", params: { cmd: "FooBar" } },
        ]);
    });

    it("returns the clear effect", () => {
        expect(runCommand("clear", "en").effect).toBe("clear");
    });

    it("handles the sudo and rm easter eggs", () => {
        expect(runCommand("rm -rf /", "en").lines).toEqual([{ kind: "i18n", key: "terminal-rm" }]);
        expect(runCommand("sudo apt update", "en").lines).toEqual([{ kind: "i18n", key: "terminal-sudo" }]);
        const matrix = runCommand("sudo matrix", "en");
        expect(matrix.effect).toBe("matrix-burst");
        expect(matrix.lines).toEqual([{ kind: "text", text: "Wake up, Neo…" }]);
    });

    it("returns the download effect for cv", () => {
        const result = runCommand("cv", "en");
        expect(result.effect).toBe("download-cv");
        expect(result.lines).toEqual([{ kind: "i18n", key: "terminal-cv-ok" }]);
    });

    it("localizes data-driven output", () => {
        const en = runCommand("languages", "en").lines;
        const it = runCommand("languages", "it").lines;
        expect(en).not.toEqual(it);
        expect(en.every((line) => line.kind === "text")).toBe(true);
    });

    it("renders contact as links", () => {
        const { lines } = runCommand("contact", "en");
        expect(lines).toHaveLength(3);
        expect(lines.every((line) => line.kind === "link")).toBe(true);
    });

    it("every registry entry returns lines or an effect", () => {
        for (const [name, spec] of Object.entries(COMMANDS)) {
            const result = spec.run({ locale: "en", args: [] });
            expect(result.lines.length > 0 || result.effect !== undefined, name).toBe(true);
        }
    });
});
