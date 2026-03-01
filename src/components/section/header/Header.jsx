import React from 'react';
import './header.css';
import logo from '../../../img/Logo-header.png';
import defaultUser from '../../../img/user-zaglushka.png';

export const Header = ({ onAuthClick, user, logout }) => {
    return (
        <section className="header">
            <div className="container header-container">
                <img className="Header-logo" src={logo} alt="Logo" />

                <ul className="Header-list">
                    <li><button className="Header-page-button">Who we are</button></li>
                    <li><button className="Header-page-button">Contacts</button></li>
                    <li><button className="Header-page-button">Menu</button></li>
                </ul>

                {user ? (
                    <div className="Header-user-wrapper">
                        <div className="Header-user-info">
                            <span className="Header-user-name">{user.username}</span>
                            <img className="Header-user-image" src={defaultUser} alt="avatar" />
                        </div>
                        <button
                            className="Header-sign-up-button"
                            onClick={logout}
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <button
                        className="Header-sign-up-button"
                        onClick={onAuthClick}
                    >
                        Sign Up
                    </button>
                )}
            </div>
        </section>
    );
};