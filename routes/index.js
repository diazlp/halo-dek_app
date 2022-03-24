const express = require("express");
const router = express.Router();

const auth = require("./auth");
const complaint = require("./issue");

/*
NGETES DATABASE DI ROUTER YANG /CHECKDABASE YAH!
*/
const Controller = require("../controllers");

router.get("/checkDatabase", Controller.checkDatabase);
// define the home page route

router.get("/", Controller.homepage);

// -- check question by id

// define the about route
router.get("/about", (req, res) => {
  res.send("About birds");
});

router.use("/user", auth);
router.use("/issue", complaint);

module.exports = router;
