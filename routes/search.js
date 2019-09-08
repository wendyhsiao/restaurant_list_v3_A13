const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant.js')
const Handlebars = require('handlebars')

Handlebars.registerHelper('ifEquals', function(arg1, options) {
  return arg1 == '' ? options.fn(this) : options.inverse(this)
})

router.get('/', (req, res) => {
  sortObject = {}
  sortObject[req.query.ref] = req.query.sort

  Restaurant.find({})
    .sort(sortObject)
    .exec((err, item) => {
      if (err) return console.error(err)
      const keyword = req.query.keyword
      const sort = 'keyword=' + keyword + '&'
      const search = 'search'
      const restaurant = item.filter(item => {
        return item.name.toLowerCase().includes(keyword.toLowerCase())
      })
      res.render('index', { restaurant, keyword, sort, search })
    })
})

module.exports = router
