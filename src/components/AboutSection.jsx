import * as React from 'react';
import { useInView } from 'framer-motion';
import { StaticImage } from 'gatsby-plugin-image';
import { Trans } from 'react-i18next';
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
        <section id='about' >
            <div className="main-text" ref={ref} style={{ ...inViewStyle }}>
                <h2 className='section-title'>About Me</h2>
                <div className='inner'>
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
                    </div>
                    <div className='img'>
                        <StaticImage alt='' src='../images/profile.webp' />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HomeSection;