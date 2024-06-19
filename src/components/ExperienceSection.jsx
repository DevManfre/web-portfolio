import * as React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { Trans } from "react-i18next";
import $ from 'jquery';
import Section from './Section';
import { useIsInView, getInViewStyle, fromPxToInt } from '../utils/cssModuleUtils';
import { experience, timeline, tablist, jobContainer, experienceButtonHeight } from '../styles/ExperienceSection.module.scss';

function ExperienceSection() {
    const ref = React.useRef(null);
    const query = (useStaticQuery(graphql`query{site{siteMetadata{companies{name job url itemsList}}}}`)).site.siteMetadata.companies;
    let btnCount = 0, panelCount = 0;

    /* Start with the first one selected */
    React.useEffect(() => { $(`.${tablist} button`).first().trigger('click') }, []);

    let handleOnClick = (event) => {
        const jobId = event.target.id.replace('tab-', '');

        /* Set attribute just for clicked button */
        $(`.${tablist} button`).attr('isselected', false);
        $(`#tab-${jobId}`).attr('isselected', true);

        /* Set attribute just for selected job */
        $(`.${jobContainer} > div`).attr('isselected', false);
        $(`.${jobContainer} #panel-${jobId}`).attr('isselected', true);

        /* Move selection line */
        $(`.${tablist} > div`).css('top', fromPxToInt(experienceButtonHeight) * jobId);
    }

    let getCompanyText = (company) => {
        let text = [];

        for (let i = 0; i < company['itemsList']; i++)
            text.push(<li key={i}><Trans>{`company-${company['name']}-${i}`}</Trans></li>);

        return text;
    }

    return (
        <Section id='experience' title="Experience" reference={ref} style={getInViewStyle(useIsInView(ref))} classes={experience}>
            <div className={timeline}>
                <div className={tablist}>
                    {query.map(company => {
                        return (
                            <button key={btnCount} id={`tab-${btnCount++}`} isselected='false' onClick={handleOnClick}>
                                {company['name']}
                            </button>
                        )
                    })}
                    <div /> {/* selection line */}
                </div>

                <div className={jobContainer}>
                    {query.map(company => {
                        return (
                            <div key={panelCount} id={`panel-${panelCount++}`} isselected='false'>
                                <h3>
                                    <span>{company['job']}&nbsp;</span>
                                    <a href={company['url']} className="link-text" rel="noopener noreferrer" target="_blank">
                                        {company['name']}
                                    </a>
                                </h3>
                                <p><Trans>{`company-${company['name']}-date`}</Trans></p>
                                <div>
                                    <ul>
                                        {getCompanyText(company)}
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