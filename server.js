require('dotenv').config()
const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')

app.use(express.json())

const posts = [
    {
        username: 'Chathura',
        title: 'Post 1'
    },
    {
        username: 'Madawa',
        title: 'Post 2'
    },
]

app.get('/posts', authenticateToken, (req, res) => {
    res.json(posts.filter(post => post.username === req.user.name)) // only return the post for the user
})

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader.split(' ')[1] // token = Bearer <token>
    if(token == null) return res.sendStatus(400)
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) res.sendStatus(403)
        req.user = user
        next()
    })
}

app.listen(3000)