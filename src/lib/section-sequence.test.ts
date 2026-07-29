import { describe, expect, it } from "vitest";
import { SECTION_SEQUENCE, sectionDelay } from "@/lib/section-sequence";

describe("sectionDelay", () => {
    it("is strictly monotonic along the sequence", () => {
        const delays = SECTION_SEQUENCE.map((id) => sectionDelay(id));
        for (let i = 1; i < delays.length; i++) {
            expect(delays[i]).toBeGreaterThan(delays[i - 1]);
        }
    });

    it("has no collisions", () => {
        const delays = SECTION_SEQUENCE.map((id) => sectionDelay(id));
        expect(new Set(delays).size).toBe(delays.length);
    });
});
