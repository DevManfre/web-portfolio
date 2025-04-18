"use client";

import GlitchText from "@/components/reactbits/TextAnimations/GlitchText/GlitchText";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function NotFound() {
    const speed = 1.3,
        enableShadows = false,
        t = useTranslations();

    return (
        <div className="flex flex-col items-center justify-center">
            <GlitchText speed={speed} enableShadows={enableShadows}>
                404
            </GlitchText>
            <GlitchText speed={speed} enableShadows={enableShadows}>
                {t("PageNotFound.page-not-found")}
            </GlitchText>

            <Link href="/" className="mt-12">
                <Button>{t("PageNotFound.back-to-site")}</Button>
            </Link>
        </div>
    );
}
