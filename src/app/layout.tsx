import { ThemeProvider } from "@/components/theme-provider";
import { DATA } from "@/data/resume";
import type { Metadata } from "next";
import "@/app/globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
    const locale = await getLocale() as keyof typeof DATA.description;
    
    return {
        metadataBase: new URL(DATA.url),
        title: {
            default: DATA.username,
            template: `%s | ${DATA.name}`,
        },
        description: DATA.description[locale],
        openGraph: {
            title: `${DATA.name}`,
            description: DATA.description[locale],
            url: DATA.url,
            siteName: `${DATA.name}`,
            locale: locale,
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
}

export default async function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang={await getLocale()} suppressHydrationWarning>
            <body className="min-h-screen bg-background font-sans antialiased --font-sans">
                <NextIntlClientProvider>
                    <ThemeProvider attribute="class" defaultTheme="dark">
                        {children}
                    </ThemeProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
