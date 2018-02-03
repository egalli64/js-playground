/**
 * Blog manager - module 2 assignment
 */

const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const routes = require('./routes')

const app = express()

let store = {
    posts: []
}

app.use(morgan('dev'))
app.use(bodyParser.json())

app.use((req, res, next) => {
    req.store = store
    next()
})

app.get('/posts', routes.posts.get)
app.get('/posts/:id/comments', routes.comments.get)
app.post('/posts', routes.posts.add)
app.post('/posts/:id/comments', routes.comments.add)
app.put('/posts/:id', routes.posts.update)
app.put('/posts/:pid/comments/:cid', routes.comments.update)
app.delete('/posts/:id', routes.posts.remove)
app.delete('/posts/:pid/comments/:cid', routes.comments.remove)

app.listen(3000)