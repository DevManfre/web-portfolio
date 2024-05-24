import * as React from 'react'
import { useInView } from 'framer-motion';
import '../styles/Sider.scss'

function Sider({ orientation, content, children, reference }) {
    const isInView = useInView(reference, { once: true });
    let inViewStyle = {
        transform: isInView ? "none" : "translateY(100px)",
        opacity: isInView ? 1 : 0,
        transition: '1.2s'
    };

    return (
        <div className={`sider ${orientation}`} style={inViewStyle}>
            <div className={`sider-content-${content}`}>
                {children}
            </div>
            <div className='line' />
        </div>
    );
}

export default Sider;