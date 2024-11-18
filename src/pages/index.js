import * as React from "react";
import { graphql } from "gatsby";
import Logo from "../components/Logo";
import Layout from "../components/Layout";
import HomeSection from "../components/HomeSection";
import AboutSection from "../components/AboutSection";
import ExperienceSection from "../components/ExperienceSection";
import WorkSection from "../components/WorkSection";
import ContactSection from "../components/ContactSection";
import { isFirstLanding } from "../utils/generalUtils";

const IndexPage = () =>
    <>
        {/* {isFirstLanding() && <Logo loadingScreen="true" />} */}         {/* Decomment this to add loading screen */}
        <Layout>
            <HomeSection />
            <AboutSection />
            <ExperienceSection />
            <WorkSection />
            <ContactSection />
        </Layout>
    </>

export const query = graphql`query($language: String!){locales:allLocale(filter:{language:{eq:$language}}){edges{node{ns data language}}}site{siteMetadata{title description}}}`;

export default IndexPage;

export const Head = ({ data, pageContext }) =>
    <>
        <html lang={pageContext['language']} />
        <title>{data.site.siteMetadata.title}</title>
        <meta name="description" content={data.site.siteMetadata.description} />
    </>
