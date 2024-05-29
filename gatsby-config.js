/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
    siteMetadata: {
        title: `devmanfre`,
        description: 'Alessio Manfredini web portfolio',
        developer: 'Alessio Manfredini',
        socialsURLs: {
            github: 'https://github.com/DevManfre',
            instagram: 'https://www.instagram.com/lost.manfre',
            linkedin: 'https://www.linkedin.com/in/alessio-manfredini-developer/',
            codepen: 'https://codepen.io/devmanfre'
        },
        email: 'alessio.manfredini.work@gmail.com'
    },
    flags: {
        DEV_SSR: true,
        FAST_DEV: true,
        PARALLEL_SOURCING: true
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
                generateDefaultLanguagePage: true,
                redirect: false,
                i18nextOptions: {
                    interpolation: {
                        escapeValue: false
                    },
                    keySeparator: false,
                    nsSeparator: false
                }
            }
        }
    ]
};