const express = require('express')

const app = express()

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET')
    next()
})

app.get('/films/:id', (req, res) => {
    res.send({
        title: 'A New Hope',
        characters: [
            'http://localhost:3000/people/1/',
            'http://localhost:3000/people/2/',
            'http://localhost:3000/people/3/',
            'http://localhost:3000/people/4/',
            'http://localhost:3000/people/5/'
        ]
    })
})

app.get('/people/:id', (req, res) => {
    let name = 'Unknown'
    switch (req.params.id) {
        case "1":
            name = 'Luke Skywalker'
            break
        case "2":
            name = 'C-3PO'
            break
        case "3":
            name = 'R2-D2'
            break
        case "4":
            name = 'Darth Vader'
            break
        case "5":
            name = 'Leia Organa'
            break
    }
    res.send({
        name: name
    })
})


app.listen(3000)