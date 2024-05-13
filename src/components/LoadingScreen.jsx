import * as React from 'react'
import LogoAnimated from './LogoAnimated';
import { animationTime } from './LogoAnimated';
import '../scss/LoadingScreen.scss'

function LoadingScreen() {
    setTimeout(() => document.getElementById('loading-screen').classList.add('active'), animationTime + 500);

    return (
        <div id="loading-screen">
            <LogoAnimated />
        </div>
    );
}

export default LoadingScreen;