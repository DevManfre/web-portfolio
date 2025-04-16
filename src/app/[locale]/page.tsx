import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { AnimatedSpan, Terminal, TypingAnimation } from "@/components/magicui/terminal";
import { ResumeCard } from "@/components/resume-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DATA } from "@/data/resume";
import { ProjectCard } from "@/components/project-card";
import { getLocale, getTranslations } from "next-intl/server";

const BLUR_FADE_DELAY = 0.04;

export default async function Page() {
    let terminalDelayCount = 0;
    const t = await getTranslations("HomePage"),
        locale = await getLocale() as keyof typeof DATA.description;
    
    /* TODO: guardare grandi componenti in react per ottenere un effetto visivo migliore */

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
                                text={`${t("hello-title")} ${DATA.name.split(" ")[0]} 👋`}
                            />
                            <BlurFadeText className="max-w-[600px] md:text-xl" delay={BLUR_FADE_DELAY} text={DATA.description[locale]} />
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
                    <Terminal className="min-w-[300px] min-h-[192px] mt-4">
                        {DATA.terminal.map((text, id) => {
                            const actualTerminalDelayCount = terminalDelayCount;
                            if (id % 2 == 0) {
                                terminalDelayCount += text.length * 100;
                                return (
                                    <TypingAnimation key={id} delay={actualTerminalDelayCount}>
                                        {text}
                                    </TypingAnimation>
                                );
                            }
                            terminalDelayCount += 300;
                            return (
                                <AnimatedSpan key={id} delay={actualTerminalDelayCount} className="dark:text-green-500 text-green-700">
                                    {text}
                                </AnimatedSpan>
                            );
                        })}
                    </Terminal>
                </BlurFade>
            </section>
            <section id="skills">
                <div className="flex min-h-0 flex-col gap-y-3">
                    <BlurFade delay={BLUR_FADE_DELAY * 9}>
                        {/* TODO: aggiungere animazione quando vado sopra si deve vedere l'icona della tech */}
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
            <section id="projects">
                <div className="space-y-12 w-full py-12">
                    <BlurFade delay={BLUR_FADE_DELAY * 11}>
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
                            <BlurFade key={project.title} delay={BLUR_FADE_DELAY * 12 + id * 0.05}>
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
                                {t("contact-text-1")}&nbsp;
                                <a href={DATA.contact.social.LinkedIn.url} target="about:blank">
                                    <Button variant="link" className="p-0 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                        dm
                                    </Button>
                                </a>
                                &nbsp;{t("contact-text-2")}&nbsp;
                                <Button variant="link" className="p-0 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                    <a href={DATA.contact.social.email.url} target="about:blank">
                                        email
                                    </a>{" "}
                                </Button>
                                &nbsp;{t("contact-text-3")}
                            </p>
                        </div>
                    </BlurFade>
                </div>
            </section>
        </main>
    );
}
