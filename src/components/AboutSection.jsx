import * as React from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import { Trans } from 'react-i18next';
import Section from './Section';
import { useIsInView, getInViewStyle } from '../utils/cssModuleUtils';
import { about, grid, profilePic } from '../styles/AboutSection.module.scss';

function HomeSection() {
    const ref = React.useRef(null);

    return (
        <Section id='about' classes={about} reference={ref} title={'About Me'} style={getInViewStyle(useIsInView(ref))}>
            <div className={grid} >
                <div>
                    <p>
                        <Trans>about-paragraph-1</Trans>
                    </p>
                    <p>
                        <Trans>about-paragraph-2</Trans>
                        <a href='https://www.italiangres.com/' className='link-text' target='_blank' rel='noreferrer'>
                            <Trans>about-link-1</Trans>
                        </a>
                        <Trans>about-paragraph-3</Trans>
                    </p>
                    <p>
                        <Trans>about-paragraph-4</Trans>
                    </p>
                    <ul>
                        <li>Javascript (ES6+)</li>
                        <li>React</li>
                        <li>Gatsby</li>
                        <li>Python</li>
                        <li>GraphQL</li>
                    </ul>
                </div>
                <div className={profilePic}>
                    <StaticImage alt='' src='../images/profile.webp' />
                </div>
            </div>
        </Section>
    );
}

export default HomeSection;