const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant.js')

router.get('/', (req, res) => {
  console.log('req.query', req.query)

  sortObject = {}
  sortObject[req.query.ref] = req.query.sort
  console.log('sortObject', sortObject)
  Restaurant.find({})
    .sort(sortObject)
    .exec((err, item) => {
      if (err) return console.error(err)
      return res.render('index', { restaurant: item })
    })
})

module.exports = router
