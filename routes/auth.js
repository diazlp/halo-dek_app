const express = require("express");
const router = express.Router();

const AuthController = require("../controllers/AuthController");

// -- form login and register --
router.get("/login", AuthController.loginPage);

router.get("/register", AuthController.registerPage);
router.post("/register", AuthController.registerPost);

module.exports = router;
