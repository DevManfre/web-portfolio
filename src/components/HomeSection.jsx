import * as React from 'react';
import { useInView } from 'framer-motion';
import { navbarTotalFadeInTime } from './NavBar';
import '../styles/HomeSection.scss';
import { Trans } from "react-i18next"

const transition = 1;
const transitionDelay = 0.2;

function HomeSection() {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true });
    let inViewStyle = {
        transform: isInView ? "none" : "translateY(50px)",
        opacity: isInView ? 1 : 0,
        transition: `${transition}s`
    };
    const lastNodeFadeInTime = navbarTotalFadeInTime + transitionDelay * 3;

    if (isInView) setTimeout(() => {
        for (let child of document.querySelector('.main-text').children) {
            child.style.transitionDelay = '0s';
            child.style.transition = '0s';
        }
    }, lastNodeFadeInTime * 1000);

    return (
        <section className='home'>
            <div className="main-text" ref={ref}>
                <h1 className="top-subtitle" style={{ ...inViewStyle, transitionDelay: `${navbarTotalFadeInTime + transitionDelay * 0}s` }}>
                    <Trans>homepage-greeting</Trans>
                </h1>
                <h2 className="name big-text" style={{ ...inViewStyle, transitionDelay: `${navbarTotalFadeInTime + transitionDelay * 1}s` }}>Alessio Manfredini</h2>
                <h3 className="title big-text" style={{ ...inViewStyle, transitionDelay: `${navbarTotalFadeInTime + transitionDelay * 2}s` }}>
                    <Trans>homepage-subtitle</Trans>
                </h3>
                <p className="bottom-subtitle" style={{ ...inViewStyle, transitionDelay: `${lastNodeFadeInTime}s` }}>
                    <Trans>homepage-paragraph</Trans>
                </p>
            </div>
        </section>
    );
}

export default HomeSection;

export const homeSectionTotalFadeInTime = transition + transitionDelay * 3;