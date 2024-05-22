import * as React from "react"
import LoadingScreen from "../components/LoadingScreen"
import Layout from "../components/Layout"
import SEO from "../components/SEO"

const IndexPage = () => {
    return (
        <>
            <LoadingScreen />
            <Layout>
            </Layout>
        </>
    )
}

export default IndexPage

export const Head = () => <SEO title="Home Page" />
