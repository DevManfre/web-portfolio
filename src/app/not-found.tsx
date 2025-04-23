"use client";

import GlitchText from "@/components/reactbits/TextAnimations/GlitchText/GlitchText";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useTranslations } from "next-intl";
import BlurFade from "@/components/magicui/blur-fade";

export default function NotFound() {
    const speed = 1.3,
        enableShadows = false,
        t = useTranslations(),
        delay = 0.4,
        offset = 10,
        blur = "4px";

    return (
        <div className="flex flex-col items-center justify-center">
            <BlurFade duration={speed} delay={delay} yOffset={offset} blur={blur}>
                <GlitchText speed={speed} enableShadows={enableShadows}>
                    404
                </GlitchText>
            </BlurFade>
            <BlurFade duration={speed} delay={delay * 2} yOffset={offset} blur={blur}>
                <GlitchText speed={speed} enableShadows={enableShadows}>
                    {t("PageNotFound.page-not-found")}
                </GlitchText>
            </BlurFade>

            <BlurFade duration={speed} delay={delay * 3} yOffset={offset} blur={blur} className="mt-12">
                <Link href="/">
                    <Button>{t("PageNotFound.back-to-site")}</Button>
                </Link>
            </BlurFade>
        </div>
    );
}
