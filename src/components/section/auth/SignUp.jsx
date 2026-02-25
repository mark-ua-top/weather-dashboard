import React, { useState } from "react";
import "./auth.css";

const API_URL = "https://cheerful-fascination.up.railway.app/api";

export const SignUp = ({ onClose, switchAuth }) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_URL}/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, email, password })
            });

            if (!response.ok) {
                const data = await response.json();
                setError(data.message || "Error");
                return;
            }

            setUsername("");
            setEmail("");
            setPassword("");
            setError("");
            onClose();
            alert("User registered successfully");
        } catch (err) {
            setError("Network error");
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <button className="close-btn" onClick={onClose}>&times;</button>
                <h2>Sign Up</h2>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <form onSubmit={onSubmit}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Sign Up</button>
                </form>
                <p>
                    Already have an account? <span onClick={switchAuth} style={{ cursor: "pointer", color: "blue" }}>Sign In</span>
                </p>
            </div>
        </div>
    );
};