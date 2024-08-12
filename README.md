<div align="center">
    <img src="./src/images/icon.png" />
    <br />
    <h1>web-portfolio</h1>
    The second version of my personal web curriculum, built using <a href="https://www.gatsbyjs.com/docs">Gatsby</a>, <a href="https://react.dev/">React</a> and hosted on <a href="https://www.netlify.com/">Netlify</a>.
    <br /><br />
    <a href="https://devmanfre.netlify.app/">
        <img src="https://api.netlify.com/api/v1/badges/0174fb4a-773e-4152-a29e-6c676289f514/deploy-status" />
    </a>
    <p>
        <a href="./README.it.md">🇮🇹</a>
    </p>
</div>

# 🫀 Introduction
Repository for the site I use to introduce myself to companies. The site is built using React as the frontend framework and Gatsby for getting the data.

# 🔧 Local installation
## Setup 
1. Install Gatsby CLI
    ```
    npm install -g gatsby-cli
    ```
2. Install the repository dependencies
    ```
    npm install
    ```
3. Run the development server
    ```
    npm run start
    ```
## Build
1. Generate the static build
    ```
    npm run build
    ```
2. To run the build execute the following command
    ```
    npm run serve
    ```

# 🎨 Colors
All colors used in the site are viewable within the file of the same name in the css folder.
| Color | Hex |
| ----- | --- |
| Background | ![#0a192f](https://via.placeholder.com/10/0a192f?text=+) `#0a192f` |
| Selection Background | ![#233554](https://via.placeholder.com/10/233554?text=+) `#233554` |
| Main | ![#64FFDA](https://via.placeholder.com/10/64ffda?text=+) `#64ffda` |
| Subtitle | ![#8892b0](https://via.placeholder.com/10/8892b0?text=+) `#8892b0` |
| Title | ![#b1ccf1](https://via.placeholder.com/10/b1ccf1?text=+) `#b1ccf1` |
| Link | ![#ccd6f6](https://via.placeholder.com/10/ccd6f6?text=+) `#ccd6f6` |

# 🚨 Credits
The site design is created by [Brittany Chiang](https://github.com/bchiang7), but the code was rewritten from scratch. The changes are:
| Brittany Version | My Version |
| --- | --- |
| Written only in JS | Code split between JS and CSS (SCSS) |
| Without i18n | With i18n |
| Multipage (home and project archive) | Single page (homepage only) |
| Simple 404 page | More aesthetically curated 404 page |

# 📝 Notes
## Code
The site was written in such a way that it is easily customizable and expandable.

### Personal information
Most of the personal information is configurable within the `gatsby-config.js` file (name, page title, projects and work experience...).

### Languages
The languages currently configured are English and Italian. To add new ones simply add them to the file `gatsby-config.js` and add the file with the translations inside `/locales/`. <br />
<b>Pay attention</b>: the language selector inside the site is configured to allow the choice between two languages. If you want to have more than two languages included, the selector must be modified accordingly.