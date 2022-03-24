const express = require("express");
const router = express.Router();

const PaymentController = require("../controllers/PaymentController");

router.get("/checkout", PaymentController.checkout);

router.get("/success", PaymentController.success);

module.exports = router;
