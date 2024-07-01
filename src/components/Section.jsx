import * as React from "react";
import { Trans } from "react-i18next";
import { getInViewStyle, useIsInView } from '../utils/cssModuleUtils';
import { sectionTitle, centralSectionSubtitle } from '../styles/Section.module.scss';

function Section({ central, children, classes, id, reference, style, title }) {
    const defaultRef = React.useRef(null);
    const defaultInViewStyle = getInViewStyle(useIsInView(defaultRef));

    return (
        <section id={id} className={classes}>
            <div className="inner" ref={reference ? reference : defaultRef} style={reference ? style : defaultInViewStyle}>
                {central == 'true' &&
                    <div className={centralSectionSubtitle}>
                        <Trans>section-subtitle</Trans>
                    </div>
                }
                <div className={sectionTitle} central={central ? central : 'false'}>
                    {title}
                </div>
                {children}
            </div>
        </section>
    );
}

export default Section;