import * as React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import NavBar from './NavBar';
import Sider from './Sider';
import { icons } from '../utils/svgIcons';
import '../styles/Layout.scss';

function Layout({ children }) {
    const ref = React.useRef(null);
    const query = (useStaticQuery(graphql`query{site{siteMetadata{socials{name url}email}}}`)).site.siteMetadata;

    return (
        <div className="layout" ref={ref}>
            <NavBar />

            <Sider orientation="left" content="icons">
                {query.socials.map(social =>
                    <a key={social['name']} href={social['url']} target='_blank' rel="noreferrer">
                        {icons[social['name']]}
                    </a>
                )}
            </Sider>

            <main className="content">
                {children}
            </main>

            <Sider orientation="right" content="text">
                <a href={`mailto:${query.email}`} title='Email'>{query.email}</a>
            </Sider>
        </div>
    );
}

export default Layout;