const express = require('express')
const app = express()

app.use((request, response, next) => {
    console.log(`${request.method}: ${request.url}`)
    next()
})

app.use((request, response, next) => {
    if(request.query.api_key) {
        next()
    } else {
        response.status(401).send({msg: 'Not authorized'})
    }
})

app.get('/', (request, response) => {
    response.send('home')
})

app.get('/users', (request, response) => {
    response.send('lot of users')
})

app.get('/local', (req, res, next) => {
    console.log('inline middleware for local')
    next(new Error('crashing badly'))
}, (request, response) => {
    response.send('local information')
})

app.use((error, req, res, next) => {
    res.status(500).send(error)
    console.log(error)
})
app.listen(3000)