const express = require('express')

// Models
const { posts } = require('../models')

const router = express.Router()


router.get('/', async (req, res) => {
    const postsData = await posts.findAll()
    res.json(postsData)
})

router.post('/', async (req, res) => {
    const postsInput = req.body
    await posts.create(postsInput)
    res.json(postsInput)
})

router.get('/byId/:id', async (req, res) => {
    const id = req.params.id
    const postData = await posts.findOne({ where: { id: id } })
    res.json(postData)
})

module.exports = router