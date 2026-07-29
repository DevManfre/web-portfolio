import { describe, expect, it } from "vitest";
import {
    BURST_FADE_MS,
    BURST_HOLD_MS,
    BURST_SPEED_DIVISOR,
    glitchInterval,
    initialBurst,
    startBurst,
    tickBurst,
} from "@/components/reactbits/Backgrounds/LetterGlitch/burst-machine";

describe("burst machine", () => {
    it("starts only from idle", () => {
        const started = startBurst(initialBurst);
        expect(started.phase).toBe("bursting");
        expect(startBurst(started)).toBe(started);
    });

    it("holds, fades, then returns to idle on ticks", () => {
        let state = startBurst(initialBurst);
        state = tickBurst(state, BURST_HOLD_MS - 1);
        expect(state.phase).toBe("bursting");
        state = tickBurst(state, 1);
        expect(state.phase).toBe("fading");
        state = tickBurst(state, BURST_FADE_MS - 1);
        expect(state.phase).toBe("fading");
        state = tickBurst(state, 1);
        expect(state).toEqual(initialBurst);
    });

    it("ignores ticks while idle", () => {
        expect(tickBurst(initialBurst, 1000)).toBe(initialBurst);
    });

    it("speeds up glitching while active", () => {
        expect(glitchInterval(initialBurst, 50)).toBe(50);
        expect(glitchInterval(startBurst(initialBurst), 50)).toBe(50 / BURST_SPEED_DIVISOR);
    });
});
