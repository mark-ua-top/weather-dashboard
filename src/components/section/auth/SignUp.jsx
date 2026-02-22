import React, { useState, useEffect } from 'react';
import './auth.css';
import defaultUser from '../../../img/user-zaglushka.png';

export const SignUp = ({ switchAuth, onClose }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);

    const SITE_KEY = '6LefFHQsAAAAAPbFNO7OoAkmaqIeuIw8R0JcoiOI';

    useEffect(() => {
        if (!window.grecaptcha) {
            const script = document.createElement('script');
            script.src = 'https://www.google.com/recaptcha/api.js';
            script.async = true;
            script.defer = true;
            script.onload = () => setRecaptchaLoaded(true);
            document.body.appendChild(script);
        } else setRecaptchaLoaded(true);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let token = '';
        if (process.env.NODE_ENV !== 'development') {
            if (!recaptchaLoaded || !window.grecaptcha) return setError('reCAPTCHA not loaded');
            token = window.grecaptcha.getResponse();
            if (!token) return setError('Please complete the CAPTCHA');
        }

        try {
            const res = await fetch('http://localhost:5000/api/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password, recaptchaToken: token }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error);
            localStorage.setItem('authToken', 'demoToken');
            onClose();
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <button className="close-btn" onClick={onClose}>×</button>
                <h2>Sign Up</h2>
                {error && <p className="error">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <label>Username</label>
                    <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required />
                    <label>E-Mail</label>
                    <input type="email" placeholder="E-Mail" value={email} onChange={e => setEmail(e.target.value)} required />
                    <label>Password</label>
                    <div style={{ position: 'relative' }}>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            style={{
                                position: 'absolute',
                                right: 5,
                                top: '50%',
                                transform: 'translateY(-50%)',
                                background: 'transparent',
                                border: 'none',
                                cursor: 'pointer'
                            }}
                        >
                            {showPassword ? 'Hide' : 'Show'}
                        </button>
                    </div>
                    {process.env.NODE_ENV !== 'development' && (
                        <div className="g-recaptcha" data-sitekey={SITE_KEY}></div>
                    )}
                    <button type="submit">Sign Up</button>
                </form>
                <p className="switch-text">
                    Already have an account? <span className="link" onClick={switchAuth}>Sign In</span>
                </p>
            </div>
        </div>
    );
};