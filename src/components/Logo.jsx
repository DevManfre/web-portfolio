import * as React from "react";
import '../styles/Logo.scss';

function Logo() {
    return (
        <div className="container-logo">
            <div className="lateral minor">&lt;</div>
            <div className="central"><div className="line" /></div>
            <div className="lateral major">&gt;</div>
        </div>
    );
}

export default Logo;