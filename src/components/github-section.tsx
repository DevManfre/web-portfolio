import BlurFade from "@/components/magicui/blur-fade";
import { Button } from "@/components/ui/button";
import { ContributionGraph } from "@/components/contribution-graph";
import { GithubRepoCard } from "@/components/github-repo-card";
import { Icons } from "@/components/icons";
import { DATA } from "@/data/resume";
import { getGithubData } from "@/lib/github";
import { getTranslations } from "next-intl/server";

export async function GithubSection({ delay }: { delay: number }) {
    const data = await getGithubData();
    if (!data) return null;

    const t = await getTranslations("HomePage");
    const stats = [
        { label: t("github-stats-repos"), value: String(data.publicRepos) },
        { label: t("github-stats-stars"), value: String(data.totalStars) },
        { label: t("github-stats-contributions"), value: String(data.totalContributions) },
        { label: t("github-stats-top-language"), value: data.topLanguage ?? "—" },
    ];

    return (
        <section id="github">
            <div className="flex min-h-0 flex-col gap-y-3">
                <BlurFade delay={delay}>
                    <h2 className="text-xl font-bold">{t("github-title")}</h2>
                </BlurFade>
                <BlurFade delay={delay + 0.04}>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                        {stats.map((stat) => (
                            <div key={stat.label} className="rounded-lg border p-3 text-center">
                                <div className="text-2xl font-bold">{stat.value}</div>
                                <div className="text-xs text-muted-foreground">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </BlurFade>
                <BlurFade delay={delay + 0.04}>
                    <ContributionGraph weeks={data.weeks} />
                </BlurFade>
                {data.pinned.length > 0 && (
                    <BlurFade delay={delay + 0.04}>
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                            {data.pinned.map((repo) => (
                                <GithubRepoCard key={repo.url} repo={repo} />
                            ))}
                        </div>
                    </BlurFade>
                )}
                <BlurFade delay={delay + 0.04}>
                    <Button asChild variant="link" className="w-fit p-0">
                        <a href={DATA.contact.social.GitHub.url} target="_blank" rel="noopener noreferrer">
                            <Icons.github className="mr-2 size-4" />
                            {t("github-view-profile")}
                        </a>
                    </Button>
                </BlurFade>
            </div>
        </section>
    );
}
