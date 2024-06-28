import * as React from 'react';
import { Trans } from "react-i18next";
import { graphql, useStaticQuery } from 'gatsby';
import Section from '../components/Section';
import { icons } from '../utils/svgIcons';
import { contact } from '../styles/ContactSection.module.scss';

function ContactSection() {
    const email = (useStaticQuery(graphql`query{site{siteMetadata{email}}}`)).site.siteMetadata.email;

    return (
        <Section id='contact' classes={contact} central='true' title='Contact'>
            <p>
                <Trans>contact-message</Trans>

                <div>
                    <a href={`mailto:${email}`} title='Email'>
                        {icons['email']}
                        <Trans>contact-email-btn</Trans>
                    </a>
                </div>
            </p>
        </Section>
    );
}

export default ContactSection;