import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import fetch from 'node-fetch';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors({
    origin: ['http://localhost:3000', 'https://mark-ua-top.github.io'],
    credentials: true
}));
app.use(express.json());

const usersDir = path.join(__dirname, './data');
if (!fs.existsSync(usersDir)) fs.mkdirSync(usersDir);

const usersFile = path.join(usersDir, 'users.json');
if (!fs.existsSync(usersFile)) fs.writeFileSync(usersFile, '[]');

const RECAPTCHA_SECRET = '6LefFHQsAAAAAICvB7h8Pz5B8fVfFv9ahZvje8w2';

function readUsers() {
    const data = fs.readFileSync(usersFile, 'utf-8');
    return JSON.parse(data || '[]');
}

function writeUsers(users) {
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
}

app.post('/api/signup', async (req, res) => {
    const { username, email, password, recaptchaToken } = req.body;
    if (!username || !email || !password || !recaptchaToken)
        return res.status(400).json({ error: 'All fields required' });

    try {
        const recaptchaRes = await fetch(`https://www.google.com/recaptcha/api/siteverify`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `secret=${RECAPTCHA_SECRET}&response=${recaptchaToken}`
        });
        const recaptchaData = await recaptchaRes.json();
        if (!recaptchaData.success) return res.status(400).json({ error: 'reCAPTCHA failed' });
    } catch (err) {
        return res.status(500).json({ error: 'reCAPTCHA error' });
    }

    const users = readUsers();
    if (users.find(u => u.email === email || u.username === username))
        return res.status(400).json({ error: 'User already exists' });

    if (password.length < 8)
        return res.status(400).json({ error: 'Password must be at least 8 characters' });

    const hash = await bcrypt.hash(password, 10);
    const newUser = { username, email, password: hash, avatar: 'user-zaglushka.png' };
    users.push(newUser);
    writeUsers(users);

    res.json({ message: 'User created' });
});

app.post('/api/signin', async (req, res) => {
    const { usernameOrEmail, password } = req.body;
    if (!usernameOrEmail || !password) return res.status(400).json({ error: 'All fields required' });

    const users = readUsers();
    const user = users.find(u => u.email === usernameOrEmail || u.username === usernameOrEmail);
    if (!user) return res.status(400).json({ error: 'User not found' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: 'Invalid password' });

    res.json({ message: 'Logged in', username: user.username, email: user.email, avatar: user.avatar });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));