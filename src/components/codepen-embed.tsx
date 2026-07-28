"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { DATA } from "@/data/resume";

export function CodepenEmbed({ title, slug }: { title: string; slug: string }) {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    const themeId = mounted && resolvedTheme === "light" ? "light" : "dark";

    return (
        <iframe
            title={title}
            src={`https://codepen.io/${DATA.username}/embed/preview/${slug}?default-tab=result&theme-id=${themeId}`}
            loading="lazy"
            allowFullScreen
            className="h-[400px] w-full rounded-lg border"
        />
    );
}
