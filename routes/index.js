const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "./public/uploads/" }); //aquí guardará el usuario su imagen
const User = require("../models/User");
const Restaurant = require("../models/Restaurant");
const Item = require("../models/Restaurant");
const Game = require("../models/Game");
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
  User.findByIdAndUpdate(
    req.user._id,
    { avatarPath: `uploads/${req.file.filename}` },
    { new: true }
  ).then(newAvatarCreated => {
    res.redirect("/profile");
  });
});

router.get("/ranking", (req, res) => {
  res.render("ranking");
});

router.get("/lobby", (req, res) => {
  User.find().then(player => {
    res.render("lobby", { player });
  });
});

router.get("/about-us", (req, res) => {
  res.render("about-us");
});

router.post("/addPlayer", (req, res) => {
  //console.log("patata");
  //console.log(req.user._id);
  const startTime = Game.startTime;
  const finishTime = Game.finishTime;

  const newGame = new Game({
    startTime,
    finishTime
  });

  if (Game) {

    Game.findOne({active:true})
    .then((gameFound) => {

      if (gameFound.active == true){
        console.log("la sesión está activa!!!!")
        console.log(gameFound)
        console.log(req.user._id)
        console.log(gameFound.playersON.push(req.user._id))
        
          gameFound.playersON.push(req.user._id);
          console.log(gameFound._id);
          console.log(gameFound.playersON);
          
          if (gameFound.playersON.push(req.user._id) == 4) {
            Game.findByIdAndUpdate(
              gameFound._id,
              {$addToSet:{playersON:gameFound.playersON}, $set:{active:false}} , // ||, active:true ||comprobar si el active es true ahora en la DB
              { new: true }
            )
            .then(
              res.redirect("/play")
            ) 
    
          }

          else {
          Game.findByIdAndUpdate(
            gameFound._id,
            {$addToSet:{playersON:gameFound.playersON}} , // ||, active:true ||comprobar si el active es true ahora en la DB
            { new: true }
            )
            .then(
              res.redirect("/play")
            ) 
    
          }
              
    
      }
      
      else { 
        console.log(gameFound.active)
        newGame
        .save()
        .then(gameSession => {
          gameSession.playersON.push(req.user._id);
          console.log(gameSession._id);
          console.log(gameSession.playersON);
          
          Game.findByIdAndUpdate(
            gameSession._id,
            {$addToSet:{playersON:gameSession.playersON}, $set:{active:true}} , // ||, active:true ||comprobar si el active es true ahora en la DB
            { new: true }
          )
          .then(
            res.redirect("/play")
          ) 
          
        })
        .catch(err => {
          console.log("Something went wrong ON THE PLAY");
        })
    
      } 

    })

  } else {
    console.log("crea game!")
    newGame
        .save()
        .then(gameSession => {
          gameSession.playersON.push(req.user._id);
          console.log(gameSession._id);
          console.log(gameSession.playersON);
          
          Game.findByIdAndUpdate(
            gameSession._id,
            {$addToSet:{playersON:gameSession.playersON}, $set:{active:true}} , // ||, active:true ||comprobar si el active es true ahora en la DB
            { new: true }
          )
          .then(
            res.redirect("/play")
          ) 
          
        })
        .catch(err => {
          console.log("Something went wrong ON THE PLAY");
        })
  }



  
}
// }
);

// OTRA VERSIÓN !!!!
// router.get("/play", (req, res) => {
//   Game.findById()
//   Restaurant.find(),
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
  Game.findById();
  Restaurant.find();
  Item.find();
  User.findById(req.user._id).then(user => {
    //aquí hay que hacer lo de que haya 4 users conectados
    res.render("play", user);
  });
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

router.get("/restaurants", (req, res) => {
  Restaurant.find().then(restaurant => {
    res.json({ data: restaurant });
  });
}); //ESTO?? ME LO HE INVENTADO O ESTÁ BIEN?

router.get("/updatePoints", (req, res) => {
  Restaurant.findById("5d260e7a15fe533cac1f43d4").then(restaurant => {
    User.findByIdAndUpdate(
      req.user._id,
      { $set: { pointsMatch: req.user.pointsMatch + restaurant.spicyPoints } },
      { new: true }
    ).then(user => {
      res.json({ data: user });
    });
  });
});

module.exports = router;
