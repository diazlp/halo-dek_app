class PaymentController {
  static checkout(req, res) {
    res.render("payment/checkout");
  }

  static success(req, res) {
    res.render("payment/success");
  }
}

module.exports = PaymentController;
