import * as React from "react"
import '../scss/Logo.scss'

function Logo() {
    return (
        <div className="container-logo">
            <div className="minor">&lt;</div>
            <div className="major">&gt;</div>
            <div className="line" />
        </div>
    );
}

export default Logo;