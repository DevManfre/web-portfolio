import { ImageResponse } from "next/og";
import { hasLocale } from "next-intl";
import { DATA } from "@/data/resume";
import { routing } from "@/i18n/routing";

export const alt = `${DATA.name} — Full Stack Developer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const description = DATA.description[hasLocale(routing.locales, locale) ? locale : routing.defaultLocale];

    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    padding: "80px",
                    backgroundColor: "#0a0a0a",
                }}
            >
                <div style={{ fontSize: 72, fontWeight: 700, color: "#ffffff" }}>{DATA.name}</div>
                <div style={{ fontSize: 36, color: "#61dca3", marginTop: 24 }}>{description}</div>
                <div style={{ fontSize: 28, color: "#888888", marginTop: 48 }}>{DATA.url.replace("https://", "")}</div>
            </div>
        ),
        { ...size }
    );
}
