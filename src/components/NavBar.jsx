import * as React from 'react'
import useDetectScroll, { Direction } from '@smakss/react-scroll-direction';
import Logo from './Logo'
import NavBarLink from './NavBarLink';
import '../styles/NavBar.scss'

function NavBar() {
    const links = ['About', 'Experience', 'Work', 'Contact'];
    const { scrollDir, scrollPosition } = useDetectScroll();

    window.addEventListener('scroll', () => {
        let navbar = document.getElementById('header');

        switch (scrollDir) {
            case Direction.Up:
                navbar.style.transform = 'translateY(0px)';
                break;
            case Direction.Down:
                navbar.style.transform = 'translateY(-100px)';
                break;
        }
    });

    return (
        <header id='header'>
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