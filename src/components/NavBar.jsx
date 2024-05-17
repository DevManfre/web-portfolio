import * as React from 'react'
import Logo from './Logo'
import NavBarLink from './NavBarLink';
import '../styles/NavBar.scss'

function NavBar() {
    const links = ['About', 'Experience', 'Work', 'Contact'];

    return (
        <header>
            <nav className="navbar">
                <a href='/' id='logo-link'>
                    <Logo />
                </a>

                <ol>
                    {links.map(link => <NavBarLink key={link}>{link}</NavBarLink>)}
                </ol>
            </nav>
        </header>
    );
}

export default NavBar;