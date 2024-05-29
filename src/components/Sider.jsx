import * as React from 'react';
import { useInView } from 'framer-motion';
import { homeSectionTotalFadeInTime } from './HomeSection';
import '../styles/Sider.scss';

function Sider({ orientation, content, children, reference }) {
    const isInView = useInView(reference, { once: true });
    const transition = 0.7;
    const delay = 0.3;
    let inViewStyle = {
        transform: isInView ? "none" : "translateY(50px)",
        opacity: isInView ? 1 : 0,
        transition: `${transition}s`,
        transitionDelay: `${homeSectionTotalFadeInTime + delay}s`
    };

    if (isInView) setTimeout(
        () => document.getElementById(`sider-${orientation}`).style.transitionDelay = '0s',
        (homeSectionTotalFadeInTime + transition + delay) * 1000
    );

    return (
        <div id={`sider-${orientation}`} className={`sider ${orientation}`} style={inViewStyle}>
            <div className={`sider-content-${content}`}>
                {children}
            </div>
            <div className='line' />
        </div>
    );
}

export default Sider;