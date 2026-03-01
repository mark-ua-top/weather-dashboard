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
                    <li><a href="#pets" className="Header-page-button">Pets</a></li>
                    <li><a href="#nature" className="Header-page-button">Nature</a></li>
                    <li><a href="#contacts" className="Header-page-button">Contacts</a></li>
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