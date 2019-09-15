const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const Restaurant = require('../restaurant.js')
const User = require('../user.js')
const restaurantList = require('../../restaurant.json').results
const user = require('../../user.json').user

mongoose.connect('mongodb://localhost/restaurantV1', {
  useNewUrlParser: true,
  useCreateIndex: true
})
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error')
})

db.once('open', () => {
  console.log('mongodb connected')

  user.forEach(user => {
    const newUser = new User({
      name: user.name,
      email: user.email,
      password: user.password
    })

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err
        newUser.password = hash

        newUser
          .save()
          .then(users => {
            for (let i = user.restaurant[0] - 1; i < user.restaurant[2]; i++) {
              Restaurant.create({
                name: restaurantList[i].name,
                name_en: restaurantList[i].name_en,
                category: restaurantList[i].category,
                image: restaurantList[i].image,
                location: restaurantList[i].location,
                phone: restaurantList[i].phone,
                google_map: restaurantList[i].google_map,
                rating: restaurantList[i].rating,
                description: restaurantList[i].description,
                userId: users._id
              })
            }
          })
          .catch(err => console.log(err))
      })
    })
  })
  console.log('done')
})

// restaurantList.forEach(item => {
//   Restaurant.create({
//     name: item.name,
//     name_en: item.name_en,
//     category: item.category,
//     image: item.image,
//     location: item.location,
//     phone: item.phone,
//     google_map: item.google_map,
//     rating: item.rating,
//     description: item.description,
//     userId: user._id
//   })
// })

// newUser.password = hash

// newUser.save().then(user => {
//   res.redirect('/')
// })
//   .catch(err => console.log(err))
