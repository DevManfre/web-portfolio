import * as React from 'react'
import '../scss/Layout.scss'

function Layout({ children }) {
    return (
        <div className="layout">
            {children}
        </div>
    );
}

export default Layout;