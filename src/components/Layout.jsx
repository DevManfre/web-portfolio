import * as React from 'react'
import '../styles/Layout.scss'
import NavBar from './Navbar';

function Layout({ children }) {
    return (
        <div className="layout">
            <NavBar />
            {children}
        </div>
    );
}

export default Layout;