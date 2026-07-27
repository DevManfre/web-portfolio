import type { MetadataRoute } from "next";
import { DATA } from "@/data/resume";

export default function sitemap(): MetadataRoute.Sitemap {
    const languages = {
        en: `${DATA.url}/en`,
        it: `${DATA.url}/it`,
    };

    return [
        {
            url: `${DATA.url}/en`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 1,
            alternates: { languages },
        },
        {
            url: `${DATA.url}/it`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 1,
            alternates: { languages },
        },
    ];
}
