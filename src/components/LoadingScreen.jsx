import * as React from 'react';
import AnimatedLogo from './AnimatedLogo';
import { animationTime } from './AnimatedLogo';
import $ from 'jquery';
import '../styles/LoadingScreen.scss';

function LoadingScreen() {
    React.useEffect(() => {
        let freezeTimeBeforeFadeOut = 500;
        
        /* Block body so isInView doesn't start */
        $('body').addClass('loading-screen');

        setTimeout(() => {
            $('#container-loading-screen').addClass('removed');
            $('body').removeClass('loading-screen');
        }, animationTime + freezeTimeBeforeFadeOut);

        setTimeout(() => $('#container-loading-screen').remove(), animationTime + freezeTimeBeforeFadeOut + 200);
    }, []);

    return (
        <div id="container-loading-screen">
            <AnimatedLogo />
        </div>
    );
}

export default LoadingScreen;