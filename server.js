require('babel-core/register')
require('babel-polyfill')
require('./global')
const express = require('express')
const next = require('next')
const { parse } = require('url')
const bodyParser = require('body-parser') // turns the body into json object
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const port = process.env.PORT || 8000
const server = express()
const api = require('./api')


app.prepare().then(() => {
  server.use(bodyParser.json())

  server.use(api(server))

  server.get('/signup', (req, res) => {
    return app.render(req, res, '/auth/signup', req.query)
  })

  server.get('/resetPw', (req, res) => {
    return app.render(req, res, '/auth/resetPw', req.query)
  })

  server.get('/forgotPw', (req, res) => {
    return app.render(req, res, '/auth/forgotPw', req.query)
  })

  server.get('/login', (req, res) => {
    return app.render(req, res, '/auth/login', req.query)
  })

  server.get('/', (req, res) => {
    return app.render(req, res, '/auth/login', req.query)
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })


  server.listen(port, err => {
    if (err) throw err
    console.log('> Ready on: ' + port + ' using express')
  })
})
