import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const app = express();
app.use(cors());
app.use(express.json());

const users = [];
const JWT_SECRET = "your_super_secret_key";

app.post("/api/register", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password)
        return res.status(400).json({ message: "Missing fields" });

    const existingUser = users.find(u => u.email === email);
    if (existingUser)
        return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    users.push({ email, password: hashedPassword });

    res.json({ message: "User registered successfully" });
});

// LOGIN
app.post("/api/login", async (req, res) => {
    const { email, password } = req.body;

    const user = users.find(u => u.email === email);
    if (!user)
        return res.status(400).json({ message: "Invalid credentials" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid)
        return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "7d" });

    res.json({ token });
});

app.get("/", (req, res) => {
    res.send("Server running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));