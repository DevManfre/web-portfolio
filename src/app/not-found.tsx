"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useTranslations } from "next-intl";
import TrueFocus from "@/components/reactbits/TextAnimations/TrueFocus/TrueFocus";
import BlurFade from "@/components/magicui/blur-fade";

export default function NotFound() {
    const speed = 0.5,
        t = useTranslations("PageNotFound"),
        delay = 0.4,
        offset = 10,
        blur = "4px";

    return (
        <div className="flex flex-col items-center justify-center">
            <BlurFade className="mt-10" duration={speed} delay={delay} yOffset={offset} blur={blur}>
                <TrueFocus
                    className="pointer-events-none"
                    wordsList={['404', t("page-not-found")]}
                    manualMode={false}
                    blurAmount={5}
                    borderColor="#00d8ff"
                    animationDuration={1}
                    pauseBetweenAnimations={1}
                />
            </BlurFade>

            <BlurFade className="mt-10" duration={speed} delay={delay * 2} yOffset={offset} blur={blur}>
                <Link href="/">
                    <Button>{t("back-to-site")}</Button>
                </Link>
            </BlurFade>
        </div>
    );
}
