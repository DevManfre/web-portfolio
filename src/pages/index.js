import * as React from "react"
import LoadingScreen from "../components/LoadingScreen"
import HomeSection from "../components/HomeSection"
import Layout from "../components/Layout"

const IndexPage = () => {
    return (
        <>
            <LoadingScreen />
            <Layout>
                <HomeSection />
            </Layout>
        </>
    )
}

export default IndexPage

export const Head = () => <title>Home Page</title>
