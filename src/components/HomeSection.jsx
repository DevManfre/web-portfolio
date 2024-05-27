import * as React from 'react';
import { useInView } from 'framer-motion';
import '../styles/HomeSection.scss';

function HomeSection() {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true });
    let inViewStyle = {
        transform: isInView ? "none" : "translateY(50px)",
        opacity: isInView ? 1 : 0,
        transition: '1s'
    };

    return (
        <section className='home'>
            <div className="main-text" ref={ref}>
                <h1 className="top-subtitle" style={inViewStyle}>Hi, my name is</h1>
                <h2 className="name big-text" style={{...inViewStyle, transitionDelay: '0.3s'}}>Alessio Manfredini</h2>
                <h3 className="title big-text" style={{...inViewStyle, transitionDelay: '0.6s'}}>I build things for the web.</h3>
                <p className="bottom-subtitle" style={{...inViewStyle, transitionDelay: '0.9s'}}>I’m a software engineer specializing in building (and occasionally designing) web experiences.</p>
            </div>
        </section>
    );
}

export default HomeSection;