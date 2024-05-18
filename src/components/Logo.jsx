import * as React from "react"
import '../styles/Logo.scss'

function Logo() {
    return (
        <div className="container-logo">
            <div className="minor">&lt;</div>
            <div className="slash">
                <div className="line" />
            </div>
            <div className="major">&gt;</div>
        </div>
    );
}

export default Logo;