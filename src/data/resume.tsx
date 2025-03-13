import { Icons } from "@/components/icons";

export const DATA = {
    name: "Alessio Manfredini",
    initials: "AM",
    username: "devmanfre",
    url: "https://dillion.io",
    location: "San Francisco, CA",
    locationLink: "https://www.google.com/maps/place/sanfrancisco",
    description: "Full stack developer for a young Italian company. I love building things and helping people.",
    summary:
        `After graduating in CS in late 2023, I started working as a full stack developer.
        I explored various technologies, both back-end and front-end.
        Among all of them, React has become my favorite one.`,
    terminal: [
        "> get-graduation --spec IT",
        "✔ IT graduation getted.",
        "> get-degree --spec CS",
        "✔ CS degree getted.",
        "> sudo work --mode hard ..."
    ],
    avatarUrl: "/me.png",
    skills: ["React", "Next.js", "Typescript", "Node.js", "Python", "Javascript", "MySQL", "Java", "PHP", "Tailwind"],
    contact: {
        email: "alessio.manfredini.work@gmail.com",
        tel: "+123456789",
        social: {
            GitHub: {
                name: "GitHub",
                url: "https://github.com/DevManfre",
                icon: Icons.github,

                navbar: true,
            },
            LinkedIn: {
                name: "LinkedIn",
                url: "https://www.linkedin.com/in/alessio-manfredini-developer/",
                icon: Icons.linkedin,

                navbar: true,
            },
            CodePen: {
                name: "CodePen",
                url: "https://codepen.io/devmanfre",
                icon: Icons.codepen,

                navbar: true,
            },
            email: {
                name: "Send Email",
                url: "mailto:alessio.manfredini.work@gmail.com",
                icon: Icons.email,

                navbar: true,
            },
        },
    },
    work: [
        {
            company: "Italiangres",
            href: "https://italiangres.com",
            badges: ["Prestashop", "JavaScript", "PHP", "Python", "MySQL"],
            title: "Full Stack Developer",
            logoUrl: "/italiangres.png",
            start: "Feb 2024",
            end: "Current",
            description:
                "Developed and maintained new features for the ecommerce, both front-office and back-office. Improve site performance and indexing by introducing best practices and performance fixes. Developed off-site scripts for managing internal company processes using mostly Python.",
        },
        {
            company: "expert.ai",
            href: "https://expert.ai",
            badges: ["Java"],
            title: "Backend Developer",
            logoUrl: "/expert.ai.svg",
            start: "Mar 2017, Apr 2018, Oct",
            end: "Nov 2019",
            description:
                "Developed extension for IntelliJ regarding code coloring for particular file extensions used by the company. Developed new small features for the company's proprietary Cogito artificial intelligence.",
        },
    ],
    education: [
        {
            school: "UniMoRe",
            href: "https://www.unimore.it",
            degree: "Computer Science Degree",
            logoUrl: "/unimore.png",
            start: "2019",
            end: "2023",
        },
        {
            school: "Primo Levi",
            href: "https://istitutolevi.edu.it",
            degree: "IT Graduation",
            logoUrl: "/primo-levi.png",
            start: "2014",
            end: "2019",
        },
        {
            school: "AICA",
            href: "https://aicanet.it/",
            degree: "ECDL Full Stardard",
            logoUrl: "/aica.png",
            start: "2014",
            end: "2015",
        },
    ],
    projects: [
        {
            title: "Chat Collect",
            href: "https://chatcollect.com",
            dates: "Jan 2024 - Feb 2024",
            active: true,
            description:
                "With the release of the [OpenAI GPT Store](https://openai.com/blog/introducing-the-gpt-store), I decided to build a SaaS which allows users to collect email addresses from their GPT users. This is a great way to build an audience and monetize your GPT API usage.",
            technologies: ["Next.js", "Typescript", "PostgreSQL", "Prisma", "TailwindCSS", "Stripe", "Shadcn UI", "Magic UI"],
            links: [
                {
                    type: "Website",
                    href: "https://chatcollect.com",
                    icon: <Icons.globe className="size-3" />,
                },
            ],
            image: "",
            video: "https://pub-83c5db439b40468498f97946200806f7.r2.dev/chat-collect.mp4",
        },
        {
            title: "Magic UI",
            href: "https://magicui.design",
            dates: "June 2023 - Present",
            active: true,
            description: "Designed, developed and sold animated UI components for developers.",
            technologies: ["Next.js", "Typescript", "PostgreSQL", "Prisma", "TailwindCSS", "Stripe", "Shadcn UI", "Magic UI"],
            links: [
                {
                    type: "Website",
                    href: "https://magicui.design",
                    icon: <Icons.globe className="size-3" />,
                },
                {
                    type: "Source",
                    href: "https://github.com/magicuidesign/magicui",
                    icon: <Icons.github className="size-3" />,
                },
            ],
            image: "",
            video: "https://cdn.magicui.design/bento-grid.mp4",
        },
        {
            title: "llm.report",
            href: "https://llm.report",
            dates: "April 2023 - September 2023",
            active: true,
            description: "Developed an open-source logging and analytics platform for OpenAI: Log your ChatGPT API requests, analyze costs, and improve your prompts.",
            technologies: ["Next.js", "Typescript", "PostgreSQL", "Prisma", "TailwindCSS", "Shadcn UI", "Magic UI", "Stripe", "Cloudflare Workers"],
            links: [
                {
                    type: "Website",
                    href: "https://llm.report",
                    icon: <Icons.globe className="size-3" />,
                },
                {
                    type: "Source",
                    href: "https://github.com/dillionverma/llm.report",
                    icon: <Icons.github className="size-3" />,
                },
            ],
            image: "",
            video: "https://cdn.llm.report/openai-demo.mp4",
        },
        {
            title: "Automatic Chat",
            href: "https://automatic.chat",
            dates: "April 2023 - March 2024",
            active: true,
            description: "Developed an AI Customer Support Chatbot which automatically responds to customer support tickets using the latest GPT models.",
            technologies: ["Next.js", "Typescript", "PostgreSQL", "Prisma", "TailwindCSS", "Shadcn UI", "Magic UI", "Stripe", "Cloudflare Workers"],
            links: [
                {
                    type: "Website",
                    href: "https://automatic.chat",
                    icon: <Icons.globe className="size-3" />,
                },
            ],
            image: "",
            video: "https://pub-83c5db439b40468498f97946200806f7.r2.dev/automatic-chat.mp4",
        },
    ],
} as const;
