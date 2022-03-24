class Controller {
  static checkout(req, res) {
    res.render("checkout");
  }

  static success(req, res) {
    res.render("success");
  }
}

module.exports = Controller;
