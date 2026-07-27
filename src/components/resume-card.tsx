"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader } from "@/components/ui/card";
import { cn, formatDate } from "@/lib/utils";
import { motion } from "framer-motion";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useTranslations, useLocale } from "next-intl";

interface ResumeCardProps {
    logoUrl: string;
    altText: string;
    title: string;
    subtitle?: string;
    href?: string;
    badges?: readonly string[];
    start: string;
    end: string;
    description?: string;
}
export const ResumeCard = ({ logoUrl, altText, title, subtitle, href, badges, description, start, end }: ResumeCardProps) => {
    const t = useTranslations("CardResume"),
        [isExpanded, setIsExpanded] = React.useState(false),
        locale = useLocale();

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        if (description) {
            e.preventDefault();
            setIsExpanded(!isExpanded);
        }
    };

    return (
        <Link href={href || "#"} target="_blank" rel="noopener noreferrer" className="block cursor-pointer" onClick={handleClick}>
            <Card className="flex bg-transparent">
                <div className="flex-none">
                    <Avatar className="border size-12 m-auto bg-muted-background dark:bg-foreground">
                        <AvatarImage src={logoUrl} alt={altText} className="object-contain" />
                        <AvatarFallback>{altText[0]}</AvatarFallback>
                    </Avatar>
                </div>
                <div className="flex-grow ml-4 items-center flex-col group">
                    <CardHeader>
                        <div className="flex items-center justify-between gap-x-2 text-base">
                            <h3 className="inline-flex items-center justify-center font-semibold leading-none text-xs sm:text-sm">
                                {title}
                                <ChevronRightIcon
                                    className={cn(
                                        "size-4 translate-x-0 transform opacity-0 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:opacity-100",
                                        isExpanded ? "rotate-90" : "rotate-0"
                                    )}
                                />
                            </h3>
                            <div className="text-xs sm:text-sm tabular-nums text-muted-foreground text-right">
                                {formatDate(start, locale)}
                                {end != "" ? ` - ${end == "current" ? t(end) : formatDate(end, locale)}` : ""}
                            </div>
                        </div>

                        {subtitle && <div className="font-sans text-xs">{subtitle}</div>}
                    </CardHeader>
                    {description && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{
                                opacity: isExpanded ? 1 : 0,

                                height: isExpanded ? "auto" : 0,
                            }}
                            transition={{
                                duration: 0.7,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                            className="mt-2 text-xs sm:text-sm"
                        >
                            {description}
                            <br />
                            {badges && (
                                <span className="inline-flex flex-wrap gap-x-1 mt-3 gap-y-1">
                                    {badges.map((badge, index) => (
                                        <Badge variant="secondary" className="align-middle text-xs" key={index}>
                                            {badge}
                                        </Badge>
                                    ))}
                                </span>
                            )}
                        </motion.div>
                    )}
                </div>
            </Card>
        </Link>
    );
};
