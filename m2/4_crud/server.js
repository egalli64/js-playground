const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')

const app = express()

app.use(morgan('dev'))
app.use(bodyParser.json())

let profile = {
    // username: 'Tom',
    // email: 'tom@mail.dd',
    // url: 'www.tom.dd'
}

app.get('/profile', (req, res) => {
    res.send(profile)
})

app.post('/profile', (req, res) => {
    profile = req.body
    res.sendStatus(201)
})

app.put('/profile', (req, res) => {
    Object.assign(profile, req.body)
    res.sendStatus(204)
})

app.delete('/profile', (req, res) => {
    profile = {}
    res.sendStatus(204)
})

app.listen(3000)