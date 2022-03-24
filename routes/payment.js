const express = require("express");
const router = express.Router();

const PaymentController = require("../controllers/PaymentController");
const requireLogin = require("../middlewares/requireLogin");

router.get("/checkout", requireLogin, PaymentController.checkout);

router.get("/success", PaymentController.success);

module.exports = router;
