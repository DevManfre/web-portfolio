import * as React from 'react';
import { Trans } from "react-i18next";
import { graphql, useStaticQuery } from 'gatsby';
import Section from '../components/Section';
import { icons } from '../utils/svgIcons';
import { contact, socials } from '../styles/ContactSection.module.scss';

function ContactSection() {
    const query = (useStaticQuery(graphql`query{site{siteMetadata{socials{name url}email}}}`)).site.siteMetadata;

    return (
        <Section id='contact' classes={contact} central='true' title='Contact'>
            <p>
                <Trans>contact-message</Trans>

                <span>
                    <a href={`mailto:${query.email}`} title='Email'>
                        {icons['email']}
                        <Trans>contact-email-btn</Trans>
                    </a>
                </span>
            </p>
            <div className={socials}>
                <br /><br /><br /><br />
                {query.socials.map(social =>
                    <a key={social['name']} href={social['url']} target='_blank' rel="noreferrer">
                        {icons[social['name']]}
                    </a>
                )}
            </div>
        </Section>
    );
}

export default ContactSection;