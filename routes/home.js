const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant.js')
const { authenticated } = require('../config/auth.js')

router.get('/', authenticated, (req, res) => {
  let sortObject = {}
  sortObject[req.query.ref] = req.query.sort

  Restaurant.find({ userId: req.user._id })
    .sort(sortObject)
    .exec((err, item) => {
      if (err) return console.error(err)
      return res.render('index', { restaurant: item })
    })
})

module.exports = router
