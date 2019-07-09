const express = require('express');
const router  = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get("/profile"), (req, res) => {
  res.render("/auth/profile")
}

router.get("/ranking"), (req, res) => {
  res.render("/auth/ranking")
}

router.get("/lobby"), (req, res) => {
  res.render("/auth/lobby")
}

router.get("/about-us"), (req, res) => {
  res.render("/auth/about-us")
}

router.get("/play"), (req, res) => {
  res.render("/auth/play")
}

module.exports = router;
