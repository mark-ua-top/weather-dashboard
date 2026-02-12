import React from 'react';
import '../../../dstyle.css'
import './footer.css'

export const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <p>247 Forecast</p>
                <p>Svobody str. 35, Kyiv, Ukraine</p>
                <div className="socials">
                    <span>IG</span>
                    <span>FB</span>
                    <span>WA</span>
                </div>
            </div>
        </footer>
    )
}
