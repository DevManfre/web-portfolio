// Pure aggregations over GitHub API data — testable without network.

export function topLanguage(repos: { primaryLanguage: { name: string } | null }[]): string | null {
    const counts = new Map<string, number>();
    for (const repo of repos) {
        const name = repo.primaryLanguage?.name;
        if (name) counts.set(name, (counts.get(name) ?? 0) + 1);
    }
    let best: string | null = null;
    let bestCount = 0;
    for (const [name, count] of counts) {
        if (count > bestCount) {
            bestCount = count;
            best = name;
        }
    }
    return best;
}

export function totalStars(repos: { stargazerCount: number }[]): number {
    return repos.reduce((sum, repo) => sum + repo.stargazerCount, 0);
}

// Contribution-count buckets driving the contribution graph color scale.
export function bucket(count: number): number {
    if (count === 0) return 0;
    if (count <= 2) return 1;
    if (count <= 5) return 2;
    if (count <= 9) return 3;
    return 4;
}

export const FALLBACK_LANGUAGE_COLOR = "#61dca3";

// Sanitizes untrusted language color where it enters the system.
export function safeColor(color: string | null): string {
    return color && /^#[0-9a-fA-F]{3,8}$/.test(color) ? color : FALLBACK_LANGUAGE_COLOR;
}
