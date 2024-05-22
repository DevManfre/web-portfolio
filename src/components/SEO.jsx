import * as React from 'react'
import { graphql, useStaticQuery } from "gatsby"

function SEO({ title }) {
    const metaDescriptionContent = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          description
        }
      }
    }
    `);

    return (
        <>
            <title>{title}</title>
            <meta name='description' content={metaDescriptionContent.site.siteMetadata.description} />
        </>
    );
}

export default SEO;