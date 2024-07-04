/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
    siteMetadata: {
        title: 'DevManfre',
        description: 'Alessio Manfredini web portfolio',
        developer: 'Alessio Manfredini',
        socials: [
            {
                name: 'github',
                url: 'https://github.com/DevManfre'
            },
            {
                name: 'instagram',
                url: 'https://www.instagram.com/lost.manfre'
            },
            {
                name: 'linkedin',
                url: 'https://www.linkedin.com/in/alessio-manfredini-developer/'
            },
            {
                name: 'codepen',
                url: 'https://codepen.io/devmanfre'
            }
        ],
        email: 'alessio.manfredini.work@gmail.com',
        companies: [
            {
                name: 'ItalianGres',
                job: 'Web Developer',
                url: 'www.italiangres.com',
            },
            {
                name: 'expert.ai',
                job: 'Backend Developer',
                url: 'https://www.expert.ai',
            },
        ],
        projects: [
            {
                title: 'project-title-web-portfolio-v2',
                description: 'project-description-web-portfolio-v2',
                tags: [
                    'React',
                    'Gatsby',
                    'SCSS'
                ],
                links: [
                    {
                        icon: 'github',
                        url: 'https://github.com/DevManfre/portfolio-v2'
                    },
                    {
                        icon: 'external-site',
                        url: ''
                    },
                    {
                        icon: 'original-authors',
                        url: 'https://v4.brittanychiang.com/'
                    }
                ]
            },
            {
                title: 'project-title-common-js-calculator',
                description: 'project-description-common-js-calculator',
                tags: [
                    'React',
                    'SCSS'
                ],
                links: [
                    {
                        icon: 'github',
                        url: 'https://github.com/DevManfre/common-calculator'
                    },
                    {
                        icon: 'external-site',
                        url: 'https://common-calculator-devmanfre.netlify.app/'
                    }
                ]
            },
            {
                title: 'project-title-drum-machine',
                description: 'project-description-drum-machine',
                tags: [
                    'React',
                    'SCSS'
                ],
                links: [
                    {
                        icon: 'github',
                        url: 'https://github.com/DevManfre/rhythm-forge'
                    },
                    {
                        icon: 'external-site',
                        url: 'https://rhythm-forge.netlify.app/'
                    }
                ]
            },
            {
                title: 'project-title-got-random-quotes',
                description: 'project-description-got-random-quotes',
                tags: [
                    'React',
                    'SCSS',
                    'API',
                ],
                links: [
                    {
                        icon: 'github',
                        url: 'https://github.com/DevManfre/random-got-quotes'
                    },
                    {
                        icon: 'external-site',
                        url: 'https://got-random-quotes.netlify.app/'
                    }
                ]
            },
        ]
    },
    flags: {
        DEV_SSR: false,
        FAST_DEV: true,
        PARALLEL_SOURCING: true
    },
    plugins: [
        {
            resolve: "gatsby-plugin-sass",
            options: {
                additionalData: "@use 'Colors' as *; @use 'Font' as *; @use 'sass:list' as *;"
            }
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `${__dirname}/locales`,
                name: `locale`
            }
        },
        {
            resolve: `gatsby-plugin-react-i18next`,
            options: {
                localeJsonSourceName: `locale`,
                languages: [`en`, `it`],
                defaultLanguage: `en`,
                generateDefaultLanguagePage: true,
                redirect: true,
                i18nextOptions: {
                    interpolation: {
                        escapeValue: false
                    },
                    keySeparator: false,
                    nsSeparator: false
                }
            }
        },
        `gatsby-plugin-image`,
        `gatsby-plugin-sharp`
    ]
};