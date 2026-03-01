import React, { useState, useContext } from 'react';
import { AuthContext } from './AuthContext';
import './auth.css';

export const SignIn = ({ onClose, switchAuth }) => {
    const [usernameOrEmail, setUsernameOrEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState('');
    const { login } = useContext(AuthContext);

    const handleSignIn = async (e) => {
        e.preventDefault();
        setMessage('');

        try {
            const res = await fetch("https://weather-dashboard-production-1731.up.railway.app/api/signin", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ usernameOrEmail, password })
            });

            const data = await res.json();

            if (!res.ok) {
                setMessage(data.message || 'Login failed');
            } else {
                login(data);
                onClose();
            }
        } catch {
            setMessage('Server error');
        }
    };

    return (
        <div className="auth-modal" onClick={onClose}>
            <div className="auth-modal__container" onClick={e => e.stopPropagation()}>
                <button className="auth-modal__close-button" onClick={onClose}>×</button>

                <div className="auth-form-container">
                    <h2>Sign In</h2>

                    <form onSubmit={handleSignIn} className="auth-form">
                        <label className="auth-form__label">Username or Email</label>
                        <input
                            className="auth-form__input"
                            type="text"
                            value={usernameOrEmail}
                            onChange={e => setUsernameOrEmail(e.target.value)}
                            placeholder="Username or Email"
                            required
                        />

                        <label className="auth-form__label">Password</label>
                        <div className="auth-form__password-field">
                            <input
                                className="auth-form__input"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                placeholder="Password"
                                required
                            />
                            <button
                                type="button"
                                className="auth-form__toggle-password"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? 'Hide' : 'Show'}
                            </button>
                        </div>

                        <button type="submit" className="auth-form__submit-button">Log In</button>
                    </form>

                    <div className="auth-form__footer">
                        <span>Don't have an account? </span>
                        <button type="button" className="auth-form__switch-button" onClick={switchAuth}>
                            Sign Up
                        </button>
                    </div>

                    {message && <div className="auth-form__message">{message}</div>}
                </div>
            </div>
        </div>
    );
};