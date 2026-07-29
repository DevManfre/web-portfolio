import { DATA } from "@/data/resume";
import { safeColor, topLanguage, totalStars } from "@/lib/github-stats";

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
        language: { name: string; color: string } | null;
    }[];
};

export type GithubResult =
    | { status: "disabled" }
    | { status: "error"; reason: string }
    | { status: "ok"; data: GithubData };

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

export async function getGithubData(): Promise<GithubResult> {
    const token = process.env.GITHUB_TOKEN;
    if (!token) return { status: "disabled" };

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

        if (!res.ok) return { status: "error", reason: `GitHub API responded ${res.status}` };

        const json = (await res.json()) as GraphQLResponse;
        const user = json.data?.user;
        if (json.errors?.length || !user) return { status: "error", reason: "GitHub GraphQL returned errors" };

        // Stars/top-language aggregate the first 100 repos only; publicRepos uses totalCount.
        const repoNodes = user.repositories.nodes.filter((node) => node !== null);

        return {
            status: "ok",
            data: {
                totalContributions: user.contributionsCollection.contributionCalendar.totalContributions,
                weeks: user.contributionsCollection.contributionCalendar.weeks.map((week) => ({
                    days: week.contributionDays.map((day) => ({ date: day.date, count: day.contributionCount })),
                })),
                publicRepos: user.repositories.totalCount,
                totalStars: totalStars(repoNodes),
                topLanguage: topLanguage(repoNodes),
                pinned: user.pinnedItems.nodes
                    .filter((node) => node !== null)
                    .map((repo) => ({
                        name: repo.name,
                        description: repo.description,
                        url: repo.url,
                        stars: repo.stargazerCount,
                        language: repo.primaryLanguage ? { name: repo.primaryLanguage.name, color: safeColor(repo.primaryLanguage.color) } : null,
                    })),
            },
        };
    } catch (error) {
        return { status: "error", reason: error instanceof Error ? error.message : String(error) };
    }
}
