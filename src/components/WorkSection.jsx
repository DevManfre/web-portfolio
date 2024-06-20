import * as React from 'react';
import { graphql, useStaticQuery } from "gatsby";
import Section from './Section';
import { useIsInView, getInViewStyle } from '../utils/cssModuleUtils';
import { projectsContainer, projectCard } from '../styles/WorkSection.module.scss';

function WorkSection() {
    const ref = React.useRef(null);
    const query = (useStaticQuery(graphql`query{site{siteMetadata{projects{title description tags links{url icon}}}}}`)).site.siteMetadata.projects;

    return (
        <Section id='work' title={'Some Things I’ve Built'} reference={ref} style={getInViewStyle(useIsInView(ref))}>
            <div className={projectsContainer}>
                {/* Print a card for every project */}
                {query.map(project =>
                    <div className={projectCard}>
                        
                    </div>
                )}
            </div>
        </Section>
    );
}

export default WorkSection;