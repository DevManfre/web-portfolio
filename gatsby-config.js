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
                title: 'title',
                description: 'description',
                tags: [
                    '1',
                    '2',
                    '3',
                ],
                links: [
                    {
                        url: 'link a caso',
                        icon: 'icona a caso'
                    }
                ]
            },
            {
                title: 'title',
                description: 'description',
                tags: [
                    '1',
                    '2',
                    '3',
                ],
                links: [
                    {
                        url: 'link a caso',
                        icon: 'icona a caso'
                    }
                ]
            },
            {
                title: 'title',
                description: 'description',
                tags: [
                    '1',
                    '2',
                    '3',
                ],
                links: [
                    {
                        url: 'link a caso',
                        icon: 'icona a caso'
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