import React, { useState } from 'react';

export const SignUp = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState('');

    const API_URL = 'https://cheerful-fascination.up.railway.app/api';

    const handleSignUp = async (e) => {
        e.preventDefault();
        setMessage('');

        if (!username || !email || !password) {
            setMessage('All fields required');
            return;
        }

        try {
            const res = await fetch(`${API_URL}/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password })
            });

            const data = await res.json();

            if (!res.ok) {
                setMessage(data.message || 'Error creating user');
            } else {
                setMessage(data.message || 'User created successfully');
                setUsername('');
                setEmail('');
                setPassword('');
            }
        } catch (err) {
            console.error(err);
            setMessage('Server error');
        }
    };

    return (
        <div className="signup-form">
            <h2>Sign Up</h2>
            <form onSubmit={handleSignUp}>
                <input
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    placeholder="Username"
                />
                <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Email"
                />
                <div>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Password"
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? 'Hide' : 'Show'}
                    </button>
                </div>
                <button type="submit">Sign Up</button>
            </form>
            {message && <div className="message">{message}</div>}
        </div>
    );
};