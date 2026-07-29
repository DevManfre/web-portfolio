import BlurFade from "@/components/magicui/blur-fade";
import { Button } from "@/components/ui/button";
import { CodepenEmbed } from "@/components/codepen-embed";
import { Icons } from "@/components/icons";
import { DATA } from "@/data/resume";
import { eventAttrs } from "@/lib/analytics";
import { getTranslations } from "next-intl/server";

export async function CodepenSection({ delay }: { delay: number }) {
    if (DATA.codepens.length === 0) return null;

    const t = await getTranslations("HomePage");

    return (
        <section id="codepen">
            <div className="flex min-h-0 flex-col gap-y-3">
                <BlurFade delay={delay}>
                    <h2 className="text-xl font-bold">{t("codepen-title")}</h2>
                </BlurFade>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {DATA.codepens.map((pen, id) => (
                        <BlurFade key={pen.slug} delay={delay + 0.04 + id * 0.05}>
                            <CodepenEmbed title={pen.title} slug={pen.slug} />
                        </BlurFade>
                    ))}
                </div>
                <BlurFade delay={delay + 0.04}>
                    <Button asChild variant="link" className="w-fit p-0">
                        <a
                            href={DATA.contact.social.CodePen.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            {...eventAttrs("codepen-view-profile")}
                        >
                            <Icons.codepen className="mr-2 size-4" />
                            {t("codepen-view-profile")}
                        </a>
                    </Button>
                </BlurFade>
            </div>
        </section>
    );
}
