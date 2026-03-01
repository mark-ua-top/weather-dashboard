import React from 'react';
import './footer.css';
import logo from '../../../img/Logo-header.png';

export const Footer = () => {
    return (
        <footer className="footer">
            <div className="container footer-container">
                <div className="footer-logo-wrapper">
                    <img src={logo} alt="247 Forecast Logo" className="footer-logo" />
                </div>

                <div className="footer-address">
                    <h3 className="footer-title">Address</h3>
                    <p>Svobody str. 35</p>
                    <p>Kyiv</p>
                    <p>Ukraine</p>
                </div>

                <div className="footer-contact">
                    <h3 className="footer-title">Contact us</h3>
                    <div className="footer-socials">
                        <a href="#" className="social-icon instagram"></a>
                        <a href="#" className="social-icon facebook"></a>
                        <a href="#" className="social-icon whatsapp"></a>
                    </div>
                </div>
            </div>
        </footer>
    );
};