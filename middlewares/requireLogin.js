module.exports = (req, res, next) => {
  if (!req.session.user) {
    const err = "Please login first!";

    return res.redirect(`/user/login?error=${err}`);
  }

  next();
};
