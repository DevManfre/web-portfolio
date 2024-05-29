import * as React from "react";
import Logo from "./Logo";
import '../styles/Logo.scss';
import '../styles/AnimatedLogo.scss';

let delay = 250;
let lineAnimation = 1000;
let symbolsFadeIn = 1000;
let logoFreeze = 500;
let total = delay + lineAnimation + symbolsFadeIn + logoFreeze;

function AnimatedLogo() {
    setTimeout(() => document.querySelector('.line').classList.add('active'), delay);
    setTimeout(() => document.querySelectorAll('.lateral').forEach(el => el.classList.add('active')), delay + lineAnimation);
    setTimeout(() => document.querySelector('.container-logo').classList.add('disappeared'), total);
    
    return (
        <div className="animated-logo">
            <Logo />
        </div>
    );
}

export const animationTime = total;

export default AnimatedLogo;