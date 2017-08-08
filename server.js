require('babel-core/register')
require('babel-polyfill')
require('./global')
const express = require('express')
const cookieSession = require('cookie-session')
const next = require('next')
const { parse } = require('url')
const bodyParser = require('body-parser') // turns the body into json object
const isDev = process.env.NODE_ENV === 'develop'
const app = next({ dev: isDev })
const handle = app.getRequestHandler()
const port = process.env.PORT || 8000
const server = express()
const apis = require('./server/apis')
const errorHandlers = require('./server/errorHandlers')
const isAuthenticated = require('./server/middlewares/isAuthenticated')

app.prepare().then(() => {
  server.use(bodyParser.json())

  server.set('trust proxy', 1) // trust first proxy

  server.use(cookieSession({
    name: 'session',
    keys: ['NOWnews-member-website']
  }))

  server.use(apis(server))

  server.use(errorHandlers(server));

  server.get('/signup', (req, res) => {
    return app.render(req, res, '/auth/signup', req.query)
  })

  server.get('/forgotPw', (req, res) => {
    return app.render(req, res, '/auth/forgotPw', req.query)
  })

  server.get('/login', (req, res) => {
    return app.render(req, res, '/auth/login', req.query)
  })

  server.get('/member', isAuthenticated, (req, res) => {
    return app.render(req, res, '/member/me', req.query)
  })

  server.get('/member/updatePw', isAuthenticated, (req, res) => {
    return app.render(req, res, '/member/updatePw', req.query)
  })

  server.get('/', isAuthenticated, (req, res) => {
    return app.render(req, res, '/member/me', req.query)
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })


  server.listen(port, err => {
    if (err) throw err
    console.log('> Ready on: ' + port + ' using express')
  })
})
