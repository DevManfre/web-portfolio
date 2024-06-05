import * as React from "react";
import { useInView } from "framer-motion";
import Section from './Section';
import '../styles/ExperienceSection.scss';

function ExperienceSection() {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true });
    let inViewStyle = {
        transform: isInView ? "none" : "translateY(50px)",
        opacity: isInView ? 1 : 0,
        transition: `1s`
    };

    return (
        <Section id='experience' title="Experience" reference={ref} style={inViewStyle}>
            <div class="timeline">
                <div className="tablist">
                    <button id="tab-0">
                        <span>Upstatement</span>
                    </button>
                    <button id="tab-1">
                        <span>Apple</span>
                    </button>
                    <div class="jobs__StyledHighlight-sc-59sdss-3 fLsUxN" />
                </div>
                <div class="job-container">
                    <div id="panel-0" class="panel">
                        <h3>
                            <span>Lead Engineer&nbsp;</span>
                            <a href="https://www.upstatement.com/" class="link-text" rel="noopener noreferrer" target="_blank">Upstatement</a>
                        </h3>
                        <p class="range">May 2018 - Present</p>
                        <div className="text">
                            <ul>
                                <li>Deliver high-quality, robust production code for a diverse array of projects for clients including Harvard Business School, Everytown for Gun Safety, Pratt Institute, Koala Health, Vanderbilt University, The 19th News, and more</li>
                                <li>Work alongside creative directors to lead the research, development, and architecture of technical solutions to fulfill business requirements</li>
                                <li>Collaborate with designers, project managers, and other engineers to transform creative concepts into production realities for clients and stakeholders</li>
                                <li>Provide leadership within engineering department through close collaboration, knowledge shares, and mentorship</li>
                            </ul>
                        </div>
                    </div>
                    <div id="panel-1" class="panel">
                        <h3>
                            <span>UI Engineer Co-op&nbsp;</span>
                            <a href="https://www.apple.com/music/" class="inline-link" rel="noopener noreferrer" target="_blank">Apple</a>
                        </h3>
                        <p class="range">July - December 2017</p>
                        <div className="text">
                            <ul>
                                <li>Developed and styled interactive web applications for Apple Music using Ember and SCSS</li>
                                <li>Built and shipped the Apple Music Extension for Facebook Messenger leveraging third-party and internal API integrations</li>
                                <li>Architected and implemented the user interface of Apple Music's embeddable web player widget for in-browser user authorization and full song playback</li>
                                <li>Contributed extensively to the creation of MusicKit JS, a public-facing JavaScript SDK for embedding Apple Music players into web applications</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    );
}

export default ExperienceSection;