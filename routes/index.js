const express = require("express");
const router = express.Router();

const auth = require("./auth");
const complaint = require("./issue");
const payment = require("./payment");

const Controller = require("../controllers");

router.get("/checkDatabase", Controller.checkDatabase);

router.get("/", Controller.homepage);

router.use("/user", auth);
router.use("/issue", complaint);
router.use("/payment", payment);

module.exports = router;
