const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "./public/uploads/" }); //aquí guardará el usuario su imagen
const User = require("../models/User");
const Restaurant = require("../models/Restaurant")
const Item = require("../models/Restaurant")
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

router.post("/profile", upload.single("photo"), (req, res, next) => {
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
  res.render("lobby");
});

router.get("/about-us", (req, res) => {
  res.render("about-us");
});

router.get("/play", (req, res) => {
  Restaurant.find()
  Item.find()
  User.findById(req.user._id).then(user => {
    res.render("play", user);
  });
});

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
