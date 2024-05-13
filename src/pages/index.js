import * as React from "react"
import LoadingScreen from "../components/LoadingScreen"

const IndexPage = () => {
    return (
        <>
            <LoadingScreen />
            <h1>Testo di esempio</h1>
        </>
    )
}

export default IndexPage

export const Head = () => <title>Home Page</title>
