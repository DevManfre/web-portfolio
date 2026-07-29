type PinnedRepo = {
    name: string;
    description: string | null;
    url: string;
    stars: number;
    language: { name: string; color: string } | null;
};

export function GithubRepoCard({ repo }: { repo: PinnedRepo }) {
    return (
        <a href={repo.url} target="_blank" rel="noopener noreferrer" className="flex h-full flex-col gap-2 rounded-lg border p-4 transition-colors hover:bg-accent/50">
            <span className="font-semibold">{repo.name}</span>
            {repo.description && <span className="line-clamp-2 text-sm text-muted-foreground">{repo.description}</span>}
            <span className="mt-auto flex items-center gap-3 text-xs text-muted-foreground">
                {repo.language && (
                    <span className="flex items-center gap-1">
                        <span className="size-2.5 rounded-full" style={{ backgroundColor: repo.language.color }} />
                        {repo.language.name}
                    </span>
                )}
                <span>★ {repo.stars}</span>
            </span>
        </a>
    );
}
