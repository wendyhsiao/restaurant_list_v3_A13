const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant.js')
const { authenticated } = require('../config/auth.js')

router.get('/', authenticated, (req, res) => {
  res.redirect('/')
})

router.get('/new', authenticated, (req, res) => {
  return res.render('new')
})
router.post('/', authenticated, (req, res) => {
  const restaurant = new Restaurant({
    name: req.body.name,
    name_en: req.body.name_en,
    category: req.body.category,
    image: req.body.image || 'https://www.hucc-coop.tw/dispPageBox/hucc/images/nopic_post.jpg?&W=870&H=580',
    location: req.body.location,
    phone: req.body.phone,
    google_map: req.body.google_map,
    rating: req.body.rating,
    description: req.body.description,
    userId: req.user._id
  })
  restaurant.save(err => {
    if (err) return console.error(err)
    return res.redirect('/')
  })
})

router.get('/:restaurant_id', authenticated, (req, res) => {
  Restaurant.findOne({ _id: req.params.restaurant_id, userId: req.user._id }, (err, item) => {
    if (err) return console.error(err)
    return res.render('show', { restaurant: item })
  })
})

router.get('/:restaurant_id/edit', authenticated, (req, res) => {
  Restaurant.findOne({ _id: req.params.restaurant_id, userId: req.user._id }, (err, item) => {
    if (err) return console.error(err)

    return res.render('edit', { restaurant: item })
  })
})
router.put('/:restaurant_id', authenticated, (req, res) => {
  Restaurant.findOne({ _id: req.params.restaurant_id, userId: req.user._id }, (err, item) => {
    if (err) return console.error(err)
    item.name = req.body.name
    item.name_en = req.body.name_en
    item.category = req.body.category
    item.image = req.body.image
    item.location = req.body.location
    item.phone = req.body.phone
    item.google_map = req.body.google_map
    item.rating = req.body.rating
    item.description = req.body.description
    item.save(err => {
      if (err) return console.error(err)
      return res.redirect(`/restaurants/${req.params.restaurant_id}`)
    })
  })
})

router.delete('/:restaurant_id/delete', authenticated, (req, res) => {
  Restaurant.findOne({ _id: req.params.restaurant_id, userId: req.user._id }, (err, item) => {
    if (err) return console.error(err)
    item.remove(err => {
      if (err) return console.error(err)
      return res.redirect('/')
    })
  })
})

module.exports = router
