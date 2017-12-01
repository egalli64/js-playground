const express = require('express')
const morgan = require('morgan')
const errorhandler = require('errorhandler')
const mongodb = require('mongodb')
const bodyParser = require('body-parser')

const url = 'mongodb://localhost:27017/m3-lab'
const coll_name = 'accounts'

let app = express()
app.use(morgan('dev'))
app.use(bodyParser.json())

mongodb.MongoClient.connect(url, (error, db) => {
    if (error) {
        console.log(error.message)
        process.exit(1)
    }

    app.get('/accounts', (req, res, next) => {
        db.collection(coll_name)
            .find({}, { sort: { _id: -1 } })
            .toArray((error, accounts) => {
                if (error)
                    return next(error)
                res.send(accounts)
            })
    })

    app.get('/accounts/:id', (req, res, next) => {
        db.collection(coll_name)
            .find({_id: mongodb.ObjectID(req.params.id)})
            .toArray((error, accounts) => {
                if (error)
                    return next(error)
                res.send(accounts)
            })
    })

    app.post('/accounts', (req, res, next) => {
        let account = req.body
        db.collection(coll_name).insert(account, (error, results) => {
            if (error)
                return next(error)
            res.send(results)
        })
    })

    app.put('/accounts/:id', (req, res, next) => {
        let id = mongodb.ObjectID(req.params.id)
        db.collection(coll_name)
            .update({ _id: id }, { $set: req.body }, (error, results) => {
                if (error)
                    return next(error)
                res.send(results)
            })
    })

    app.delete('/accounts/:id', (req, res, next) => {
        let id = mongodb.ObjectID(req.params.id)
        db.collection(coll_name).remove({ _id: id }, (error, results) => {
            if (error)
                return next(error)
            res.send(results)
        })
    })

    app.use(errorhandler())
    app.listen(3000)
})