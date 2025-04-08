import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { ScrollProgress } from "@/components/magicui/scroll-progress";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
});

export const metadata: Metadata = {
    metadataBase: new URL(DATA.url),
    title: {
        default: DATA.username,
        template: `%s | ${DATA.name}`,
    },
    description: DATA.description,
    openGraph: {
        title: `${DATA.name}`,
        description: DATA.description,
        url: DATA.url,
        siteName: `${DATA.name}`,
        locale: "en_US",
        type: "website",
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    verification: {
        google: "",
        yandex: "",
    },
};

export default async function RootLayout({
    children,
    params,
}: Readonly<{
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}>) {
    // Ensure that the incoming `locale` is valid
    const { locale } = await params;
    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }

    return (
        <html lang={locale} suppressHydrationWarning>
            <body className={cn("min-h-screen bg-background font-sans antialiased max-w-2xl mx-auto py-12 sm:py-24 px-6", fontSans.variable)}>
                <NextIntlClientProvider>
                    <ThemeProvider attribute="class" defaultTheme="light">
                        <TooltipProvider delayDuration={0}>
                            <ScrollProgress className="max-sm:hidden" />
                            {children}
                            <Navbar />
                        </TooltipProvider>
                    </ThemeProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
