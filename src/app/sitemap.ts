import type { MetadataRoute } from "next";
import { DATA } from "@/data/resume";
import { routing } from "@/i18n/routing";

export default function sitemap(): MetadataRoute.Sitemap {
    const languages = Object.fromEntries(routing.locales.map((locale) => [locale, `${DATA.url}/${locale}`]));

    return routing.locales.map((locale) => ({
        url: `${DATA.url}/${locale}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 1,
        alternates: { languages },
    }));
}
