import * as React from 'react';
import { useInView } from 'framer-motion';
import { navbarTotalFadeInTime } from './NavBar';
import '../styles/HomeSection.scss';

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

    return (
        <section className='home'>
            <div className="main-text" ref={ref}>
                <h1 className="top-subtitle" style={{ ...inViewStyle, transitionDelay: `${navbarTotalFadeInTime + transitionDelay * 0}s` }}>Hi, my name is</h1>
                <h2 className="name big-text" style={{ ...inViewStyle, transitionDelay: `${navbarTotalFadeInTime + transitionDelay * 1}s` }}>Alessio Manfredini</h2>
                <h3 className="title big-text" style={{ ...inViewStyle, transitionDelay: `${navbarTotalFadeInTime + transitionDelay * 2}s` }}>I build things for the web.</h3>
                <p className="bottom-subtitle" style={{ ...inViewStyle, transitionDelay: `${navbarTotalFadeInTime + transitionDelay * 3}s` }}>I’m a software engineer specializing in building (and occasionally designing) web experiences.</p>
            </div>
        </section>
    );
}

export default HomeSection;

export const homeSectionTotalFadeInTime = transition + transitionDelay * 3;