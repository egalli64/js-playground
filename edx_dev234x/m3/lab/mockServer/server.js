const express = require('express')

const app = express()

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Ocp-Apim-Subscription-Key');
    next();
});

app.post('/keyPhrases', (req, res) => {
    res.send({
        documents: [
            {
                keyPhrases: ['this', 'is', 'just', 'a', 'mock']
            }
        ]
    })
})

app.get('/keyPhrases', (req, res) => {
    res.send({
        documents: [
            {
                keyPhrases: ['mock', 'get']
            }
        ]
    })
})


app.listen(3000)