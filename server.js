const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const path = require('path')

const app = express()

app.use(express.json())
app.use(cors())

mongoose.connect(process.env.MONGO_URI)

const User = mongoose.model('User', new mongoose.Schema({
    email: { type: String, unique: true },
    password: String
}))

app.post('/api/signup', async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) return res.status(400).json({ message: 'Fill fields' })

    const exists = await User.findOne({ email })
    if (exists) return res.status(400).json({ message: 'User exists' })

    const hashed = await bcrypt.hash(password, 10)
    await User.create({ email, password: hashed })

    res.json({ message: 'User created' })
})

app.post('/api/signin', async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ message: 'Invalid credentials' })

    const valid = await bcrypt.compare(password, user.password)
    if (!valid) return res.status(400).json({ message: 'Invalid credentials' })

    const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    )

    res.json({ token })
})

app.use(express.static(path.join(__dirname, 'build')))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.listen(process.env.PORT || 8080)