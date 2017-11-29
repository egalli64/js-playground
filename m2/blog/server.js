/**
 * 
 */

const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')

// const posts = require('./routes/posts.js')

const app = express()

app.use(morgan('dev'))
app.use(bodyParser.json())

let store = {
    posts: []
}

app.get('/posts', (req, res) => {
    let id = req.query.id
    res.status(200).send(id ? store.posts[id] : store)
})

app.get('/posts/:id/comments', (req, res) => {
    let id = req.params.id
    if (id < 0 || id >= store.posts.length) {
        return res.sendStatus(400)
    }
    res.status(200).send(store.posts[id].comments)
})

app.post('/posts', (req, res) => {
    if (!req.body.name || !req.body.url || !req.body.text) {
        return res.sendStatus(400)
    }

    let id = -1 + store.posts.push({
        name: req.body.name,
        url: req.body.url,
        text: req.body.text,
        comments: []
    })
    console.log('created:', store.posts[id])
    res.status(201).send({ id: id })
})

app.post('/posts/:id/comments', (req, res) => {
    let id = req.params.id
    if (id < 0 || id >= store.posts.length || !req.body.text) {
        return res.sendStatus(400)
    }

    store.posts[id].comments.push({
        text: req.body.text
    })

    res.status(200).send(store.posts[id].comments)
})

app.put('/posts/:id', (req, res) => {
    let id = req.params.id

    if (id < 0 || id >= store.posts.length) {
        return res.sendStatus(400)
    }

    let source = {}
    if (req.body.name)
        source.name = req.body.name
    if (req.body.url)
        source.url = req.body.url
    if (req.body.text)
        source.text = req.body.text

    let target = store.posts[id]
    Object.assign(target, source)
    console.log('updated:', target)
    res.status(200).send(target)
})


app.put('/posts/:pid/comments/:cid', (req, res) => {
    let pid = req.params.pid
    let cid = req.params.cid

    if (pid < 0 || pid >= store.posts.length) {
        return res.sendStatus(400)
    }
    if (cid < 0 || cid >= store.posts[pid].comments.length) {
        return res.sendStatus(400)
    }

    let target = store.posts[pid].comments[cid]
    Object.assign(target, { text: req.body.text })
    console.log('updated:', target)
    res.status(200).send(target)
})

app.delete('/posts/:id', (req, res) => {
    let id = req.params.id
    if (id < 0 || id >= store.posts.length) {
        return res.sendStatus(400)
    }

    let gone = store.posts.splice(id, 1)
    console.log('removed profile', gone)
    res.sendStatus(204)
})

app.delete('/posts/:pid/comments/:cid', (req, res) => {
    let pid = req.params.pid
    let cid = req.params.cid

    if (pid < 0 || pid >= store.posts.length) {
        return res.sendStatus(400)
    }
    if (cid < 0 || cid >= store.posts[pid].comments.length) {
        return res.sendStatus(400)
    }

    let gone = store.posts[pid].comments.splice(cid, 1)
    console.log('removed comment', gone)
    res.sendStatus(204)
})

app.listen(3000)