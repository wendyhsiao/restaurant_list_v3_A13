const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant.js')

router.get('/', (req, res) => {
  // console.log('req.query', req.query)
  const keyword = req.query.keyword
  const restaurant = Restaurant.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword.toLowerCase())
  })
  res.render('index', { restaurant: restaurant, keyword: keyword })
})

module.exports = router
