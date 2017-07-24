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

  server.get('/login', (req, res) => {
    return app.render(req, res, '/login', req.query)
  })

  server.get('/logout', (req, res) => {
    return app.render(req, res, '/logout', req.query)
  })

  server.get('/signup', (req, res) => {
    return app.render(req, res, '/signup', req.query)
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })


  server.listen(port, err => {
    if (err) throw err
    console.log('> Ready on: ' + port + ' using express')
  })
})
