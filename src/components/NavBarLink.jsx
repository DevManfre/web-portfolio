import * as React from 'react';
import $ from 'jquery';
import '../styles/NavBarLink.scss';

function NavBarLink({ children, style }) {
    /* Set children as a child */
    children = JSON.stringify(children);
    children = children.substring(1, children.length - 1);

    /* Close phone navbar when link is clicked */
    let handleOnClick = () => {
        if ($('.hamburger-icon').is(':visible'))
            $('.hamburger-icon').trigger('click');
    }

    return (
        <li className='navbar-link-element'>
            <a href={`#${children.toLowerCase()}`} onClick={handleOnClick} style={style}>
                {children}
            </a>
        </li>
    );
}

export default NavBarLink;