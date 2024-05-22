/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
    siteMetadata: {
        title: `portfolio-v2`
    },
    plugins: [
        {
            resolve: "gatsby-plugin-sass",
            options: {
                additionalData: "@use 'Colors' as *;"
            }
        },
        {
            resolve: "gatsby-plugin-html-attributes",
            options: {
                lang: 'en'
            }
        }
    ]
};