import * as React from "react";
import { graphql } from "gatsby";
import Logo from "../components/Logo";
import HomeSection from "../components/HomeSection";
import AboutSection from "../components/AboutSection";
import ExperienceSection from "../components/ExperienceSection";
import Layout from "../components/Layout";

const IndexPage = () => {
    return (
        <>
        <Logo loadingScreen="true" />
            <Layout>
                <HomeSection />
                <AboutSection />
                <ExperienceSection />
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
