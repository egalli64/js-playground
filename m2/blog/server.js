/**
 * 
GET and POST /posts
PUT and DELETE /posts/:postId/
GET and POST /posts/:postId/comments
PUT and DELETE /posts/:postId/comments/commentId

Create a folder named routes.
Implement all /posts routes in routes/posts.js
 and all /posts/:postId/comments routes in routes/comments.js.
Use module.exports to export the functions created for posts and comments
Use require to import posts and comments functions
Create routes/index.js which imports and exports posts.js and comments.js
 so they can be used with require('routes') in server.js
The removal of a blog post must remove all its comments.

//posts post data
curl -H "Content-Type: application/json" -X POST 
 -d '{"name": "Top 10 ES6 Features", "url":"http://webapplog.com/es6", "text": ""}' 
"http://localhost:3000/posts" 

//updates post data at specific id
curl -H 'Content-Type: application/json' -X PUT 
 -d '{"name": "Top 10 ES6 Features Every Developer Must Know",
  "url":"http://webapplog.com/es6", "text": ""}'
 "http://localhost:3000/posts/0"

//gets post data
curl "http://localhost:3000/posts" 

//deletes post data at specific id
curl -X DELETE "http://localhost:3000/posts/0" 
 */

const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')

// const posts = require('./routes/posts.js')

const app = express()

app.use(morgan('dev'))
app.use(bodyParser.json())

let store = {
    posts: [
        {
            name: 'Top 10 ES6 Features every Web Developer must know',
            url: 'https://webapplog.com/es6',
            text: 'This essay will give you a quick introduction to ES6.',
            comments: [
                { text: 'Cruel..var { house, mouse} = No type optimization at all' },
                { text: 'I think you\'re undervaluing the benefit of "let" and "const".' },
                { text: '(p1,p2)=>{ ... } ,i understand this ,thank you !' }
            ]
        }
    ]
}

app.get('/posts', (req, res) => {
    let id = req.query.id
    res.status(200).send(id ? store.posts[id] : store)
})


app.post('/posts', (req, res) => {
    if(!req.body.name || !req.body.url || !req.body.text) {
        res.sendStatus(400)
    }
    else {
        let id = -1 + store.posts.push({
            name: req.body.name,
            url: req.body.url,
            text: req.body.text,
            comments: []
        })
        console.log('created new post:', store.posts[id])
        res.status(201).send({id: id})
    }
})


app.listen(3000)