import * as React from 'react';
import Logo from './Logo';
import { containerLogo, logoTotalAnimationTime } from '../styles/Logo.module.scss';
import $ from 'jquery';
import { fromCssSecondsToJsMilliseconds } from '../utils/cssModuleUtils';

function LoadingScreen() {
    /* After component mount set hidden layout so the layout animations don't start. */
    React.useEffect(() => {
        $('.layout').css('display', 'none');

        setTimeout(() => {
            $('.layout').css('display', 'block');
            $(`.${containerLogo}[animation="true"]`).remove();
        }, fromCssSecondsToJsMilliseconds(logoTotalAnimationTime));
    }, []);

    return <Logo animation='true' />;
}

export default LoadingScreen;