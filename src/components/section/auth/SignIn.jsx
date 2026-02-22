import React, { useState } from 'react';
import './auth.css';

export const SignIn = ({ switchAuth, onClose }) => {
    const [usernameOrEmail, setUsernameOrEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:5000/api/signin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ usernameOrEmail, password }),
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
                <h2>Sign In</h2>
                {error && <p className="error">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <label>Username or E-Mail</label>
                    <input type="text" placeholder="Username or E-Mail" value={usernameOrEmail} onChange={e => setUsernameOrEmail(e.target.value)} required />
                    <label>Password</label>
                    <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
                    <button type="submit">Sign In</button>
                </form>
                <p className="switch-text">
                    Don't have an account? <span className="link" onClick={switchAuth}>Sign Up</span>
                </p>
            </div>
        </div>
    );
};