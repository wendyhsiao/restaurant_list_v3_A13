const mongoose = require('mongoose')
const Restaurant = require('../restaurant.js')
const restaurantList = require('../../restaurant.json').results

mongoose.connect('mongodb://localhost/restaurantV1', { useNewUrlParser: true })
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error')
})

db.once('open', () => {
  console.log('mongodb connected')

  restaurantList.forEach(item => {
    Restaurant.create({
      name: item.name,
      name_en: item.name_en,
      category: item.category,
      image: item.image,
      location: item.location,
      phone: item.phone,
      google_map: item.google_map,
      rating: item.rating,
      description: item.description
    })
  })

  console.log('done')
})
