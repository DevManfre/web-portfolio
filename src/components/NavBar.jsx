import * as React from 'react';
import useDetectScroll, { Direction } from '@smakss/react-scroll-direction';
import { useInView } from 'framer-motion';
import Logo from './Logo';
import NavBarLink from './NavBarLink';
import '../styles/NavBar.scss';

const transition = 0.8;

function NavBar({ reference }) {
    const links = ['About', 'Experience', 'Work', 'Contact'];
    const { scrollDir, scrollPosition } = useDetectScroll();
    const isInView = useInView(reference, { once: true });
    let inViewStyle = {
        transform: isInView ? "none" : "translateY(-100px)",
        opacity: isInView ? 1 : 0,
        transition: `${transition}s`
    };

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

    return (
        <>
            <header scroll-from-top={scrollPosition.top} ref={reference}>
                <nav className="navbar">
                    <a href='/' id='logo-link' >
                        <div style={inViewStyle}><Logo /></div>
                    </a>

                    <ol id='navbar-link-list'>
                        {links.map(link => {
                            return (
                                <NavBarLink key={link} style={{
                                    ...inViewStyle,
                                    transitionDelay: '1s'
                                }}>{link}</NavBarLink>
                            );
                        })}
                    </ol>

                    {/* Responsive Navbar side */}
                    <button className="hamburger-icon" onKeyDown={() => { }} style={inViewStyle} onClick={() => document.body.classList.toggle('open-sidebar')}>
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