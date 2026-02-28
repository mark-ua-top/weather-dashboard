import { useState } from "react";
import "./auth.css";

export const SignUp = ({ onClose, switchToSignIn }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("https://weather-dashboard-production-1731.up.railway.app/api/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, email, password })
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Error");

            alert("User created");
            onClose();
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <button className="close-btn" onClick={onClose}>×</button>

                <h2>Sign Up</h2>

                <form onSubmit={onSubmit}>
                    <input
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        placeholder="Username"
                        required
                    />

                    <input
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Email"
                        type="email"
                        required
                    />

                    <div className="password-wrapper">
                        <input
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="Password"
                            type={showPassword ? "text" : "password"}
                            required
                        />
                        <button
                            type="button"
                            className="show-btn"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>

                    <button type="submit">Sign Up</button>
                </form>

                <div className="auth-switch">
                    <span>Already have an account?</span>
                    <button type="button" onClick={switchToSignIn}>
                        Sign In
                    </button>
                </div>
            </div>
        </div>
    );
};