// Owns the "matrix-burst" cross-component seam: the event name exists in
// exactly one place and is declared on WindowEventMap.

const MATRIX_BURST_EVENT = "matrix-burst";

declare global {
    interface WindowEventMap {
        "matrix-burst": CustomEvent<void>;
    }
}

export function dispatchMatrixBurst(): void {
    window.dispatchEvent(new CustomEvent(MATRIX_BURST_EVENT));
}

export function onMatrixBurst(handler: () => void): () => void {
    window.addEventListener(MATRIX_BURST_EVENT, handler);
    return () => window.removeEventListener(MATRIX_BURST_EVENT, handler);
}
