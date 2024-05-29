/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
    siteMetadata: {
        title: `devmanfre`,
        description: 'Alessio Manfredini web portfolio',
        socialsURLs: {
            github: 'https://github.com/DevManfre',
            instagram: 'https://www.instagram.com/lost.manfre',
            linkedin: 'https://www.linkedin.com/in/alessio-manfredini-developer/',
            codepen: 'https://codepen.io/devmanfre'
        },
        email: 'alessio.manfredini.work@gmail.com'
    },
    plugins: [
        {
            resolve: "gatsby-plugin-sass",
            options: {
                additionalData: "@use 'Colors' as *;"
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
                siteUrl: `http://localhost:8000/`,
                i18nextOptions: {
                    interpolation: {
                        escapeValue: false
                    },
                    keySeparator: false,
                    nsSeparator: false
                },
                /* pages: [
                    {
                        matchPath: '/:lang?/blog/:uid',
                        getLanguageFromPath: true,
                        excludeLanguages: ['es']
                    },
                    {
                        matchPath: '/preview',
                        languages: ['en']
                    }
                ] */
            }
        }
    ]
};