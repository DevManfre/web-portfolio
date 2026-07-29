import { describe, expect, it } from "vitest";
import { eventAttrs, SOCIAL_EVENTS } from "@/lib/analytics";

describe("eventAttrs", () => {
    it("builds the base attribute", () => {
        expect(eventAttrs("theme-toggle")).toEqual({ "data-umami-event": "theme-toggle" });
    });

    it("expands props into data attributes", () => {
        expect(eventAttrs("cv-download", { source: "hero" })).toEqual({
            "data-umami-event": "cv-download",
            "data-umami-event-source": "hero",
        });
    });
});

describe("SOCIAL_EVENTS", () => {
    it("maps every social key to a catalogued event", () => {
        expect(SOCIAL_EVENTS).toEqual({
            GitHub: "social-github",
            LinkedIn: "social-linkedin",
            CodePen: "social-codepen",
            email: "social-email",
        });
    });
});
