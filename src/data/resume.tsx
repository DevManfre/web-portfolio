import { Icons } from "@/components/icons";

export const DATA = {
    name: "Alessio Manfredini",
    initials: "AM",
    username: "devmanfre",
    url: "https://devmanfre.netlify.app",
    description: {
        en: "Full stack developer for a young Italian company. I love building things and helping people.",
        it: "Sviluppatore full stack per una giovane azienda italiana. Mi piace costruire cose per farle girare sul Web.",
    },
    summary: {
        en: `After graduating in CS in late 2023, I started working as a full stack developer.
        I explored various technologies, both back-end and front-end.
        Among all of them, React has become my favorite one.`,
        it: `Dopo essermi laureato in informatica a fine 2023, ho iniziato a lavorare come sviluppatore full stack.
        Ho approfondito diverse tecnologie, sia back-end che front-end.
        Tra tutte, React è diventata la mia preferita.`,
    },
    terminal: ["> get-graduation --spec IT", "✔ IT graduation getted.", "> get-degree --spec CS", "✔ CS degree getted.", "> sudo work --mode hard ..."],
    avatarUrl: "/img/me.webp",
    skills: ["React", "Next.js", "Typescript", "Node.js", "Python", "Javascript", "MySQL", "PHP", "Tailwind", "SCSS", "Docker", "Git"].sort(),
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
            title: {
                en: "Full Stack Developer",
                it: "Sviluppatore Full Stack",
            },
            logoUrl: "/img/work/italiangres.webp",
            start: "02/2024",
            end: "current",
            description: {
                en: `Developed and maintained new features for the ecommerce, both front-office and back-office.
                Improve site performance and indexing by introducing best practices and performance fixes.
                Developed off-site scripts for managing internal company processes using mostly Python.`,
                it: `Sviluppo e manutenzione di nuove funzionalità per l'e-commerce, sia per il front-office che per il back-office.
                Miglioramento delle prestazioni e dell'indicizzazione del sito mediante l'introduzione di best practice e correzioni delle prestazioni.
                Sviluppo di script off-site per la gestione dei processi interni all'azienda, utilizzando principalmente Python.`,
            },
        },
        {
            company: "expert.ai",
            href: "https://expert.ai",
            badges: ["Java"],
            title: {
                en: "Backend Developer",
                it: "Sviluppatore Backend",
            },
            logoUrl: "/img/work/expert.ai.webp",
            start: "03/2017, 04/2018, 09/2019",
            end: "",
            description: {
                en: `Developed extension for IntelliJ regarding code coloring for particular file extensions used by the company.
                Developed new small features for the company's proprietary Cogito artificial intelligence.`,
                it: `Sviluppo di un'estensione per IntelliJ relativa alla colorazione del codice per particolari estensioni di file utilizzate dall'azienda.
                Sviluppo di nuove piccole funzionalità per l'intelligenza artificiale Cogito, di proprietà dell'azienda.`,
            },
        },
    ],
    education: [
        {
            school: "UniMoRe",
            href: "https://www.unimore.it",
            degree: {
                it: "Laurea in Informatica",
                en: "Computer Science Degree",
            },
            logoUrl: "/img/education/unimore.webp",
            start: "2019",
            end: "2023",
        },
        {
            school: "Primo Levi",
            href: "https://istitutolevi.edu.it",
            degree: {
                it: "Diploma in Informatica",
                en: "IT Graduation",
            },
            logoUrl: "/img/education/primo-levi.webp",
            start: "2014",
            end: "2019",
        },
    ],
    certifications: [
        {
            name: "ECDL Full Standard",
            issuer: "AICA",
            href: "https://aicanet.it/",
            logoUrl: "/img/education/aica.webp",
            start: "2014",
            end: "2015",
            badge: "",
        },
    ],
    languages: [
        { name: { en: "Italian", it: "Italiano" }, level: { en: "Native", it: "Madrelingua" } },
        { name: { en: "English", it: "Inglese" }, level: { en: "B2", it: "B2" } },
    ],
    projects: [
        {
            title: "web-portfolio",
            href: "https://devmanfre.netlify.app",
            start: "02/2023",
            end: "04/2024",
            description: {
                it: `Questo progetto è il mio portfolio personale da Web Developer,
                pensato per presentare le mie competenze, i progetti realizzati e le tecnologie con cui lavoro.`,
                en: `This project is my personal Web Developer portfolio, designed to present my skills, the projects I have done, and the technologies I work with.`
            },
            technologies: ["Next.js", "Typescript", "Tailwind"],
            links: [
                {
                    type: "Github",
                    href: "https://github.com/DevManfre/web-portfolio",
                    icon: <Icons.github className="size-4" />,
                },
            ],
            image: "/img/projects/web-portfolio.png",
            video: "",
        },
        {
            title: "Sophon",
            href: "https://dl.acm.org/doi/fullHtml/10.1145/3491418.3535163",
            start: "03/2023",
            end: "09/2023",
            description: {
                en: `Sophon is a software that allows you to store, execute, and optionally share your research in a secure cloud hosted by your institution.
                It was a research project developed by the University of Modena and Reggio Emilia.`,
                it: `Sophon è un software che consente di archiviare, eseguire e, a scelta, condividere le proprie ricerche in un cloud sicuro ospitato dalla propria istituzione.
                È un progetto di ricerca sviluppato dall'Università di Modena e Reggio Emilia.`
            },
            technologies: ["Python", "Docker"],
            links: [
                {
                    type: "Github",
                    href: "https://github.com/Steffo99/sophon",
                    icon: <Icons.github className="size-4" />,
                },
                {
                    type: "Article",
                    href: "https://dl.acm.org/doi/fullHtml/10.1145/3491418.3535163",
                    icon: <Icons.globe className="size-4" />,
                },
                {
                    type: "Article",
                    href: "http://iris.unimore.it/handle/11380/1328207?mode=complete",
                    icon: <Icons.globe className="size-4" />,
                },
            ],
            image: "/img/projects/sophon.png",
            video: "",
        },
    ],
} as const;