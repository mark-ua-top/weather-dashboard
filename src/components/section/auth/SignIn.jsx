import React, { useState } from 'react';

export const SignIn = () => {
    const [usernameOrEmail, setUsernameOrEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState('');
    const [userData, setUserData] = useState(null);

    const API_URL = 'https://cheerful-fascination.up.railway.app/api';

    const handleSignIn = async (e) => {
        e.preventDefault();
        setMessage('');
        setUserData(null);

        if (!usernameOrEmail || !password) {
            setMessage('All fields required');
            return;
        }

        try {
            const res = await fetch(`${API_URL}/signin`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ usernameOrEmail, password })
            });

            const data = await res.json();

            if (!res.ok) {
                setMessage(data.error || 'Login failed');
            } else {
                setUserData(data); // { username, email, avatar }
                setMessage('Logged in successfully');
                setUsernameOrEmail('');
                setPassword('');
            }
        } catch (err) {
            console.error(err);
            setMessage('Server error');
        }
    };

    return (
        <div className="signin-form">
            <h2>Sign In</h2>
            <form onSubmit={handleSignIn}>
                <input
                    type="text"
                    value={usernameOrEmail}
                    onChange={e => setUsernameOrEmail(e.target.value)}
                    placeholder="Username or Email"
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
                <button type="submit">Sign In</button>
            </form>

            {message && <div className="message">{message}</div>}

            {userData && (
                <div className="user-info">
                    <p>Username: {userData.username}</p>
                    <p>Email: {userData.email}</p>
                    <img src={userData.avatar} alt="avatar" width={80} />
                </div>
            )}
        </div>
    );
};