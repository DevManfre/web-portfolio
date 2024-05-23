import * as React from 'react'
import '../styles/NavBarLink.scss'


function NavBarLink({ children, style }) {
    children = JSON.stringify(children);
    children = children.substring(1, children.length - 1);

    return (
        <li>
            <a href={`/${children.toLowerCase()}`} style={style}>
                {children}
            </a>
        </li>
    );
}

export default NavBarLink;