import * as React from "react";
import {getInViewStyle, useIsInView} from '../utils/cssModuleUtils';
import {sectionTitle} from '../styles/Section.module.scss';

function Section({ children, classes, id, reference, style, title }) {
    const defaultRef = React.useRef(null);
    const defaultInViewStyle = getInViewStyle(useIsInView(defaultRef));
    
    return (
        <section id={id} className={classes}>
            <div className="inner" ref={reference ? reference : defaultRef} style={reference ? style : defaultInViewStyle}>
                <div className={sectionTitle}>
                    {title}
                </div>
                {children}
            </div>
        </section>
    );
}

export default Section;