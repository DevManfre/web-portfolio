import * as React from 'react';
import { useInView } from 'framer-motion';
import { StaticImage } from 'gatsby-plugin-image';
import { Trans } from 'react-i18next';
import Section from './Section';
import '../styles/AboutSection.scss';

function HomeSection() {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true });
    let inViewStyle = {
        transform: isInView ? "none" : "translateY(50px)",
        opacity: isInView ? 1 : 0,
        transition: `1s`
    };

    return (
        <Section id='about' reference={ref} title={'About Me'} style={inViewStyle}>
            <div className='grid' >
                <div className='text'>
                    <p><Trans>about-paragraph-1</Trans></p>
                    <p>
                        <Trans>about-paragraph-2</Trans>
                        <a href='https://www.italiangres.com/' target='_blank' rel='noreferrer'>
                            <Trans>about-link-1</Trans>
                        </a>
                        <Trans>about-paragraph-3</Trans>
                    </p>
                    <p><Trans>about-paragraph-4</Trans></p>
                    <ul className='skill-list'>
                        <li>Javascript (ES6+)</li>
                        <li>React</li>
                        <li>Gatsby</li>
                        <li>Python</li>
                        <li>GraphQL</li>
                    </ul>
                </div>
                <div className='img'>
                    <StaticImage alt='' src='../images/profile.webp' />
                </div>
            </div>
        </Section>
    );
}

export default HomeSection;