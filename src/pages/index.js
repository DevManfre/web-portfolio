import * as React from "react"
import LoadingScreen from "../components/LoadingScreen"
import Layout from "../components/Layout"
import Seo from "../components/Seo"

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

export const Head = () => <Seo title="Home Page" />
