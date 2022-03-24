const express = require("express");
const router = express.Router();

const AuthController = require("../controllers/AuthController");

// -- form login and register --
router.get("/login", AuthController.loginPage);
router.post("/login", AuthController.loginPost);

router.get("/register", AuthController.registerPage);
router.post("/register", AuthController.registerPost);

router.get("/register/:id/profile", AuthController.profilePage);
router.post("/register/:id/profile", AuthController.profilePost);

module.exports = router;
