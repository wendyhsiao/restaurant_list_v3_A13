// require packages used in the project
const express = require('express')
const app = express()
const port = 3000
// require express-handlebars here
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const session = require('express-session')
const passport = require('passport')
const Restaurant = require('./models/restaurant.js')


// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
// setting bodyParser
app.use(bodyParser.urlencoded({ extended: true }))
// setting static files
app.use(express.static('public'))
app.use(methodOverride('_method'))

mongoose.connect('mongodb://localhost/restaurantV1', { useNewUrlParser: true, useCreateIndex: true })
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error')
})

db.once('open', () => {
  console.log('mongodb connected')
})

app.use(session({
  secret: 'your secrete key',
  resave: false,
  saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())

require('./config/passport.js')(passport)
app.use((req, res, next) => {
  res.locals.user = req.user
  res.locals.isAuthenticated = req.isAuthenticated()
  next()
})

// routes setting
app.use('/', require('./routes/home.js'))
app.use('/restaurants', require('./routes/restaurant.js'))
app.use('/search', require('./routes/search.js'))
app.use('/users', require('./routes/user.js'))

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})
