import * as React from "react"
import '../scss/Logo.scss'

function Logo() {
    let delay = 250;
    let animation = 1000;

    setTimeout(() => document.querySelector('.line').classList.add('active'), delay);
    setTimeout(() => {
        document.querySelector('.major').classList.add('active');
        document.querySelector('.minor').classList.add('active');
    }, delay + animation);

    return (
        <div class="container-logo">
            <div class="minor">&lt;</div>
            <div class="major">&gt;</div>
            <div class="line" />
        </div>
    );
}

export default Logo;