import * as React from 'react'
import LogoAnimated from './LogoAnimated';
import { animationTime } from './LogoAnimated';
import '../styles/LoadingScreen.scss'

function LoadingScreen() {
    let freezeTimeBeforeFadeOut = 500;

    document.body.classList.add('loading-screen');
    
    setTimeout(() => {
        document.getElementById('container-loading-screen').classList.add('removed');
        document.body.classList.remove('loading-screen');
    }, animationTime + freezeTimeBeforeFadeOut);

    setTimeout(() => document.getElementById('container-loading-screen').remove(), animationTime + freezeTimeBeforeFadeOut + 200);

    return (
        <div id="container-loading-screen">
            <LogoAnimated />
        </div>
    );
}

export default LoadingScreen;