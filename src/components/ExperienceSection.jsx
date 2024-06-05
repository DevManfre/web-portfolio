import * as React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { useInView } from "framer-motion";
import Section from './Section';
import $ from 'jquery';
import '../styles/ExperienceSection.scss';

function ExperienceSection() {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true });
    let inViewStyle = {
        transform: isInView ? "none" : "translateY(50px)",
        opacity: isInView ? 1 : 0,
        transition: `1s`
    };
    const query = (useStaticQuery(graphql`
        query {
            site {
                siteMetadata{
                    companies {
                        name
                        job
                        url
                    }
                }
            }
        }
    `)).site.siteMetadata.companies;
    let count = 0;

    let handleOnClick = (event) => {
        let jobId = event.target.id.replace('tab-', '');

        /* Set attribute just for clicked button */
        $(`.tablist button`).attr('isselected', false);
        $(`#tab-${jobId}`).attr('isselected', true);

        /* Set attribute just for selected job */
        $(`.job-container .panel`).attr('isselected', false);
        $(`.job-container #panel-${jobId}`).attr('isselected', true);

        /* Move selection line */
        $('.selection-line').css('top', 42 * jobId);
    }

    /* Start with the first one selected */
    React.useEffect(() => $('.tablist button').first().trigger('click'), []);

    return (
        <Section id='experience' title="Experience" reference={ref} style={inViewStyle}>
            <div className="timeline">
                <div className="tablist">
                    {query.map(company => {
                        return (
                            <button key={count} id={`tab-${count++}`} isselected='false' onClick={handleOnClick}>
                                {company['name']}
                            </button>
                        )
                    })}
                    <div className="selection-line" />
                </div>

                <div className="job-container">
                    {count = 0}
                    {query.map(company => {
                        return (
                            <div key={count} id={`panel-${count++}`} className="panel" isselected='false'>
                                <h3>
                                    <span>{company['job']}&nbsp;</span>
                                    <a href={company['url']} className="link-text" rel="noopener noreferrer" target="_blank">
                                        {company['job']}
                                    </a>
                                </h3>
                                <p className="range">May 2018 - Present</p>
                                <div className="text">
                                    <ul>
                                        <li>Deliver high-quality, robust production code for a diverse array of projects for clients including Harvard Business School, Everytown for Gun Safety, Pratt Institute, Koala Health, Vanderbilt University, The 19th News, and more</li>
                                        <li>Work alongside creative directors to lead the research, development, and architecture of technical solutions to fulfill business requirements</li>
                                        <li>Collaborate with designers, project managers, and other engineers to transform creative concepts into production realities for clients and stakeholders</li>
                                        <li>Provide leadership within engineering department through close collaboration, knowledge shares, and mentorship</li>
                                    </ul>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </Section>
    );
}

export default ExperienceSection;