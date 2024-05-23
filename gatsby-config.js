/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
    siteMetadata: {
        title: `Alessio Manfredini`,
        description: 'Alessio Manfredini web portfolio'
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