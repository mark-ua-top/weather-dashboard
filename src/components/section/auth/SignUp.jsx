import { useState, useContext } from "react"; // 1. Додано useContext
import { AuthContext } from "./AuthContext"; // 2. Імпорт контексту
import "./auth.css";

export const SignUp = ({ onClose, switchAuth }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    // 3. Отримуємо функцію login з контексту
    const { login } = useContext(AuthContext);

    const onSubmit = async (e) => {
        e.preventDefault();
        setMessage(""); // Очищаємо попередні повідомлення

        try {
            const res = await fetch("https://weather-dashboard-production-1731.up.railway.app/api/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, email, password })
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Error");

            // 4. Логінимо користувача відразу після реєстрації
            login(data);
            onClose(); // Закриваємо модальне вікно
        } catch (err) {
            setMessage(err.message);
        }
    };

    return (
        <div className="auth-modal" onClick={onClose}>
            <div className="auth-modal__container" onClick={e => e.stopPropagation()}>
                <button className="auth-modal__close-button" onClick={onClose}>×</button>

                <div className="auth-form-container">
                    <h2>Sign Up</h2>

                    <form onSubmit={onSubmit} className="auth-form">
                        <label className="auth-form__label">Username</label>
                        <input
                            className="auth-form__input"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            placeholder="Username"
                            required
                        />

                        <label className="auth-form__label">E-Mail</label>
                        <input
                            className="auth-form__input"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="Email"
                            type="email"
                            required
                        />

                        <label className="auth-form__label">Password</label>
                        <div className="auth-form__password-field">
                            <input
                                className="auth-form__input"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                placeholder="Password"
                                type={showPassword ? "text" : "password"}
                                required
                            />
                            <button
                                type="button"
                                className="auth-form__toggle-password"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>

                        <button type="submit" className="auth-form__submit-button">Sign up</button>
                    </form>

                    <div className="auth-form__footer">
                        <span>Already have an account? </span>
                        <button type="button" className="auth-form__switch-button" onClick={switchAuth}>
                            Log In
                        </button>
                    </div>
                    {message && <div className="auth-form__message">{message}</div>}
                </div>
            </div>
        </div>
    );
};