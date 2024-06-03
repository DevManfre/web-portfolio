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
        <Section id='experience' title="Where I've Worked" reference={ref} style={inViewStyle}>

        </Section>
    );
}

export default ExperienceSection;