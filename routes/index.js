const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "./public/uploads/" }); //aquí guardará el usuario su imagen
const User = require("../models/User");
const Restaurant = require("../models/Restaurant")
const Item = require("../models/Restaurant")
const Game = require("../models/Game")
const bcrypt = require("bcrypt");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/profile", (req, res) => {
  User.findById(req.user._id).then(user => {
    res.render("profile", user);
  });
});

router.post("/profile", upload.single("picture"), (req, res, next) => {
  console.log(req.file)
  User.findByIdAndUpdate({
    avatarPath: `/uploads/${req.file.filename}`
  }).then(newAvatarCreated => {
    res.redirect("/profile");
  });
});

router.get("/ranking", (req, res) => {
  res.render("ranking");
});

router.get("/lobby", (req, res) => {
  User.find()
  .then(player => {
    console.log(player)
    res.render("lobby", {player});
  })
});

router.get("/about-us", (req, res) => {
  res.render("about-us");
});

// OTRA VERSIÓN !!!!
// router.get("/play", (req, res) => {
//   Game.findById()
//   Restaurant.find()
//   Item.find()
//   User.findById(req.user._id).then(user => {

//     while (maxUsers <= 4) {
//     maxUsers = arrayUsers.push(user.data._id);
//     }
//       .then(user =>{
//         res.render("play", user))
//       .catch(console.log("Partida llena"))
//       })

//     //aquí hay que hacer lo de que haya 4 users conectados
    
//   });
  
// });
// ********



router.get("/play", (req, res) => {
  Game.findById()
  Restaurant.find()
  Item.find()
  User.findById(req.user._id).then(user => {

    //aquí hay que hacer lo de que haya 4 users conectados
    res.render("play", user);
  });
  
});

router.post("/play", (req, res, next) => {
    //users?

    const startTime = Game.startTime;
    const finishTime = Game.finishTime;

    const newGame = new Game({
      startTime,
      finishTime,
    });

    newGame.save()
    .then(() => {
      res.redirect("/play");
    })
    .catch(err => {
      console.log("Something went wrong ON THE PLAY");
    })
  });

// router.post("/restaurants", (req,res) => {
//   const username = req.body.username;
//   const url = req.body.url;
//   const image = req.body.image;
//   const imagePath = req.body.imagePath;
//   const spicyPoints = req.body.spicyPoints;
//   const activeItem = req.body.activeItem;
//   const item = req.body.item;
//   const location = req.body.location;

//     const newRestaurant = new Restaurant({
//       username,
//       url,
//       image,
//       imagePath,
//       spicyPoints,
//       activeItem,
//       item,
//       location
//     });

//     newRestaurant.save()
//     .then((element) => {
//       res.send({newRestaurant: element});
//     })
//     .catch(err => {
//       console.log("Something went wrong ON THE PLAY");
// })
// })

router.get("/restaurants",(req,res) => {
  Restaurant.find()
  .then(restaurant =>{
       res.json({data:restaurant})
      })
  }) //ESTO?? ME LO HE INVENTADO O ESTÁ BIEN?
    


router.get("/updatePoints",(req,res) => {
  Restaurant.findById("5d260e7a15fe533cac1f43d4")
  .then(restaurant =>{
      User.findByIdAndUpdate(req.user._id, {$set:{pointsMatch: req.user.pointsMatch + restaurant.spicyPoints}}, {new:true})
      .then(user =>{
        res.json({data:user})
      })
    })
    
  })






module.exports = router;
