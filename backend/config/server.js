const port = 3003

const bodyParser = require('body-parser')
const express = require('express')
const server = express()
const allowCors = require('./cors')
const queryParser = require('express-query-int')

server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())
server.use(allowCors)
server.use(queryParser())

server.listen(port, function() {
  console.log(`BACKEND is running on port ${port}.`)
})

module.exports = server

//server.use(function(req, res, next) {
//  console.log('Meu Middleware 1')
//  next()
//})

//server.use(function(req, res, next) {
//  console.log('Meu Middleware 2')
//  res.send('Funcionou novamente!!!')
//})
