const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const errorhandler = require('errorhandler')
const mongoose = require('mongoose')

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/edx-course-db', { useMongoClient: true })

let app = express()
app.use(morgan('dev'))
app.use(bodyParser.json())

const Account = mongoose.model('Account', {
  name: String,
  balance: Number
})

app.param('id', (req, res, next) => {
  Account.findById(req.params.id, (error, account) => {
    if (error) {
      next(error)
    }
    else {
      req.account = account
      next()
    }
  })
})

app.get('/accounts', (req, res, next) => {
  Account.find((error, accounts) => {
    if (error) {
      return next(error)
    }
    else {
      res.send(accounts)
    }
  })
})

app.get('/accounts/:id', (req, res) => {
  res.send(req.account.toJSON())
})

app.post('/accounts', (req, res, next) => {
  let account = new Account(req.body)
  account.save((error, results) => {
    if (error) {
      return next(error)
    }
    else {
      res.send(account._id)
    }
  })
})

app.put('/accounts/:id', (req, res, next) => {
  if (req.body.name)
    req.account.name = req.body.name
  if (req.body.balance)
    req.account.balance = req.body.balance

  req.account.save((error, results) => {
    res.send(results)
  })
})

app.delete('/accounts/:id', (req, res, next) => {
  console.log('delete /accounts/id')
  req.account.remove((error, results) => {
    if (error) {
      return next(error)
    }
    else {
      res.send(results)
    }
  })
})

app.use(errorhandler())

app.listen(3000)
console.log('Server up and listening')