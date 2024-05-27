import * as React from 'react'
import '../styles/HomeSection.scss'

function HomeSection() {
    return (
        <section className='home'>
            <h1 className="first-text">Hi, my name is</h1>
            <h2 className="name big-text">Alessio Manfredini</h2>
            <h3 className="name-extend big-text">I build things for the web.</h3>
            <p className="subtitle">I’m a software engineer specializing in building (and occasionally designing) web experiences.</p>
        </section>
    );
}

export default HomeSection;