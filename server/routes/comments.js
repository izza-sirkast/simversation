const express = require('express')

// Models
const { comments } = require('../models')

const router = express.Router()


router.get('/:postId', async (req, res) => {
    const postId = req.params.postId

    let commentsData = await comments.findAll({ where: { postId: postId } })
    res.json(commentsData)
})

router.post('/', async (req, res) => {
    const commentsInput = req.body
    await comments.create(commentsInput)
    res.json(commentsInput)
})

module.exports = router