import * as React from "react"
import '../scss/Logo.scss'
import '../scss/LogoAnimated.scss'
import Logo from "./Logo";

let delay = 250;
let animation = 1000;
let freeze = 1500;

function LogoAnimated() {
    setTimeout(() => document.querySelector('.line').classList.add('active'), delay);
    setTimeout(() => {
        document.querySelector('.major').classList.add('active');
        document.querySelector('.minor').classList.add('active');
    }, delay + animation);
    setTimeout(() => document.querySelector('.container-logo').classList.add('disappeared'), delay + animation + freeze);

    return (<Logo />);
}

export const animationTime = delay + animation + freeze;

export default LogoAnimated;