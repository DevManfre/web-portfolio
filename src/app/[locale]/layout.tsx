import Navbar from "@/components/navbar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import LetterGlitch from "@/components/reactbits/Backgrounds/LetterGlitch/LetterGlitch";
import { DATA } from "@/data/resume";

export default async function RootLayout({
    children,
    params,
}: Readonly<{
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}>) {
    // Ensure that the incoming `locale` is valid
    const { locale } = await params;
    if (!hasLocale(routing.locales, locale)) notFound();

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Person",
        name: DATA.name,
        url: DATA.url,
        jobTitle: "Full Stack Developer",
        image: `${DATA.url}${DATA.avatarUrl}`,
        sameAs: [DATA.contact.social.GitHub.url, DATA.contact.social.LinkedIn.url, DATA.contact.social.CodePen.url],
        alumniOf: {
            "@type": "CollegeOrUniversity",
            name: "Università degli Studi di Modena e Reggio Emilia",
        },
    };

    return (
        <TooltipProvider delayDuration={0}>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
            <LetterGlitch glitchSpeed={50} smooth={true} disappeareVignette={true} />
            <div className="max-w-2xl mx-auto py-12 sm:py-24 px-6 relative">
                {children}
                <Navbar />
            </div>
        </TooltipProvider>
    );
}
