const express = require('express')
const cors = require('cors')
const app = express()

// Middleware
app.use(express.json())
app.use(cors())

// Models
const db = require('./models')

// Router
const posts = require('./routes/posts')
const comments = require('./routes/comments')
const users = require('./routes/users')

// Router Implementation
app.use('/posts', posts)
app.use('/comments', comments)
app.use('/users', users)


const port = 3001

db.sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`App listen to port ${port}`)
    })
})