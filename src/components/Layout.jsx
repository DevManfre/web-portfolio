import * as React from 'react'
import NavBar from './NavBar'
import Sider from './Sider';
import '../styles/Layout.scss'

function Layout({ children }) {
    const ref = React.useRef(null);

    return (
        <div className="layout" ref={ref}>
            <NavBar reference={ref} />
            <Sider orientation="left" content="icons" />
            <div className="content">
                {children}
            </div>
            <Sider orientation="right" content="text" />
        </div>
    );
}

export default Layout;