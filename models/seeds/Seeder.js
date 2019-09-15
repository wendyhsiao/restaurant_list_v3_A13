const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const Restaurant = require('../restaurant.js')
const User = require('../user.js')
const restaurantList = require('../../restaurant.json').results
const user = require('../../user.json').user

mongoose.connect('mongodb://localhost/restaurantV1', { useNewUrlParser: true })
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

        newUser.save().then(user => {
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
              description: item.description,
              userId: user._id
            })
          })
        })
        // newUser.password = hash

        // newUser.save().then(user => {
        //   res.redirect('/')
        // })
        //   .catch(err => console.log(err))
      })
    })



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
  //     description: item.description
  //   })
  // })

  console.log('done')
})
