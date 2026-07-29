import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * Formats a date string into a more readable format based on the provided locale.
 *
 * - If the input is a year (e.g., "2017"), it returns the year as a string.
 * - If the input is in "month/year" or "day/month/year" format, it returns the
 *   formatted date in "Month Year" format (e.g., "Apr 2017").
 * - If the input contains multiple dates separated by commas, it formats each date
 *   and joins them with a comma.
 *
 * @param date - The date string to format. It can be in various formats such as
 *               "yyyy", "mm/yyyy", "dd/mm/yyyy", or a comma-separated list of dates.
 * @param locale - The locale to use for formatting the date (e.g., "en-US").
 * @returns A formatted date string with the first letter capitalized.
 */
export function formatDate(date: string, locale: string): string {
    if (date === "") return "";

    const dates = date.split(",");
    if (dates.length > 1) {
        let returnString = "";
        dates.forEach((d) => {
            if (returnString.length > 0) returnString += ", ";
            returnString += formatDate(d, locale);
        });
        return returnString;
    }

    const parts = date.split("/").reverse();
    let returnString: string = "";

    if (parts.length == 1)
        /* "yyyy" just the year, for example 2017 */
        returnString = new Date(date).getFullYear().toString();
    if (parts.length == 2 || parts.length == 3)
        /* "month yyyy", for example Apr 2017  */
        returnString = new Date(`${parts[1]}/01/${parts[0]}`).toLocaleDateString(locale, { year: "numeric", month: "short" }).toString();

    return returnString.charAt(0).toUpperCase() + returnString.slice(1);
}

/**
 * Formats a start/end period. Owns the data-module sentinels: `end === ""`
 * means "no end date", `end === "current"` renders the localized label the
 * caller resolved (i18n strings live in the locale files, not here).
 */
export function formatPeriod(start: string, end: string, locale: string, currentLabel: string): string {
    const from = formatDate(start, locale);
    const to = end === "current" ? currentLabel : formatDate(end, locale);
    return to === "" ? from : `${from} - ${to}`;
}
