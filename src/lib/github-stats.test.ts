import { describe, expect, it } from "vitest";
import { bucket, FALLBACK_LANGUAGE_COLOR, safeColor, topLanguage, totalStars } from "@/lib/github-stats";

describe("topLanguage", () => {
    it("returns the most frequent primary language", () => {
        const repos = [
            { primaryLanguage: { name: "TypeScript" } },
            { primaryLanguage: { name: "PHP" } },
            { primaryLanguage: { name: "TypeScript" } },
            { primaryLanguage: null },
        ];
        expect(topLanguage(repos)).toBe("TypeScript");
    });

    it("returns null when no repo has a language", () => {
        expect(topLanguage([{ primaryLanguage: null }])).toBeNull();
        expect(topLanguage([])).toBeNull();
    });
});

describe("totalStars", () => {
    it("sums stargazer counts", () => {
        expect(totalStars([{ stargazerCount: 3 }, { stargazerCount: 4 }])).toBe(7);
        expect(totalStars([])).toBe(0);
    });
});

describe("bucket", () => {
    it("maps counts to the five buckets at the documented thresholds", () => {
        expect(bucket(0)).toBe(0);
        expect(bucket(1)).toBe(1);
        expect(bucket(2)).toBe(1);
        expect(bucket(3)).toBe(2);
        expect(bucket(5)).toBe(2);
        expect(bucket(6)).toBe(3);
        expect(bucket(9)).toBe(3);
        expect(bucket(10)).toBe(4);
    });
});

describe("safeColor", () => {
    it("passes valid hex colors through", () => {
        expect(safeColor("#3178c6")).toBe("#3178c6");
        expect(safeColor("#fff")).toBe("#fff");
    });

    it("falls back on invalid or missing input", () => {
        expect(safeColor(null)).toBe(FALLBACK_LANGUAGE_COLOR);
        expect(safeColor("red")).toBe(FALLBACK_LANGUAGE_COLOR);
        expect(safeColor("url(javascript:x)")).toBe(FALLBACK_LANGUAGE_COLOR);
    });
});
