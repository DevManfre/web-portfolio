import * as React from "react";
import '../styles/Section.scss';

function Section({ children, id, reference, style, title }) {
    return (
        <section id={id}>
            <div className="inner" ref={reference} style={style}>
                <div className="section-title">
                    {title}
                </div>
                {children}
            </div>
        </section>
    );
}

export default Section;