import * as React from 'react'
import Logo from './Logo'
import '../styles/NavBar.scss'

function NavBar() {
    return (
        <header>
            <nav className="navbar">
                <Logo />

                <ol>
                    <a href=''>
                        <li>
                            About
                        </li>
                    </a>
                    <a href=''>
                        <li>
                            Experience
                        </li>
                    </a>
                    <a href=''>
                        <li>
                            Work
                        </li>
                    </a>
                    <a href=''>
                        <li>
                            Contact
                        </li>
                    </a>
                </ol>
            </nav>
        </header>
    );
}

export default NavBar;