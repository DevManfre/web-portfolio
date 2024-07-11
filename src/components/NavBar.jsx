import * as React from 'react';
import useDetectScroll from '@smakss/react-scroll-direction';
import { Link } from 'gatsby';
import { useTranslation } from 'react-i18next';
import $ from 'jquery';
import "bootstrap-icons/font/bootstrap-icons.css";
import Logo from './Logo';
import { getAllAvailableLanguages } from '../utils/generalUtils.js';
import { useIsInView, getInViewStyle } from '../utils/cssModuleUtils';
import { navbar, openSidebar, navbarLinkTransition, navbarLinks, withoutCount, removedDelay } from '../styles/NavBar.module.scss';

function NavBar() {
    const links = navbarLinks.replaceAll(' ', '').split(',');
    const { scrollDir, scrollPosition } = useDetectScroll();
    const { i18n } = useTranslation();
    const ref = React.useRef(null);
    const isInView = useIsInView(ref);
    let inViewStyle = getInViewStyle(isInView, navbarLinkTransition, -50);

    /* Hide navbar when scroll down */
    React.useEffect(() => { $('nav').attr('scroll-direction', scrollDir) }, [scrollDir]);

    /* Remove hover delay after mount */
    React.useEffect(() => {
        if (isInView) setTimeout(() => $(`nav ol li a`).addClass(removedDelay), 1000);
    }, [isInView]);

    /* linkHandleClick to close sidebar on phone view, otherwise the page doesn't scroll */
    let handleOnClick = () => { if ($('nav>button').is(':visible')) $('nav>button').trigger('click') };

    return (
        <nav className={navbar} starting-from-top={scrollPosition.top ? 0 : 1} ref={ref}>
            <a href='/' >
                <div style={inViewStyle}><Logo /></div>
            </a>

            <ol>
                {/* Page section links */}
                {links.map(link => {
                    return (
                        <li key={link}>
                            <a href={`#${link.toLowerCase()}`} onClick={handleOnClick} style={inViewStyle}>
                                {link}
                            </a>
                        </li>
                    )
                }
                )}
                {/* i18n languages */}
                {getAllAvailableLanguages().map(lang => {
                    if (lang === i18n.language) return null;

                    return (
                        <li key={lang}>
                            <Link to={`/${lang}`} className={withoutCount} style={inViewStyle}>
                                <i className="bi bi-translate"></i>
                            </Link>
                        </li>
                    );
                })}
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