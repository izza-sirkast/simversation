const bcrypt = require('bcrypt')
const express = require('express')

// Models
const { users } = require('../models')

const router = express.Router()


router.post('/', async (req, res) => {
    const {username, password} = req.body

    const hashedPassword = await bcrypt.hash(password, 10)
    await users.create({username, password: hashedPassword})
    res.json({message: 'User created'})
})

router.post('/login', async (req, res) => {
    const {username, password} = req.body

    const user = await users.findOne({ where: { username: username } })
    if (!user) {
        return res.json({ error: 'Invalid username or password' })
    }

    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) {
        return res.json({ error: 'Invalid username or password' })
    }

    res.json({ message: 'Login successful' })
})

module.exports = router