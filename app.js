// require packages used in the project
const express = require('express')
const app = express()
const port = 3000
// require express-handlebars here
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const restaurantList = require('./restaurant.json')
const Restaurant = require('./models/restaurant.js')

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

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
  res.render('index', { restaurant: restaurantList.results })
})

app.get('/restaurants', (req, res) => {
  res.redirect('/')
})

app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.find(
    restaurant => restaurant.id.toString() === req.params.restaurant_id
  )
  res.render('show', { restaurant: restaurant })
})

app.get('/restaurants/new', (req, res) => {
  res.send('新增restaurant頁面')
})
app.post('/restaurants', (req, res) => {
  res.send('新增restaurant頁面')
})

app.get('/restaurants/:restaurant_id/edit', (req, res) => {
  res.send('修改restaurant頁面')
})
app.get('/restaurants/:restaurant_id', (req, res) => {
  res.send('修改restaurant')
})

app.post('/restaurants/:restaurant_id/delete', (req, res) => {
  res.send('刪除restaurant')
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
