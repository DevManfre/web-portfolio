import * as React from "react";
import { containerLogo } from '../styles/Logo.module.scss';

function Logo({ animation = false }) {
    return (
        <div className={containerLogo} animation={animation}>
            <div>&lt;</div>
            <div>
                <div />
            </div>
            <div>&gt;</div>
        </div>
    );
}

export default Logo;