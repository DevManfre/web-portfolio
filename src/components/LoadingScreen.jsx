import * as React from 'react'
import LogoAnimated from './LogoAnimated';
import { animationTime } from './LogoAnimated';
import '../scss/LoadingScreen.scss'

function LoadingScreen() {
    setTimeout(() => document.getElementById('container-loading-screen').classList.add('active'), animationTime + 500);

    return (
        <div id="container-loading-screen">
            <div className="loading-screen-bg" />
            <LogoAnimated />
        </div>
    );
}

export default LoadingScreen;