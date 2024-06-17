import * as React from "react";
import {sectionTitle} from '../styles/Section.module.scss';

function Section({ children, id, reference, style, title }) {
    return (
        <section id={id}>
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