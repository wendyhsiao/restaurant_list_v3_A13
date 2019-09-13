const express = require('express')
const router = express.Router()
const Handlebars = require('handlebars')
const User = require('../models/user.js')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', (req, res) => {
  res.send('login')
})


router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  res.send('register')
})

router.post('/logout', (req, res) => {
  res.render('/')
})
module.exports = router