import { ThemeProvider } from "@/components/theme-provider";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "@/app/globals.css";
import { NextIntlClientProvider } from "next-intl";

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
    description: DATA.description["en"],
    openGraph: {
        title: `${DATA.name}`,
        description: DATA.description["en"],
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
    metadata.description = DATA.description[locale as keyof typeof DATA.description];
    metadata.openGraph = metadata.openGraph ?? {};
    metadata.openGraph.description = DATA.description[locale as keyof typeof DATA.description];
    metadata.openGraph.locale = locale as string;

    return (
        <html lang={locale} suppressHydrationWarning>
            <body className={cn("min-h-screen bg-background font-sans antialiased max-w-2xl mx-auto py-12 sm:py-24 px-6", fontSans.variable)}>
                <NextIntlClientProvider>
                    <ThemeProvider attribute="class" defaultTheme="light">
                        {children}
                    </ThemeProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
