const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant.js')

router.get('/', (req, res) => {
  Restaurant.find({})
    .sort({ name: 'asc' })
    .exec((err, item) => {
      if (err) return console.error(err)
      return res.render('index', { restaurant: item })
    })
})

module.exports = router
