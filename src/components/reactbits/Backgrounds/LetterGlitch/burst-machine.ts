// Pure, tick-driven state machine for the matrix burst. One representation
// of the burst state; the component derives CSS from the phase.

export const BURST_HOLD_MS = 5000;
export const BURST_FADE_MS = 700;
export const BURST_SPEED_DIVISOR = 5;

export type BurstPhase = "idle" | "bursting" | "fading";

export type BurstState = { phase: BurstPhase; elapsed: number };

export const initialBurst: BurstState = { phase: "idle", elapsed: 0 };

export function startBurst(state: BurstState): BurstState {
    return state.phase === "idle" ? { phase: "bursting", elapsed: 0 } : state;
}

export function tickBurst(state: BurstState, dtMs: number): BurstState {
    if (state.phase === "idle") return state;
    const elapsed = state.elapsed + dtMs;
    if (state.phase === "bursting") {
        return elapsed >= BURST_HOLD_MS ? { phase: "fading", elapsed: 0 } : { phase: "bursting", elapsed };
    }
    return elapsed >= BURST_FADE_MS ? initialBurst : { phase: "fading", elapsed };
}

export function glitchInterval(state: BurstState, baseSpeed: number): number {
    return state.phase === "idle" ? baseSpeed : baseSpeed / BURST_SPEED_DIVISOR;
}
