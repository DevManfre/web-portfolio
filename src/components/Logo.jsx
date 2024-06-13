import * as React from "react";
import $ from 'jquery';
import { fromCssSecondsToJsMilliseconds } from '../utils/cssModuleUtils';
import { containerLogo, logoTotalAnimationTime } from '../styles/Logo.module.scss';

function Logo({ loadingScreen = "false" }) {
    /* After component mount, set hidden layout so the layout animations don't start. */
    React.useEffect(() => {
        if (loadingScreen === 'true') {
            $('.layout').css('display', 'none');

            setTimeout(() => {
                $('.layout').css('display', 'block');
                $(`.${containerLogo}[animation="true"]`).remove();
            }, fromCssSecondsToJsMilliseconds(logoTotalAnimationTime));
        }
    }, [loadingScreen]);

    return (
        <div className={containerLogo} loadingScreen={loadingScreen}>
            <div>&lt;</div>
            <div>
                <div />
            </div>
            <div>&gt;</div>
        </div>
    );
}

export default Logo;