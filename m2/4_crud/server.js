const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')

const app = express()

app.use(morgan('dev'))
app.use(bodyParser.json())

let profiles = [{
    username: 'Tom',
    email: 'tom@mail.dd',
    url: 'www.tom.dd'
}]

app.get('/profile', (req, res) => {
    let id = req.query.id
    res.send(id ? profiles[id] : profiles)
})

app.post('/profile', (req, res) => {
    profiles.push(req.body)
    console.log('created new profile', profiles)
    res.sendStatus(201)
})

app.put('/profile/:id', (req, res) => {
    let id = req.params.id
    Object.assign(profiles[id], req.body)
    console.log('update profile', profiles[id])
    res.sendStatus(204)
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