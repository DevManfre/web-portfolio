import * as React from "react"
import '../styles/Logo.scss'

function Logo() {
    return (
        <div className="logo">
            <div className="container-logo">
                <div className="minor">&lt;</div>
                <div className="major">&gt;</div>
                <div className="line" />
            </div>
        </div>
    );
}

export default Logo;