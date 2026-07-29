import type { SocialKey } from "@/data/resume";

type UmamiWindow = Window & {
    umami?: { track: (name: string, data?: Record<string, string>) => void };
};

// Event catalog: the single owner of every Umami event name and its
// property schema. The README analytics table documents this catalog.
export type AnalyticsEvents = {
    "cv-download": { source: "hero" | "terminal" };
    "theme-toggle": undefined;
    "terminal-used": undefined;
    "matrix-egg": undefined;
    "codepen-view-profile": undefined;
    "contact-linkedin": undefined;
    "contact-email": undefined;
    "social-github": undefined;
    "social-linkedin": undefined;
    "social-codepen": undefined;
    "social-email": undefined;
};

export type AnalyticsEvent = keyof AnalyticsEvents;

type EventArgs<N extends AnalyticsEvent> = AnalyticsEvents[N] extends undefined ? [name: N] : [name: N, props: AnalyticsEvents[N]];

export function trackEvent<N extends AnalyticsEvent>(...[name, props]: EventArgs<N>): void {
    if (typeof window === "undefined") return;
    (window as UmamiWindow).umami?.track(name, props);
}

// Declarative half of the seam: typed data-umami-event* attributes.
export function eventAttrs<N extends AnalyticsEvent>(...[name, props]: EventArgs<N>): Record<string, string> {
    return {
        "data-umami-event": name,
        ...Object.fromEntries(Object.entries(props ?? {}).map(([key, value]) => [`data-umami-event-${key}`, String(value)])),
    };
}

// resume.tsx data keys stop coining event names: adding a social entry
// without extending this map is a compile error.
export const SOCIAL_EVENTS = {
    GitHub: "social-github",
    LinkedIn: "social-linkedin",
    CodePen: "social-codepen",
    email: "social-email",
} as const satisfies Record<SocialKey, AnalyticsEvent>;
