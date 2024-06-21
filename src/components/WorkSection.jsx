import * as React from 'react';
import { graphql, useStaticQuery } from "gatsby";
import { Trans } from "react-i18next";
import "bootstrap-icons/font/bootstrap-icons.css";
import Section from './Section';
import { useIsInView, getInViewStyle } from '../utils/cssModuleUtils';
import { icons } from '../utils/svgIcons';
import { projectsContainer } from '../styles/WorkSection.module.scss';

function WorkSection() {
    const ref = React.useRef(null);
    const query = (useStaticQuery(graphql`query{site{siteMetadata{projects{title description tags links{url icon}}}}}`)).site.siteMetadata.projects;

    return (
        <Section id='work' title={'Some Things I’ve Built'} reference={ref} style={getInViewStyle(useIsInView(ref))}>
            <div className={projectsContainer}>
                {/* Print a card for every project */}
                {query.map(project =>
                    <div key={project['title']}>
                        <header>
                            <div>
                                <i className="bi bi-folder2"></i>
                                <span>
                                    {/* Print an icon for each url */}
                                    {project['links'].map(link =>
                                        <a key={link['icon']} href={link['url']}>
                                            {icons[link['icon']]}
                                        </a>
                                    )}
                                </span>
                            </div>

                            <h4><Trans>{project['title']}</Trans></h4>
                            <p><Trans>{project['description']}</Trans></p>
                        </header>

                        <footer>
                            <ul>
                                {/* Print all project tags */}
                                {project['tags'].map(tag =>
                                    <li>{tag}</li>
                                )}
                            </ul>
                        </footer>
                    </div>
                )}
            </div>
        </Section>
    );
}

export default WorkSection;