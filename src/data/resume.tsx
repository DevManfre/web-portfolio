import { Icons } from "@/components/icons";

export const DATA = {
    name: "Alessio Manfredini",
    initials: "AM",
    username: "devmanfre",
    url: "https://devmanfre.netlify.app",
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
            title: "Sophon",
            href: "https://dl.acm.org/doi/fullHtml/10.1145/3491418.3535163",
            dates: "March 2023 - Aug 2023",
            description:
                "Sophon is a software that allows you to store, execute, and optionally share your research in a secure cloud hosted by your insitution. It was a research project developed by the University of Modena and Reggio Emilia.",
            technologies: ["Python", "Docker"],
            links: [
                {
                    type: "Github",
                    href: "https://github.com/Steffo99/sophon",
                    icon: <Icons.github className="size-4" />,
                },
                {
                    type: "First article",
                    href: "https://dl.acm.org/doi/fullHtml/10.1145/3491418.3535163",
                    icon: <Icons.globe className="size-4" />,
                },
                {
                    type: "Second article",
                    href: "http://iris.unimore.it/handle/11380/1328207?mode=complete",
                    icon: <Icons.globe className="size-4" />,
                },
            ],
            image: "/sophon.png",
            video: "",
        },
    ],
} as const;
