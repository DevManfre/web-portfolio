import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { InteractiveTerminal } from "@/components/interactive-terminal";
import { ResumeCard } from "@/components/resume-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { DATA } from "@/data/resume";
import { ProjectCard } from "@/components/project-card";
import { GithubSection } from "@/components/github-section";
import { CodepenSection } from "@/components/codepen-section";
import { getLocale, getTranslations } from "next-intl/server";

const BLUR_FADE_DELAY = 0.04;

export default async function Page() {
    const t = await getTranslations("HomePage"),
        locale = (await getLocale()) as keyof typeof DATA.description;

    return (
        <main className="flex flex-col min-h-[100dvh] space-y-10">
            <section id="hero">
                <div className="mx-auto w-full max-w-2xl space-y-8">
                    <div className="gap-2 flex justify-between">
                        <div className="flex-col flex flex-1 space-y-1.5">
                            <BlurFadeText
                                delay={BLUR_FADE_DELAY}
                                className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
                                yOffset={8}
                                text={`${t("hello-title")} ${DATA.name.split(" ")[0]}`}
                            />
                            <BlurFadeText className="max-w-[600px] md:text-xl" delay={BLUR_FADE_DELAY} text={DATA.description[locale]} />
                            <BlurFade delay={BLUR_FADE_DELAY * 2}>
                                <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1">
                                    <Button asChild size="sm">
                                        <a href={`/resumes/resume-${locale}.pdf`} download target="_blank" rel="noopener noreferrer" data-umami-event="cv-download" data-umami-event-source="hero">
                                            <Icons.cv className="mr-2 size-4" />
                                            {t("download-cv")}
                                        </a>
                                    </Button>
                                    <div className="flex gap-1">
                                        {Object.entries(DATA.contact.social).map(([name, social]) => (
                                            <Tooltip key={name}>
                                                <TooltipTrigger asChild>
                                                    <a
                                                        href={social.url}
                                                        aria-label={social.name}
                                                        target={social.url.startsWith("mailto:") ? undefined : "_blank"}
                                                        rel={social.url.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                                                        data-umami-event={`social-${name.toLowerCase()}`}
                                                        className={cn(buttonVariants({ variant: "ghost", size: "icon" }))}
                                                    >
                                                        <social.icon className="size-4" />
                                                    </a>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>{social.name}</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        ))}
                                    </div>
                                </div>
                            </BlurFade>
                        </div>
                        <BlurFade delay={BLUR_FADE_DELAY}>
                            <Avatar className="size-28 border select-none">
                                <AvatarImage alt={DATA.name} src={DATA.avatarUrl} />
                                <AvatarFallback>{DATA.initials}</AvatarFallback>
                            </Avatar>
                        </BlurFade>
                    </div>
                </div>
            </section>
            <section id="about">
                <BlurFade delay={BLUR_FADE_DELAY * 3}>
                    <h2 className="text-xl font-bold">{t("about-title")}</h2>
                    <BlurFadeText className="md:text-xl mt-2 text-justify" delay={BLUR_FADE_DELAY} text={DATA.summary[locale]} />
                </BlurFade>
            </section>
            <section id="work">
                <div className="flex min-h-0 flex-col gap-y-3">
                    <BlurFade delay={BLUR_FADE_DELAY * 5}>
                        <h2 className="text-xl font-bold">{t("work-experience-title")}</h2>
                    </BlurFade>
                    {DATA.work.map((work, id) => (
                        <BlurFade key={work.company} delay={BLUR_FADE_DELAY * 6 + id * 0.05}>
                            <ResumeCard
                                key={work.company}
                                logoUrl={work.logoUrl}
                                altText={work.company}
                                title={work.company}
                                subtitle={work.title[locale]}
                                href={work.href}
                                badges={work.badges}
                                start={work.start}
                                end={work.end}
                                description={(work.description as Record<keyof typeof DATA.description, string>)[locale]}
                                defaultExpanded
                                timeline={id === 0 ? "first" : id === DATA.work.length - 1 ? "last" : "middle"}
                            />
                        </BlurFade>
                    ))}
                </div>
            </section>
            <section id="education">
                <div className="flex min-h-0 flex-col gap-y-3">
                    <BlurFade delay={BLUR_FADE_DELAY * 7}>
                        <h2 className="text-xl font-bold">{t("education-title")}</h2>
                    </BlurFade>
                    {DATA.education.map((education, id) => (
                        <BlurFade key={education.school} delay={BLUR_FADE_DELAY * 8 + id * 0.05}>
                            <ResumeCard
                                key={education.school}
                                href={education.href}
                                logoUrl={education.logoUrl}
                                altText={education.school}
                                title={education.school}
                                subtitle={education.degree[locale]}
                                start={education.start}
                                end={education.end}
                            />
                        </BlurFade>
                    ))}
                </div>
                <BlurFade delay={BLUR_FADE_DELAY * 7}>
                    <InteractiveTerminal locale={locale} />
                </BlurFade>
            </section>
            <section id="skills">
                <div className="flex min-h-0 flex-col gap-y-3">
                    <BlurFade delay={BLUR_FADE_DELAY * 9}>
                        <h2 className="text-xl font-bold">{t("skills-title")}</h2>
                    </BlurFade>
                    <div className="flex flex-wrap gap-1">
                        {DATA.skills.map((skill, id) => (
                            <BlurFade key={skill} delay={BLUR_FADE_DELAY * 10 + id * 0.05}>
                                <Badge className="select-none" key={skill}>
                                    {skill}
                                </Badge>
                            </BlurFade>
                        ))}
                    </div>
                </div>
            </section>
            <section id="languages">
                <div className="flex min-h-0 flex-col gap-y-3">
                    <BlurFade delay={BLUR_FADE_DELAY * 10}>
                        <h2 className="text-xl font-bold">{t("languages-title")}</h2>
                    </BlurFade>
                    <div className="flex flex-wrap gap-1">
                        {DATA.languages.map((language, id) => (
                            <BlurFade key={language.name.en} delay={BLUR_FADE_DELAY * 11 + id * 0.05}>
                                <Badge className="select-none">{`${language.name[locale]} — ${language.level[locale]}`}</Badge>
                            </BlurFade>
                        ))}
                    </div>
                </div>
            </section>
            <section id="certifications">
                <div className="flex min-h-0 flex-col gap-y-3">
                    <BlurFade delay={BLUR_FADE_DELAY * 11}>
                        <h2 className="text-xl font-bold">{t("certifications-title")}</h2>
                    </BlurFade>
                    {DATA.certifications.map((certification, id) => (
                        <BlurFade key={certification.name} delay={BLUR_FADE_DELAY * 12 + id * 0.05}>
                            <ResumeCard
                                href={certification.href}
                                logoUrl={certification.logoUrl}
                                altText={certification.issuer}
                                title={certification.name}
                                subtitle={certification.issuer}
                                start={certification.start}
                                end={certification.end}
                            />
                        </BlurFade>
                    ))}
                </div>
            </section>
            <GithubSection delay={BLUR_FADE_DELAY * 12} />
            <CodepenSection delay={BLUR_FADE_DELAY * 12} />
            <section id="projects">
                <div className="space-y-12 w-full py-12">
                    <BlurFade delay={BLUR_FADE_DELAY * 12}>
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="space-y-2">
                                <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">{t("projects-title")}</div>
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">{t("projects-subtitle")}</h2>
                                {/* <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                    I&apos;ve worked on a variety of projects, from simple websites to complex web applications. Here are a few of my favorites.
                                </p> */}
                            </div>
                        </div>
                    </BlurFade>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-[800px] mx-auto">
                        {DATA.projects.map((project, id) => (
                            <BlurFade key={project.title} delay={BLUR_FADE_DELAY * 13 + id * 0.05}>
                                <ProjectCard
                                    href={project.href}
                                    key={project.title}
                                    title={project.title}
                                    description={project.description[locale]}
                                    start={project.start}
                                    end={project.end}
                                    tags={project.technologies}
                                    image={project.image}
                                    video={project.video}
                                    links={project.links}
                                />
                            </BlurFade>
                        ))}
                    </div>
                </div>
            </section>
            <section id="contact">
                <div className="grid items-center justify-center gap-4 px-4 text-center md:px-6 w-full py-12">
                    <BlurFade delay={BLUR_FADE_DELAY * 16}>
                        <div className="space-y-3">
                            <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">{t("contact-title")}</div>
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">{t("contact-subtitle")}</h2>
                            <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                {t("contact-lead")}
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                                <Button asChild>
                                    <a href={DATA.contact.social.LinkedIn.url} target="_blank" rel="noopener noreferrer" data-umami-event="contact-linkedin">
                                        <Icons.linkedin className="mr-2 size-4" />
                                        {t("contact-linkedin")}
                                    </a>
                                </Button>
                                <Button asChild variant="outline">
                                    <a href={DATA.contact.social.email.url} data-umami-event="contact-email">
                                        <Icons.email className="mr-2 size-4" />
                                        {t("contact-email")}
                                    </a>
                                </Button>
                            </div>
                        </div>
                    </BlurFade>
                </div>
            </section>
        </main>
    );
}
