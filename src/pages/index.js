import * as React from "react";
import { graphql } from "gatsby";
import LoadingScreen from "../components/LoadingScreen";
import HomeSection from "../components/HomeSection";
import AboutSection from "../components/AboutSection";
import Layout from "../components/Layout";

const IndexPage = () => {
    return (
        <>
            <LoadingScreen />
            <Layout>
                <HomeSection />
                <AboutSection />
            </Layout>
        </>
    );
}

export const query = graphql`
    query($language: String!) {
        locales: allLocale(filter: {language: {eq: $language}}) {
            edges {
                node {
                    ns
                    data
                    language
                }
            }
        }
    }
`;

export default IndexPage;

export const Head = () => <title>Home Page</title>;
