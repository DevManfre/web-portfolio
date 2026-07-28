type UmamiWindow = Window & {
    umami?: { track: (name: string, data?: Record<string, string>) => void };
};

export function trackEvent(name: string, data?: Record<string, string>): void {
    if (typeof window === "undefined") return;
    (window as UmamiWindow).umami?.track(name, data);
}
