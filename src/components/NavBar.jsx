import * as React from 'react';
import useDetectScroll, { Direction } from '@smakss/react-scroll-direction';
import { useInView } from 'framer-motion';
import Logo from './Logo';
import NavBarLink from './NavBarLink';
import $ from 'jquery';
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

    /* Hide navbar when scroll down */
    React.useEffect(() => {
        if (scrollDir === Direction.Up)
            $('nav').removeClass('hidden');
        else if (scrollDir === Direction.Down)
            $('nav').addClass('hidden');
    }, [scrollDir]);
    
    /* Create navbarLink list */
    for (let i = 0; i < links.length; i++)
        navbarLinks.push(<NavBarLink key={links[i]} style={{ ...inViewStyle, transitionDelay: `${(i + 1) * transitionDelay}s` }}>{links[i]}</NavBarLink>);

    return (
        <nav className="navbar" scroll-from-top={scrollPosition.top} ref={reference}>
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
            }} onClick={() => $('body').toggleClass('open-sidebar')}>
                <div className="line1" />
                <div className="line2" />
                <div className="line3" />
            </button>
        </nav>
    );
}

export default NavBar;

export const navbarTotalFadeInTime = transition + links.length * transitionDelay;