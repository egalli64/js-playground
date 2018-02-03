const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const errorHandler = require('errorhandler')

const app = express()

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(errorHandler())

let profiles = [{
    username: 'Tom',
    email: 'tom@mail.dd',
    url: 'www.tom.dd'
}]

app.get('/profile', (req, res) => {
    let id = req.query.id
    res.status(200).send(id ? profiles[id] : profiles)
})

app.post('/profile', (req, res) => {
    if(!req.body.username || !req.body.username.trim() || !req.body.email) {
        res.sendStatus(400)
    }
    else {
        let id = -1 + profiles.push({
            username: req.body.username,
            email: req.body.email,
            url: req.body.url
        })
        console.log('created new profile:', profiles[id])
        res.status(201).send({id: id})
    }
})

app.put('/profile/:id', (req, res) => {
    let id = req.params.id
    Object.assign(profiles[id], req.body)
    console.log('update profile', profiles[id])
    res.status(200).send(profiles[id])
})

app.delete('/profile/:id', (req, res) => {
    let id = req.params.id
    if(id) {
        let gone = profiles.splice(id, 1)
        console.log('removed profile', gone)    
    }
    res.sendStatus(204)
})

app.listen(3000)