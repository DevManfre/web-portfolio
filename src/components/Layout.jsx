import * as React from 'react'
import '../styles/Layout.scss'

function Layout({ children }) {
    return (
        <div className="layout">
            {children}
        </div>
    );
}

export default Layout;