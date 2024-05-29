import * as React from "react";
import Logo from "./Logo";
import $ from 'jquery';
import '../styles/Logo.scss';
import '../styles/AnimatedLogo.scss';

let delay = 250;
let lineAnimation = 1000;
let symbolsFadeIn = 1000;
let logoFreeze = 500;
let total = delay + lineAnimation + symbolsFadeIn + logoFreeze;

function AnimatedLogo() {
    React.useEffect(() => {
        setTimeout(() => $('.line').addClass('active'), delay);
        setTimeout(() => $('.lateral').each((index, el) => el.classList.add('active')), delay + lineAnimation);
        setTimeout(() => $('.container-logo').addClass('disappeared'), total);
    }, []);

    return (
        <div className="animated-logo">
            <Logo />
        </div>
    );
}

export const animationTime = total;

export default AnimatedLogo;