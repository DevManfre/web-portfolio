import { ThemeProvider } from "@/components/theme-provider";
import { DATA } from "@/data/resume";
import type { Metadata } from "next";
import "@/app/globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";
import { LOCALE_PATHS, OG_LOCALES, routing } from "@/i18n/routing";
import Script from "next/script";

export async function generateMetadata(): Promise<Metadata> {
    const locale = await getLocale();

    return {
        metadataBase: new URL(DATA.url),
        title: {
            default: DATA.name,
            template: `%s | ${DATA.name}`,
        },
        description: DATA.description[locale],
        alternates: {
            canonical: `/${locale}`,
            languages: {
                ...LOCALE_PATHS,
                "x-default": LOCALE_PATHS[routing.defaultLocale],
            },
        },
        openGraph: {
            title: `${DATA.name}`,
            description: DATA.description[locale],
            url: `/${locale}`,
            siteName: `${DATA.name}`,
            locale: OG_LOCALES[locale],
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
                {process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID && (
                    <Script
                        src="https://cloud.umami.is/script.js"
                        data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
                        strategy="afterInteractive"
                    />
                )}
            </body>
        </html>
    );
}
