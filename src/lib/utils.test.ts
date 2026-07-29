import { describe, expect, it } from "vitest";
import { formatDate, formatPeriod } from "@/lib/utils";

describe("formatDate", () => {
    it("formats a bare year", () => {
        expect(formatDate("2017", "en")).toBe("2017");
    });

    it("formats month/year per locale, capitalized", () => {
        expect(formatDate("04/2017", "en")).toBe("Apr 2017");
        expect(formatDate("02/2024", "it")).toBe("Feb 2024");
    });

    it("formats comma-separated lists", () => {
        expect(formatDate("2017,2019", "en")).toBe("2017, 2019");
    });

    it("returns the empty string for the empty sentinel", () => {
        expect(formatDate("", "en")).toBe("");
    });
});

describe("formatPeriod", () => {
    it("joins start and end", () => {
        expect(formatPeriod("04/2017", "2019", "en", "Current")).toBe("Apr 2017 - 2019");
    });

    it("uses the current label for the current sentinel", () => {
        expect(formatPeriod("02/2024", "current", "en", "Current")).toBe("Feb 2024 - Current");
        expect(formatPeriod("02/2024", "current", "it", "Attuale")).toBe("Feb 2024 - Attuale");
    });

    it("returns only the start when end is empty", () => {
        expect(formatPeriod("2017", "", "en", "Current")).toBe("2017");
    });
});
