// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Restaurant = require("../models/Restaurant");

const bcryptSalt = 10;

mongoose
  .connect('mongodb://localhost/spicy-code', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

// let users = [
//   {
//     username: "alice",
//     password: bcrypt.hashSync("alice", bcrypt.genSaltSync(bcryptSalt)),
//   },
//   {
//     username: "bob",
//     password: bcrypt.hashSync("bob", bcrypt.genSaltSync(bcryptSalt)),
//   }
// ]

let restaurants = [
  {
    username: "Tía María",
    url: "https://www.google.com/search?q=tia+maria&oq=tia+maria&aqs=chrome..69i57j0l5.1491j0j7&sourceid=chrome&ie=UTF-8",
    image: "tiaMaria",
    imagePath: "https://images-na.ssl-images-amazon.com/images/I/518b7m0PB2L._SX522_.jpg",
    spicyPoints: 50,
    activeItem: true,
    item: "https://www.himgs.com/imagenes/hola/comunes/hola-2017.gif",
    location: {type: 'points', coordinates: [0,0]}
  },
  {
    username: "Mamma mia",
    url: "https://www.google.com/search?q=mamma+mia&oq=mamma+mia&aqs=chrome..69i57j0l5.1025j0j9&sourceid=chrome&ie=UTF-8",
    image: "mammaMiaIMG",
    imagePath: "https://i2.wp.com/www.timejust.es/wp-content/uploads/2018/07/Mamma-Mia-2-FilmAffinity.jpg?fit=758%2C1200&ssl=1",
    spicyPoints: 100,
    activeItem: true,
    item: "https://www.himgs.com/imagenes/hola/comunes/hola-2017.gif",
    location: {type: 'points', coordinates: [10,10]}
  },
  {
    username: "Abuelito",
    url: "https://www.google.com/search?q=abuelito&oq=abuelito&aqs=chrome..69i57j0l5.2310j0j9&sourceid=chrome&ie=UTF-8",
    image: "abuelitoIMG",
    imagePath: "https://www.uniradioserver.com/media/news_thumbs/201811/20181112151805_131.jpg",
    spicyPoints: 150,
    activeItem: true,
    item: "https://www.himgs.com/imagenes/hola/comunes/hola-2017.gif",
    location: {type: 'points', coordinates: [50,50]}
  },
  {
    username: "Honey",
    url: "https://www.google.com/search?q=honey&oq=honey&aqs=chrome..69i57j0l5.842j0j9&sourceid=chrome&ie=UTF-8",
    image: "honeyIMG",
    imagePath: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/gettyimages-183354852-1558479028.jpg?crop=0.668xw:1.00xh;0.0867xw,0&resize=480:*",
    spicyPoints: 200,
    activeItem: true,
    item: "https://www.himgs.com/imagenes/hola/comunes/hola-2017.gif",
    location: {type: 'points', coordinates: [-15,-15]}
  },
  {
    username: "Vegan",
    url: "https://www.google.com/search?q=vegan&oq=vegan&aqs=chrome..69i57j0l5.1994j0j9&sourceid=chrome&ie=UTF-8",
    image: "veganIMG",
    imagePath: "https://lovingitvegan.com/wp-content/uploads/2019/02/Vegan-Tacos-15.jpg",
    spicyPoints: 250,
    activeItem: true,
    item: "https://www.himgs.com/imagenes/hola/comunes/hola-2017.gif",
    location: {type: 'points', coordinates: [-30,-30]}
  }
]



Restaurant.deleteMany()
.then(() => {
  return Restaurant.create(restaurants)
})
.then(restaurants => {
  console.log(`${restaurantsCreated.length} restaurants created with the following id:`);
  console.log(restaurantsCreated.map(u => u._id));
})
.then(() => {
  // Close properly the connection to Mongoose
  mongoose.disconnect()
})
.catch(err => {
  mongoose.disconnect()
  throw err
})