import * as React from 'react';
import $ from 'jquery';
import { useIsInView, getInViewStyle, fromCssSecondsToJsMilliseconds } from '../utils/cssModuleUtils';
import { sider, removedDelay, siderTransition, siderTotalAnimationTime } from '../styles/Sider.module.scss';

function Sider({ orientation, content, children }) {
    const ref = React.useRef(null);
    const isInView = useIsInView(ref);

    /* Remove transition delay for resizing bug */
    if (isInView) setTimeout(() => $(`.${sider}`).addClass(removedDelay), fromCssSecondsToJsMilliseconds(siderTotalAnimationTime));

    return (
        <div orientation={orientation} className={sider} style={getInViewStyle(isInView, siderTransition)} ref={ref}>
            <div content={content}>
                {children}
            </div>
            <div /> {/* Line */}
        </div>
    );
}

export default Sider;