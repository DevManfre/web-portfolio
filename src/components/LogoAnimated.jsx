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
    setTimeout(() => {
        document.querySelector('.major').classList.add('active');
        document.querySelector('.minor').classList.add('active');
    }, delay + lineAnimation);
    setTimeout(() => document.querySelector('.container-logo').classList.add('disappeared'), total);

    return (<Logo />);
}

export const animationTime = total;

export default LogoAnimated;