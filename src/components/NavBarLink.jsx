import * as React from 'react'
import '../styles/NavBarLink.scss'

function NavBarLink({ children, to }) {
    return (
        <a href={to}>
            <li>
                {children}
            </li>
        </a>
    );
}

export default NavBarLink;