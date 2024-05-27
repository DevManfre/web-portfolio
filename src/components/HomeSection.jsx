import * as React from 'react'
import '../styles/HomeSection.scss'

function HomeSection() {
    return (
        <section className='home'>
            <div className="main-text">
                <h1 className="top-subtitle">Hi, my name is</h1>
                <h2 className="name big-text">Alessio Manfredini</h2>
                <h3 className="title big-text">I build things for the web.</h3>
                <p className="bottom-subtitle">I’m a software engineer specializing in building (and occasionally designing) web experiences.</p>
            </div>
        </section>
    );
}

export default HomeSection;