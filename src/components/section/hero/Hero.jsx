import React from 'react';
import '../../../dstyle.css'
import './hero.css'


export const Hero = () => {
    return (
        <>
            <div className="container hero">
                <h1 className='hero-title'>Weather dashboard</h1>
                <ul className='hero-list'>
                    <li><p className='hero-item'>Create your personal list of favorite cities and always be aware of the weather.</p></li>
                    <li><p className='hero-item'>October 2023 Friday, 13th</p></li>
                </ul>
                <ul className='hero-input-list'>
                    <li><input
                        className="hero-input"
                        type="text"
                        placeholder="Search location..."

                    />
                    </li>
                    <li><button className="hero-input-button"></button></li>
                </ul>
            </div>
        </>
    );
};
