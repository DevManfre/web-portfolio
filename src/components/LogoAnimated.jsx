import * as React from "react"
import '../styles/Logo.scss'
import '../styles/LogoAnimated.scss'
import Logo from "./Logo";

let delay = 250;
let lineAnimation = 1000;
let symbolsFadeIn = 1000;
let logoFreeze = 500;
let total = delay + lineAnimation + symbolsFadeIn + logoFreeze;

function LogoAnimated() {
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

export default LogoAnimated;