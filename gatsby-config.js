/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
    siteMetadata: {
        title: `devmanfre`,
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
                title: 'Game of Thrones random quotes',
                description: 'description',
                tags: [
                    '1',
                    '2',
                    '3',
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
            {
                title: 'Drum Machine',
                description: 'description',
                tags: [
                    '1',
                    '2',
                    '3',
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
                title: 'Common JS Calculator',
                description: 'description',
                tags: [
                    '1',
                    '2',
                    '3',
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
                title: 'My web portfolio v2',
                description: 'description',
                tags: [
                    '1',
                    '2',
                    '3',
                ],
                links: [
                    {
                        icon: 'github',
                        url: 'https://github.com/DevManfre/portfolio-v2'
                    },
                    {
                        icon: 'external-site',
                        url: ''
                    }
                ]
            }
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