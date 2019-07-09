const express = require('express');
const router  = express.Router();
const multer = require("multer");
const upload = multer({ dest: './public/uploads/' }); //aquí guardará el usuario su imagen
const User = require("../models/User")
const bcrypt = require("bcrypt");


/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get("/profile", (req, res) => {
  User
  .findById(req.user._id)
  .then(user => {
    res.render('profile', user);
  })
});

router.get("/ranking", (req, res) => {
  res.render("ranking")
});

router.get("/lobby", (req, res) => {
  res.render("lobby")
});

router.get("/about-us", (req, res) => {
  res.render("about-us")
});

router.get("/play", (req, res) => {
  res.render("play")
});

module.exports = router;
