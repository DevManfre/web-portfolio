import * as React from 'react';
import useDetectScroll, { Direction } from '@smakss/react-scroll-direction';
import { useInView } from 'framer-motion';
import Logo from './Logo';
import NavBarLink from './NavBarLink';
import '../styles/NavBar.scss';

const links = ['About', 'Experience', 'Work', 'Contact'];
const transition = 0.3;
const transitionDelay = 0.1;

function NavBar({ reference }) {
    const { scrollDir, scrollPosition } = useDetectScroll();
    const isInView = useInView(reference, { once: true });
    let inViewStyle = {
        transform: isInView ? "none" : "translateY(-50px)",
        opacity: isInView ? 1 : 0,
        transition: `${transition}s`
    };
    let navbarLinks = [];

    window.addEventListener('scroll', () => {
        let header = document.querySelector('header');

        switch (scrollDir) {
            case Direction.Up:
                header.classList.remove('hidden');
                break;
            case Direction.Down:
                header.classList.add('hidden');
                break;
            default:
                // Add for removing warning
                break;
        }
    });

    for (let i = 0; i < links.length; i++)
        navbarLinks.push(<NavBarLink key={links[i]} style={{ ...inViewStyle, transitionDelay: `${(i + 1) * transitionDelay}s` }}>{links[i]}</NavBarLink>);

    return (
        <>
            <header scroll-from-top={scrollPosition.top} ref={reference}>
                <nav className="navbar">
                    <a href='/' id='logo-link' >
                        <div style={inViewStyle}><Logo /></div>
                    </a>

                    <ol id='navbar-link-list'>
                        {navbarLinks}
                    </ol>

                    {/* Responsive Navbar side */}
                    <button className="hamburger-icon" onKeyDown={() => { }} style={{
                        ...inViewStyle,
                        transform: isInView ? "translateY(-50%)" : "translateY(-70px)",
                    }} onClick={() => document.body.classList.toggle('open-sidebar')}>
                        <div className="line1" />
                        <div className="line2" />
                        <div className="line3" />
                    </button>
                </nav>
            </header >
            <div className='navbar-spacer'></div>
        </>
    );
}

export default NavBar;

export const navbarTotalFadeInTime = transition + links.length * transitionDelay;