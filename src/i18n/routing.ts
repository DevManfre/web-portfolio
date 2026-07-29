import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
    // A list of all locales that are supported
    locales: ["en", "it"],

    // Used when no locale matches
    defaultLocale: "en",
});

export type Locale = (typeof routing.locales)[number];

// Exhaustive per-locale maps: adding a locale to `routing.locales` without
// adding an entry below turns into a compile error.
export const OG_LOCALES: Record<Locale, string> = {
    en: "en_US",
    it: "it_IT",
};

export const LOCALE_PATHS: Record<Locale, string> = {
    en: "/en",
    it: "/it",
};
