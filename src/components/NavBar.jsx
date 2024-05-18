import * as React from 'react'
import useDetectScroll, { Direction } from '@smakss/react-scroll-direction';
import Logo from './Logo'
import NavBarLink from './NavBarLink';
import '../styles/NavBar.scss'

function NavBar() {
    const links = ['About', 'Experience', 'Work', 'Contact'];
    const { scrollDir, scrollPosition } = useDetectScroll();

    window.addEventListener('scroll', () => {
        let header = document.getElementById('header');

        switch (scrollDir) {
            case Direction.Up:
                header.classList.remove('hidden');
                break;
            case Direction.Down:
                header.classList.add('hidden');
                break;
        }
    });

    return (
        <header id='header' scroll-from-top={scrollPosition.top}>
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