import * as React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { Trans } from "react-i18next";
import Section from './Section';
import { useIsInView, getInViewStyle } from '../utils/cssModuleUtils';
import { home } from '../styles/HomeSection.module.scss';

function HomeSection() {
    const ref = React.useRef(null);
    const isInView = useIsInView(ref);
    const query = (useStaticQuery(graphql`query{site{siteMetadata{developer}}}`)).site.siteMetadata;
    let inViewStyle = getInViewStyle(isInView);

    return (
        <Section id={home} reference={ref}>
            <div style={inViewStyle}>
                <h1>
                    <Trans>homepage-greeting</Trans>
                </h1>
            </div>
            <div style={inViewStyle}>
                <h2>
                    {query.developer}
                </h2>
            </div>
            <div style={inViewStyle}>
                <h3>
                    <Trans>homepage-subtitle</Trans>
                </h3>
            </div>
            <div style={inViewStyle}>
                <p>
                    <Trans>homepage-paragraph</Trans>
                </p>
            </div>
        </Section>
    );
}

export default HomeSection;