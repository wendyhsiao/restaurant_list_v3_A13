// require packages used in the project
const express = require('express')
const app = express()
const port = 3000
// require express-handlebars here
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
// const restaurantList = require('./restaurant.json')
const Restaurant = require('./models/restaurant.js')

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
// setting bodyParser
app.use(bodyParser.urlencoded({ extended: true }))
// setting static files
app.use(express.static('public'))

mongoose.connect('mongodb://localhost/restaurantV1', { useNewUrlParser: true })
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error')
})

db.once('open', () => {
  console.log('mongodb connected')
})

// routes setting
app.get('/', (req, res) => {
  Restaurant.find({})
    .sort({ name: 'asc' })
    .exec((err, item) => {
      if (err) return console.error(err)
      return res.render('index', { restaurant: item })
    })
})

app.get('/restaurants', (req, res) => {
  res.redirect('/')
})

app.get('/restaurants/new', (req, res) => {
  return res.render('new')
})
app.post('/restaurants', (req, res) => {
  // console.log('req.body', req.body)
  const restaurant = new Restaurant({
    name: req.body.name,
    name_en: req.body.name_en,
    category: req.body.category,
    image: (req.body.image = '')
      ? req.body.image
      : 'https://www.hucc-coop.tw/dispPageBox/hucc/images/nopic_post.jpg?&W=870&H=580',
    location: req.body.location,
    phone: req.body.phone,
    google_map: req.body.google_map,
    rating: req.body.rating,
    description: req.body.description
  })
  restaurant.save(err => {
    if (err) return console.error(err)
    return res.redirect('/')
  })
})

app.get('/restaurants/:restaurant_id', (req, res) => {
  Restaurant.findById(req.params.restaurant_id, (err, item) => {
    if (err) return console.error(err)
    return res.render('show', { restaurant: item })
  })
})

app.get('/restaurants/:restaurant_id/edit', (req, res) => {
  Restaurant.findById(req.params.restaurant_id, (err, item) => {
    if (err) return console.error(err)
    return res.render('edit', { restaurant: item })
  })
})
app.post('/restaurants/:restaurant_id', (req, res) => {
  Restaurant.findById(req.params.restaurant_id, (err, item) => {
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

app.post('/restaurants/:restaurant_id/delete', (req, res) => {
  Restaurant.findById(req.params.restaurant_id, (err, item) => {
    if (err) return console.error(err)
    item.remove(err => {
      if (err) return console.error(err)
      return res.redirect('/')
    })
  })
})

app.get('/search', (req, res) => {
  // console.log('req.query', req.query)
  const keyword = req.query.keyword
  const restaurant = restaurantList.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword.toLowerCase())
  })
  res.render('index', { restaurant: restaurant, keyword: keyword })
})

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})
