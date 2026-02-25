import React from 'react';
import './header.css';
import logo from '../../../img/Logo-header.png';
import defaultUser from '../../../img/user-zaglushka.png';

export const Header = ({ onAuthClick, user, logout }) => {
    const avatar = user?.avatar || defaultUser;

    return (
        <section className="header">
            <div className="container header-container">
                <img className="Header-logo" src={logo} alt="Logo" />

                <ul className="Header-list">
                    <li><button className="Header-page-button">Who we are</button></li>
                    <li><button className="Header-page-button">Contacts</button></li>
                    <li><button className="Header-page-button">Menu</button></li>
                </ul>

                {user
                    ? (
                        <>
                            <button
                                className="Header-sign-up-button"
                                onClick={() => {
                                    logout();
                                    localStorage.removeItem('authToken');
                                }}
                            >
                                Logout
                            </button>
                            <img className="Header-user-image" src={avatar} alt="user-avatar" />
                        </>
                    )
                    : (
                        <button
                            className="Header-sign-up-button"
                            onClick={onAuthClick} // викликає App.js для відкриття SignUp/SignIn модалки
                        >
                            Sign Up
                        </button>
                    )
                }
            </div>
        </section>
    );
};