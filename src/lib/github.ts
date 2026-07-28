import { DATA } from "@/data/resume";

export type GithubData = {
    totalContributions: number;
    weeks: { days: { date: string; count: number }[] }[];
    publicRepos: number;
    totalStars: number;
    topLanguage: string | null;
    pinned: {
        name: string;
        description: string | null;
        url: string;
        stars: number;
        language: { name: string; color: string | null } | null;
    }[];
};

const QUERY = `
query ($login: String!) {
    user(login: $login) {
        contributionsCollection {
            contributionCalendar {
                totalContributions
                weeks {
                    contributionDays {
                        date
                        contributionCount
                    }
                }
            }
        }
        pinnedItems(first: 4, types: REPOSITORY) {
            nodes {
                ... on Repository {
                    name
                    description
                    url
                    stargazerCount
                    primaryLanguage {
                        name
                        color
                    }
                }
            }
        }
        repositories(privacy: PUBLIC, ownerAffiliations: OWNER, isFork: false, first: 100) {
            totalCount
            nodes {
                stargazerCount
                primaryLanguage {
                    name
                }
            }
        }
    }
}
`;

type GraphQLResponse = {
    data?: {
        user?: {
            contributionsCollection: {
                contributionCalendar: {
                    totalContributions: number;
                    weeks: { contributionDays: { date: string; contributionCount: number }[] }[];
                };
            };
            pinnedItems: {
                nodes: ({
                    name: string;
                    description: string | null;
                    url: string;
                    stargazerCount: number;
                    primaryLanguage: { name: string; color: string | null } | null;
                } | null)[];
            };
            repositories: {
                totalCount: number;
                nodes: ({ stargazerCount: number; primaryLanguage: { name: string } | null } | null)[];
            };
        };
    };
    errors?: unknown[];
};

export async function getGithubData(): Promise<GithubData | null> {
    const token = process.env.GITHUB_TOKEN;
    if (!token) return null;

    try {
        const res = await fetch("https://api.github.com/graphql", {
            method: "POST",
            headers: {
                Authorization: `bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ query: QUERY, variables: { login: DATA.username } }),
            signal: AbortSignal.timeout(5000),
            next: { revalidate: 86400 },
        });

        if (!res.ok) {
            console.warn(`GitHub API responded ${res.status}; hiding GitHub section`);
            return null;
        }

        const json = (await res.json()) as GraphQLResponse;
        const user = json.data?.user;
        if (json.errors?.length || !user) {
            console.warn("GitHub GraphQL returned errors; hiding GitHub section");
            return null;
        }

        // Stars/top-language aggregate the first 100 repos only; publicRepos uses totalCount.
        const repoNodes = user.repositories.nodes.filter((node) => node !== null);
        const languageCounts = new Map<string, number>();
        for (const repo of repoNodes) {
            const name = repo.primaryLanguage?.name;
            if (name) languageCounts.set(name, (languageCounts.get(name) ?? 0) + 1);
        }
        let topLanguage: string | null = null;
        let bestCount = 0;
        for (const [name, count] of languageCounts) {
            if (count > bestCount) {
                bestCount = count;
                topLanguage = name;
            }
        }

        return {
            totalContributions: user.contributionsCollection.contributionCalendar.totalContributions,
            weeks: user.contributionsCollection.contributionCalendar.weeks.map((week) => ({
                days: week.contributionDays.map((day) => ({ date: day.date, count: day.contributionCount })),
            })),
            publicRepos: user.repositories.totalCount,
            totalStars: repoNodes.reduce((sum, repo) => sum + repo.stargazerCount, 0),
            topLanguage,
            pinned: user.pinnedItems.nodes
                .filter((node) => node !== null)
                .map((repo) => ({
                    name: repo.name,
                    description: repo.description,
                    url: repo.url,
                    stars: repo.stargazerCount,
                    language: repo.primaryLanguage,
                })),
        };
    } catch (error) {
        console.warn("GitHub fetch failed; hiding GitHub section", error);
        return null;
    }
}
