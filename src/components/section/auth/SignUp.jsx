import { useState } from "react";

export const SignUp = ({ onClose }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("https://cheerful-fascination.up.railway.app/api/signup", {
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
                <form onSubmit={onSubmit}>
                    <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" required />
                    <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" type="email" required />
                    <div style={{ position: "relative" }}>
                        <input
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="Password"
                            type={showPassword ? "text" : "password"}
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            style={{ position: "absolute", right: 0, top: 0 }}
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>
                    <button type="submit">Sign Up</button>
                </form>
            </div>
        </div>
    );
};
