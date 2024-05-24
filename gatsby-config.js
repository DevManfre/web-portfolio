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
        }
    },
    plugins: [
        {
            resolve: "gatsby-plugin-sass",
            options: {
                additionalData: "@use 'Colors' as *;"
            }
        }
    ]
};