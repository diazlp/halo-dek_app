class PaymentController {
  static checkout(req, res) {
    const msg = req.query.message;

    res.render("payment/checkout", { msg });
  }

  static success(req, res) {
    res.render("payment/success");
  }
}

module.exports = PaymentController;
