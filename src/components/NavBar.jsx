import * as React from 'react'
import Logo from './Logo'
import NavBarLink from './NavBarLink';
import '../styles/NavBar.scss'

function NavBar() {
    return (
        <header>
            <nav className="navbar">
                <a href='/' id='logo-link'>
                    <Logo />
                </a>

                <ol>
                    <NavBarLink to='/'>About</NavBarLink>
                    <NavBarLink to='/'>Experience</NavBarLink>
                    <NavBarLink to='/'>Work</NavBarLink>
                    <NavBarLink to='/'>Contact</NavBarLink>
                </ol>
            </nav>
        </header>
    );
}

export default NavBar;