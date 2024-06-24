import * as React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { Trans, useTranslation } from "react-i18next";
import $ from 'jquery';
import Section from './Section';
import { fromPxToInt } from '../utils/cssModuleUtils';
import { experience, timeline, tablist, jobContainer, experienceButtonHeight } from '../styles/ExperienceSection.module.scss';

function ExperienceSection() {
    const query = (useStaticQuery(graphql`query{site{siteMetadata{companies{name job url}}}}`)).site.siteMetadata.companies;
    const { i18n } = useTranslation();
    const translations = i18n.getDataByLanguage(i18n.language)['translation'];
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

    return (
        <Section id='experience' title="Experience" classes={experience}>
            <div className={timeline}>
                <div className={tablist}>
                    {/* Print the companies' buttons you work for */}
                    {query.map(company =>
                        <button key={btnCount} id={`tab-${btnCount++}`} isselected='false' onClick={handleOnClick}>
                            {company['name']}
                        </button>
                    )}
                    <div /> {/* selection line */}
                </div>

                <div className={jobContainer}>
                    {/* Print the companies' panels */}
                    {query.map(company =>
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
                                    {/* Print the informations list from translations */}
                                    {Object.keys(translations).filter(key => new RegExp(`^company-${company['name']}-`).test(key)).map(t => {
                                        if (parseInt(t.replace(`company-${company['name']}-`, '')))
                                            return <li key={t}><Trans>{t}</Trans></li>
                                        return undefined;
                                    })}
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Section>
    );
}

export default ExperienceSection;