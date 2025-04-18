import Navbar from "@/components/navbar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

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

    return (
        <TooltipProvider delayDuration={0}>
            {children}
            <Navbar />
        </TooltipProvider>
    );
}
