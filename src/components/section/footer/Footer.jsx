import React from 'react';
import './footer.css';
import logo from '../../../img/Logo-header.png';

export const Footer = () => {
    return (
        <footer className="footer">
            <div className="container footer-container">
                <a href="#header" className="footer-logo-wrapper">
                    <img src={logo} alt="247 Forecast Logo" className="footer-logo" />
                </a>

                <div className="footer-address">
                    <h3 className="footer-title">Address</h3>
                    <p>Svobody str. 35</p>
                    <p>Kyiv</p>
                    <p>Ukraine</p>
                </div>

                <div className="footer-contact">
                    <h3 className="footer-title">Contact us</h3>
                    <div className="footer-socials">
                        <a href="https://www.instagram.com/" className="social-icon instagram" target="_blank" rel="noopener noreferrer"></a>
                        <a href="https://www.facebook.com/" className="social-icon facebook" target="_blank" rel="noopener noreferrer"></a>
                        <a href="https://www.whatsapp.com/" className="social-icon whatsapp" target="_blank" rel="noopener noreferrer"></a>
                    </div>
                </div>
            </div>
        </footer>
    );
};