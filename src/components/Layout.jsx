import * as React from 'react'
import NavBar from './NavBar'
import '../styles/Layout.scss'

function Layout({ children }) {
    const ref = React.useRef(null);

    return (
        <div className="layout" ref={ref}>
            <NavBar reference={ref} />
            <div className="page">
                {children}
            </div>
        </div>
    );
}

export default Layout;