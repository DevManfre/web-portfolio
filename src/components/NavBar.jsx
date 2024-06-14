import * as React from 'react';
import useDetectScroll from '@smakss/react-scroll-direction';
import $ from 'jquery';
import Logo from './Logo';
import { useIsInView, getInViewStyle, fromCssSecondsToNumber } from '../utils/cssModuleUtils';
import { navbar, openSidebar, navbarLinkTransition, navbarLinkTransitionDelay } from '../styles/NavBar.module.scss';

function NavBar() {
    const links = ['About', 'Experience', 'Work', 'Contact'];
    const { scrollDir, scrollPosition } = useDetectScroll();
    const ref = React.useRef(null);
    const isInView = useIsInView(ref);
    let inViewStyle = getInViewStyle(isInView, navbarLinkTransition, -50);
    let count = 0;

    /* Hide navbar when scroll down */
    React.useEffect(() => { $('nav').attr('scroll-direction', scrollDir) }, [scrollDir]);

    /* linkHandleClick to close sidebar on phone view, otherwise the page doesn't scroll */
    let handleOnClick = () => { if ($('nav>button').is(':visible')) $('nav>button').trigger('click') };

    return (
        <nav className={navbar} starting-from-top={scrollPosition.top ? 0 : 1} ref={ref}>
            <a href='/' >
                <div style={inViewStyle}><Logo /></div>
            </a>

            <ol>
                {links.map(link =>
                    <li key={link}>
                        <a href={`#${link.toLowerCase()}`} onClick={handleOnClick} style={{ ...inViewStyle, transitionDelay: `${(++count) * fromCssSecondsToNumber(navbarLinkTransitionDelay)}s` }}>
                            {link}
                        </a>
                    </li>
                )}
            </ol>

            {/* Responsive Navbar side */}
            <button onKeyDown={() => { }} onClick={() => $('body').toggleClass(openSidebar)} style={{
                ...inViewStyle,
                transform: isInView ? "translateY(-50%)" : "translateY(-70px)",
            }}>
                <div /><div /><div />
            </button>
        </nav>
    );
}

export default NavBar;