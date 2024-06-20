import * as React from "react";
import {sectionTitle} from '../styles/Section.module.scss';

function Section({ children, classes, id, reference, style, title }) {
    return (
        <section id={id} className={classes}>
            <div className="inner" ref={reference} style={style}>
                <div className={sectionTitle}>
                    {title}
                </div>
                {children}
            </div>
        </section>
    );
}

export default Section;