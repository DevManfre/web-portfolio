import type { GithubData } from "@/lib/github";
import { cn } from "@/lib/utils";

const BUCKET_CLASSES = ["bg-muted", "bg-[#61dca3]/25", "bg-[#61dca3]/45", "bg-[#61dca3]/70", "bg-[#61dca3]"];

function bucket(count: number): number {
    if (count === 0) return 0;
    if (count <= 2) return 1;
    if (count <= 5) return 2;
    if (count <= 9) return 3;
    return 4;
}

export function ContributionGraph({ weeks }: { weeks: GithubData["weeks"] }) {
    return (
        <div className="overflow-x-auto pb-2" aria-hidden="true">
            <div className="flex w-max gap-[3px]">
                {weeks.map((week, weekId) => (
                    <div key={weekId} className="flex flex-col gap-[3px]">
                        {week.days.map((day) => (
                            <div key={day.date} title={`${day.date}: ${day.count}`} className={cn("size-[10px] rounded-[2px]", BUCKET_CLASSES[bucket(day.count)])} />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}
