// The page order lives here and nowhere else. Animation delays derive from
// the position in this sequence, so they are monotonic by construction:
// reordering the page means moving one entry.

export const SECTION_SEQUENCE = [
    "hero",
    "about",
    "work",
    "education",
    "terminal",
    "skills",
    "languages",
    "certifications",
    "github",
    "codepen",
    "projects",
    "contact",
] as const;

export type SectionId = (typeof SECTION_SEQUENCE)[number];

// Delay between successive sections (the old BLUR_FADE_DELAY, which also
// existed as a hidden `0.04 +` inside blur-fade.tsx).
export const SECTION_STEP = 0.04;

// Stagger between sibling items inside a section.
export const ITEM_STEP = 0.05;

export function sectionDelay(id: SectionId): number {
    return (SECTION_SEQUENCE.indexOf(id) + 1) * SECTION_STEP;
}
