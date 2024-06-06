import * as React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { useInView } from "framer-motion";
import Section from './Section';
import $ from 'jquery';
import '../styles/ExperienceSection.scss';
import { Trans } from "react-i18next";

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
                        itemsList
                    }
                }
            }
        }
    `)).site.siteMetadata.companies;
    let btnCount = 0;
    let panelCount = 0;

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

    let getCompanyText = (company) => {
        let text = [];

        for (let i = 0; i < company['itemsList']; i++)
            text.push(<li><Trans>{`company-${company['name']}-${i}`}</Trans></li>);

        return text;
    }

    /* Start with the first one selected */
    React.useEffect(() => $('.tablist button').first().trigger('click'), []);

    return (
        <Section id='experience' title="Experience" reference={ref} style={inViewStyle}>
            <div className="timeline">
                <div className="tablist">
                    {query.map(company => {
                        return (
                            <button key={btnCount} id={`tab-${btnCount++}`} isselected='false' onClick={handleOnClick}>
                                {company['name']}
                            </button>
                        )
                    })}
                    <div className="selection-line" />
                </div>

                <div className="job-container">
                    {query.map(company => {
                        let text = getCompanyText(company);

                        return (
                            <div key={panelCount} id={`panel-${panelCount++}`} className="panel" isselected='false'>
                                <h3>
                                    <span>{company['job']}&nbsp;</span>
                                    <a href={company['url']} className="link-text" rel="noopener noreferrer" target="_blank">
                                        {company['name']}
                                    </a>
                                </h3>
                                <p className="range"><Trans>{`company-${company['name']}-date`}</Trans></p>
                                <div className="text">
                                    <ul>
                                        {text}
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