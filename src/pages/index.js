import * as React from "react"
import LoadingScreen from "../components/LoadingScreen"
import Layout from "../components/Layout"

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

export const Head = () => <title>Home Page</title>
