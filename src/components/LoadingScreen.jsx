import * as React from 'react'
import LogoAnimated from './LogoAnimated';
import { animationTime } from './LogoAnimated';
import '../styles/LoadingScreen.scss'

function LoadingScreen() {
    let freezeTimeBeforeFadeOut = 500;
    let page = document.getElementsByTagName('body')[0];

    page.style.overflowY = 'hidden';

    setTimeout(
        () => document.getElementById('container-loading-screen').classList.add('active'),
        animationTime + freezeTimeBeforeFadeOut
    );
    setTimeout(() => {
        document.getElementById('container-loading-screen').classList.add('removed');
        page.style.overflowY = '';
    },
        animationTime + freezeTimeBeforeFadeOut + 0.2
    );

    return (
        <div id="container-loading-screen">
            <div className="loading-screen-bg" />
            <LogoAnimated />
        </div>
    );
}

export default LoadingScreen;